/*
 * Short URL Expander/Cleaner
 * https://github.com/IBBoard/IBBoard-URL-Expander
 *
 * 
 * Based on Chrome URL Extender
 * http://www.tacticalcoder.com
 *
 * Copyright 2010, Don Magee
 * Copyright 2012, IBBoard
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
*/
var services = {};
var maxUrlDisplayChars = 0;
var updateLinkText = 0;
var updateLinkUrl = 1;
var urlCache = new Object();
var loglevel = 0;
var pending = new Array();

startClean();

function startClean()
{
	chrome.extension.sendRequest({'action' : 'getOptions'}, function(options){
		maxUrlDisplayChars = options.maxUrlLength;
		updateLinkText = options.updateLinkText;
		updateLinkUrl = options.updateLinkUrl;
		updateLinkTitle = options.updateLinkTitle;
		services = JSON.parse(options.services);
		
		$('body').bind('DOMNodeInserted' , function() {
			debuglog("DOMNodeInserted");
			expandUrls();
		});
		
		expandUrls();
	});
}

function expandUrls()
{
	$("a").each(function(index) {
		var element = $(this);
		if (isExpandable(element.attr('href'))) {
			doExpand(element);
		}
	});
}

function isExpandable(hrefString)
{
	//Regex is used to pull domain part and to make sure we have a path
	//But ignores goo.gl's stats short links (which end with "+")
	var urlRegEx = /^https?:\/\/([^\/]+)\/.*[^\+]$/;
	var urlMatch = urlRegEx.exec(hrefString);
	var urlString = urlMatch ? urlMatch[1] : null;

	return (urlString && (urlString in services));
}

function doExpand(element) {
	var urlToExpand = element.attr("href");
	debuglog("Start expand " + urlToExpand);

	if (isTwitterTCo(urlToExpand))
	{
		urlToExpand = expandTwitterExpandedDataAttrib(element, urlToExpand);
	}

	if(!(urlToExpand in urlCache))
	{
		getAndExpand(element, urlToExpand);
	} else if (!urlCache[urlToExpand].title) {
		registerForExpansion(element, urlToExpand);
	} else {
		expandCached(element, urlToExpand);
	}
}

function getAndExpand(element, urlToExpand) {
	debuglog("  Not in cache: " + urlToExpand);
	urlCache[urlToExpand] = new Object();
	
	chrome.extension.sendRequest({'action' : 'expandUrl', 'url' : urlToExpand }, function(data){
		if(data != null)
		{
			var origUrl = data['orig-url'];
			data['long-url'] = cleanUrl(data['long-url']);
			urlCache[origUrl] = data;
			expandLink(element, origUrl, data);

			if (origUrl in pending) {
				var pendingList = pending[origUrl];
				var listLength = pendingList.length;
				debuglog("Processing pending for " + origUrl + " (" + listLength + ")");
				
				for (i = 0; i < listLength; i++) {
					expandLink(pendingList[0], origUrl, data);
					pendingList.splice(0, 1);
				}
			}
		}
	});
}

function registerForExpansion(element, urlToExpand) {
	var pendingList;
	debuglog("  Pending " + urlToExpand);
	if (urlToExpand in pending) {
		pendingList = pending[urlToExpand];
	} else {
		pendingList = new Array();
		pending[urlToExpand] = pendingList;
	}

	pendingList.push(element);
}

function expandCached(element, urlToExpand) {
	debuglog("  In cache: " + urlToExpand);
	var urlData = urlCache[urlToExpand];
	expandLink(element, urlToExpand, urlData);
}

function isTwitterTCo(urlToExpand) {
	return urlToExpand.search(/^https?:\/\/t.co\//) !== -1;
}

function expandTwitterExpandedDataAttrib(element, urlToExpand) {
	var tmpUrl = element.attr('data-expanded-url');
	if (tmpUrl)
	{
		debuglog("  data-expanded-url: " + urlToExpand + " -> " + tmpUrl);
		tmpUrl = cleanUrl(tmpUrl);
		var tmpObject = new Object();
		tmpObject['orig-url'] = urlToExpand;
		tmpObject['long-url'] = tmpUrl;
		//We're not pulling the title here, but never mind - it saves time and bandwidth
		tmpObject['title'] = tmpUrl;
		
		if (!isExpandable(tmpUrl))
		{
			debuglog("  Cache data-expanded-url")
			urlCache[urlToExpand] = tmpObject;
		}
		else
		{
			//Do intermediary expansion now in case the subseqent expansion request fails
			debuglog("  Expand data-expanded-url");
			expandLink(element, urlToExpand, tmpObject);
			urlToExpand = tmpUrl;
		}
	}

	return urlToExpand;
}

function cleanUrl(url)
{
	return url ? url.replace(/((\?)|&)utm_[^=]*=[^&]*/g, '$2').replace(/\?$/, '') : url;
}

function expandLink(element, urlToExpand, data)
{
	if(updateLinkText == 1)
	{
		if (shouldUpdateText(element, data))
		{
			if(updateLinkTitle == 1)
			{
				setLinkTitle(element, data);
			} else {
				setLinkText(element, data);
			}
		}
	}
	
	if(updateLinkUrl == 1)
	{
		debuglog("  Update href: " + element.attr('href') + " -> " + data['long-url']);
		element.attr('href', data['long-url']);

		if (isExpandable(data['long-url'])) {
			doExpand(element);
		}
	}		
}

function shouldUpdateText(element, data) {
	var comparableElementText = createCompareUrl(element.text());
	return (createCompareUrl(element.attr('href')) == comparableElementText || createCompareUrl(data['orig-url']) == comparableElementText);
}

function createCompareUrl(url)
{
	return url.replace(/^https?:\/\//, '').replace(/\s/, '');
}

function setLinkTitle(element, data) {
	if(data.title)
	{
		element.html(data.title);
	} else
	{
		element.html(data['long-url']);
	}
}

function setLinkText(element, data) {
	if(maxUrlDisplayChars > 0)
	{
		if(data.length <= maxUrlDisplayChars)
		{
			element.html(data['long-url']);
		} else {
			element.html(data['long-url'].substring(0, maxUrlDisplayChars) + '...');
		}
	} else
	{
		element.html(data['long-url']);
	}
}

function debuglog(message){
	if (loglevel == 1) {
		console.log(message);
	}
}

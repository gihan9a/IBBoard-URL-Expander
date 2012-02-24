/*
 * Chrome URL Extender contentscript.js
 * http://www.tacticalcoder.com
 *
 * Copyright 2010, Don Magee
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Created Date: Tuesday March 30th, 2010
 *
 * Last Modified Date: Saturday April 24th, 2010 
 *
 * 
*/
var services = {};
var changed = 0;
var maxUrlDisplayChars = 0;
var updateLinkText = 0;
var updateLinkUrl = 1;
var urlCache = new Object();

checkOpts();
getURLList();
// Get the options
function checkOpts()
{
	chrome.extension.sendRequest({'action' : 'getOptions'}, function(options){
	
		// -- The Options -- //
		maxUrlDisplayChars = options.maxUrlLength;
		updateLinkText = options.updateLinkText;
		updateLinkUrl = options.updateLinkUrl;
		updateLinkTitle = options.updateLinkTitle;
		services = JSON.parse(options.services);
	});
}

$('body').bind('DOMNodeInserted' , function() {
  getURLList();
});

function getURLList()
{
	$("a").filter(function(index) {
		var hrefString = $(this).attr('href');
		if (isExpandable(hrefString))
		{
			return this;
		} else {
			return false;
		}
	}).each(function(index, value) {
		var element = $(this);
		var urlToExpand = element.attr("href");

		if (urlToExpand.search(/^https?:\/\/t.co\//) !== -1)
		{
			var tmpUrl = element.attr('data-expanded-url');
			if (tmpUrl)
			{
				tmpUrl = cleanUrl(tmpUrl);
				var tmpObject = new Object();
				tmpObject['long-url'] = tmpUrl;
				//We're not pulling the title here, but never mind - it saves time and bandwidth
				tmpObject['title'] = tmpUrl;
				
				if (!isExpandable(tmpUrl))
				{
					urlCache[urlToExpand] = tmpObject;
				}
				else
				{
					//Expand now in case the subseqent expansion request fails
					expandLink(element, urlToExpand, tmpObject);
					urlToExpand = tmpUrl;
				}
			}
		}

		var urlTitle = element.html();
		if(!(urlToExpand in urlCache))
		{
			urlCache[urlToExpand] = new Object();
			chrome.extension.sendRequest({'action' : 'expandUrl', 'url' : urlToExpand }, function(data){
				if(data != null)
				{
					var origUrl = data['orig-url'];
					data['long-url'] = cleanUrl(data['long-url']);
					urlCache[origUrl]['long-url'] = data['long-url'];
					urlCache[origUrl]['title'] = data['title'];
					expandLink(element, origUrl, data);
				}
			});
		} else {
			var urlData = urlCache[urlToExpand];
			var longUrl = urlData['long-url'];

			if (longUrl) {
				var cleanedURL = cleanUrl(longUrl);
				if (longUrl != cleanedURL) {
					urlCache[urlToExpand]['long-url'] = cleanedURL;
					urlData['long-url'] = cleanedURL;
				}
			}
			
			expandLink(element, urlToExpand, urlData);
		}
	});
}

function isExpandable(hrefString)
{
	var urlRegEx = /(https?:\/\/)([^\/]+)/;
	var urlMatch = urlRegEx.exec(hrefString);
	var urlString = urlMatch ? urlMatch[2] : null;
	if (urlString && (urlString in services))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function cleanUrl(url)
{
	return url ? url.replace(/utm_[^=]+=[^&]+(&|$)/g, '').replace(/\?$/, '') : url;
}

function expandLink(element, urlToExpand, data)
{
	if(updateLinkText == 1)
	{
		if(element.attr('href').replace(/^https?:\/\//, '') == element.text().replace(/^https?:\/\//, '') || urlToExpand.replace(/^https?:\/\//, '') == element.text().replace(/^https?:\/\//, '') || changed == 1)
		{
			if(updateLinkTitle == 1)
			{
				if(data.title)
				{
					element.html(data.title);
				} else
				{
					element.html(data['long-url']);
				}
			} else {
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
		} 
	}
	if(updateLinkUrl == 1)
	{
		element.attr('href', data['long-url']);
	}		
}

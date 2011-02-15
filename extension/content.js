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
var urlToExpand = "";

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


/*
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	getURLList();
	sendResponse();
});
*/


function getURLList()
{
	$("a").filter(function(index) {
		var urlRegEx = /(http:\/\/)([^\/]+)/;
		//urlRegEx = /(http:\/\/)(\w{1,8}\.\w{1,3})\/\w{1,10}$/;
		hrefString = $(this).attr('href');
		urlMatch = urlRegEx.exec(hrefString);
		urlString = urlMatch ? urlMatch[2] : null;
		if (urlString && (urlString in services))
		{
			return this;
		} else {
			return false;
			}
	}).each(function(index, value) {
		var element = $(this);
		urlToExpand = element.attr("href");
		var urlTitle = element.html();
		if(!(urlToExpand in urlCache))
		{
			urlCache[urlToExpand] = new Object();
			chrome.extension.sendRequest({'action' : 'expandUrl', 'url' : urlToExpand }, function(data){
				if(data != null)
				{
					urlCache[urlToExpand]['long-url'] = data['long-url'];
					urlCache[urlToExpand]['title'] = data['title'];
					expandLink(element, data);
				}
			});
		} else {
			urlData = urlCache[urlToExpand];
			expandLink(element, urlData);
		}
	});
}

function expandLink(element, data)
{
	if(updateLinkText == 1)
	{
		if(element.attr('href') == element.text() || changed == 1)
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
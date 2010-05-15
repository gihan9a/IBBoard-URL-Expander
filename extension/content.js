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
$('body').bind('DOMCharacterDataModified' , function() {
  getURLList();
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	getURLList();
	sendResponse();
});


function getURLList()
{
	chrome.extension.sendRequest({'action' : 'getButtonState'}, function(button){
		buttonState = button.buttonState;
		if(buttonState == 1)
		{
			$("a").filter(function() {
				var urlRegEx = /(http:\/\/)?([^\/]+)/;
				var urlMatch = urlRegEx.exec(this.href);
				var urlString = urlMatch ? urlMatch[2] : null;
				if (urlString && urlString in services)
				{
					return this.href;
				}
			}).each(function(index) {
				var element = $(this);
				var url = element.attr("href");
				var urlTitle = element.html();
				chrome.extension.sendRequest({'action' : 'expandUrl', 'url' : url }, function(data){
					if(data != null)
					{
						changed = 1;
						element.attr('org_url', url);
						element.attr('org_title', urlTitle);
						expandLink(element, data);
					}
				});
			});
		} else
		{
			if(changed == 1)
			{
				$("a[org_url]").each(function(index) {
					checkOpts();
					var element = $(this);
					var org_url = element.attr('org_url');
					var org_title = element.attr('org_title');
					element.removeAttr('org_url');
					element.removeAttr('org_title');
					expandLink(element, {'url':org_url, 'title':org_title});
					changed = 0;
				});
			}
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
				element.html(data.title);
			} else {
				if(maxUrlDisplayChars > 0)
				{
					if(data.length <= maxUrlDisplayChars)
					{
						element.html(data.url);
					} else {
						element.html(data.url.substring(0, maxUrlDisplayChars) + '...');
					}
				} else
				{
					element.html(data.url);
				}
			}
		} 
	}
	if(updateLinkUrl == 1)
	{
		element.attr('href', data.url);
	}		
}
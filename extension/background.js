function checkOptions()
{
	if(localStorage.maxUrlLength == undefined)
	{
		localStorage.maxUrlLength = 0;
	}
	if(localStorage.updateLinkText == undefined)
	{
		localStorage.updateLinkText = 1;
	}
	if(localStorage.updateLinkUrl == undefined)
	{
		localStorage.updateLinkUrl = 1;
	}
	if(localStorage.showTitle == undefined)
	{
		localStorage.showTitle = 0;
	}
}

function getOptions(callback) {
	// This function returns the option value requested
	// And updates the list of valid services this extension supports
	 getExpandServices();
	// Check to make sure all options are set with a value.
	checkOptions();
	options = {
		'maxUrlLength' : localStorage.maxUrlLength,
		'updateLinkText' : localStorage.updateLinkText,
		'updateLinkUrl' : localStorage.updateLinkUrl,
		'updateLinkTitle' : localStorage.showTitle,
		'services' : localStorage.services
	}
	
	callback(options);
}

function expandUrl(url, callback)
{
	// This function gets the expanded URL from a shortened URL
	$.urlExtender(url, function(result){
		callback(result);
	});	
}
			
function getExpandServices()
{
	// This function gets the list of valid expansion services
	console.log("Getting services");
	$.urlExtenderServices(function(result){
		console.log("Got services");
		var allServices = {}
		$.each(result, function(index, value) {
			service = value.domain
			allServices[service] = service;
		});
		localStorage.services = JSON.stringify(allServices);
	});
}

/**
	This section handled data sent via chrome.extension.sendMessage().
	@param request object Data sent in the request
	@param sender Object origin of the request
	@param callback Function the method should call when the request is complete
**/

function onRequest(request, sender, callback)
{
	console.log("Request: " + request.action);
	if (request.action == 'expandUrl')
	{
		expandUrl(request.url, callback);
	}
	if (request.action == 'getOptions')
	{
		getOptions(callback);
	}
	if(request.action == 'getButtonState')
	{
		getButtonState(callback);
	}
}

chrome.extension.onMessage.addListener(onRequest);
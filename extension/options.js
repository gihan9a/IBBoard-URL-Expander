$(document).ready(function() {
	chrome.extension.getBackgroundPage().checkOptions();
	init();
});

function init()
{
	$("#max_url_length").val(localStorage.maxUrlLength);
	if(localStorage.updateLinkText == 1)
	{
		$("#update_link_text").attr('checked', true);
	} else
	{
		$("#update_link_text").attr('checked', false);
	}
	if(localStorage.updateLinkUrl == 1)
	{
		$("#update_link_url").attr('checked', true);
	} else
	{
		$("#update_link_url").attr('checked', false);
	}
	if(localStorage.showTitle == 1)
	{
		$("#update_link_title").attr('checked', true);
	} else
	{
		$("#update_link_title").attr('checked', false);
	}
	makeClean();
	$("#max_url_length").keydown(function() {
		makeDirty();
	});
	$("#update_link_text").change(function() {
		makeDirty();
	})
	$("#update_link_url").change(function() {
		makeDirty();
	})
	$("#update_link_title").change(function() {
		makeDirty();
	})
	$("#update_url_cache").keydown(function(){
		makeDirty();
	})
	$("#save-button").click(saveOptions);
}

function saveOptions()
{
	localStorage.maxUrlLength = $("#max_url_length").val();
	if($("#update_link_text").is(':checked'))
	{
		localStorage.updateLinkText = 1;
	} else
	{
		localStorage.updateLinkText = 0;
	}
	if($("#update_link_url").is(':checked'))
	{
		localStorage.updateLinkUrl = 1;
	} else
	{
		localStorage.updateLinkUrl = 0;
	}
	if($("#update_link_title").is(':checked'))
	{
		localStorage.showTitle = 1;
		localStorage.updateLinkText = 1;
	} else
	{
		localStorage.showTitle = 0;
	}
	makeClean();
}

function makeClean()
{
	$("#save-button").attr('disabled', 'disabled');
}

function makeDirty()
{
	$("#save-button").removeAttr('disabled');
}
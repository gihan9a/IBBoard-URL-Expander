/*
 * urlExtender Jquery Plugin v1.0
 * http://www.tacticalcoder.com
 *
 * Copyright 2010, Don Magee
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tuesday March 30th, 2010
 */

(function($){
	var options = {
    	fetch: function( url, callback ) {
	        $.ajax({
	          dataType: 'jsonp',
	          url: 'http://therealurl.appspot.com',
	          data: { url: url, format: 'json' },
	          success: callback
	    	});
		}
    };

    $.urlExtender = function(url, callback) {
		options.fetch( url, function(data){
			if(data.url == url) {
				data = null;
			} 
			if($.isFunction(callback)){
			      callback.call(this, data);
			}
		});
	};
	
	$.urlExtenderServices = function (callback) {
		if($.isFunction(callback)){
			data = {"twitpic.com":"twitpic.com", "yfrog.com":"yfrog.com"};
			callback.call(this, data);
		}
	};
})(jQuery);
/*
 * urlExtender Jquery Plugin v1.1
 *
 * Part of:
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

(function($){
	var options = {
		fetch: function( url, callback ) {
			$.ajax({
				dataType: 'jsonp',
				url: 'http://api.longurl.org/v2/expand',
				data: { 
					url: url, 
					format: 'json',
					title: 1,
					'user-agent': 'short-url-expandercleaner/1.0'
				},
				success: callback
			});
		}
	};

	$.urlExtender = function(url, callback) {
		options.fetch( url, function(data){
			if(data['long-url'] == url) {
				data = null;
			} else {
				data['orig-url'] = url;
			}
			if($.isFunction(callback)){
					callback.call(this, data);
			}
		});
	};
	
	$.urlExtenderServices = function (callback) {
		if($.isFunction(callback)){
			$.ajax({
				dataType: 'jsonp',
				url: 'http://api.longurl.org/v2/services',
				data: { 
					format: 'json',
					'user-agent': 'short-url-expandercleaner/1.0'
				},
				success: callback
			});
		}
	};
})(jQuery);

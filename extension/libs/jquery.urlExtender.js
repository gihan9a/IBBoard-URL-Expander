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
			if($.isFunction(callback)){
			      callback.call(this, data);
			}
		});
	};
	
	$.urlExtenderServices = function (callback) {
		if($.isFunction(callback)){
			data = {".tk":".tk", "1u.ro":"1u.ro", "1url.com":"1url.com", "2pl.us":"2pl.us", "2tu.us":"2tu.us", "3.ly":"3.ly", "a.gd":"a.gd", "a.gg":"a.gg", "a.nf":"a.nf", "a2a.me":"a2a.me", "abe5.com":"abe5.com", "adjix.com":"adjix.com", "alturl.com":"alturl.com", "atu.ca":"atu.ca", "awe.sm":"awe.sm", "b23.ru":"b23.ru", "bacn.me":"bacn.me", "bit.ly":"bit.ly", "bkite.com":"bkite.com", "blippr.com":"blippr.com", "blippr.com":"blippr.com", "bloat.me":"bloat.me", "bt.io":"bt.io", "budurl.com":"budurl.com", "buk.me":"buk.me", "burnurl.com":"burnurl.com", "c.shamekh.ws":"c.shamekh.ws", "cd4.me":"cd4.me", "chilp.it":"chilp.it", "chs.mx":"chs.mx", "clck.ru":"clck.ru", "cli.gs":"cli.gs", "clickthru.ca":"clickthru.ca", "cort.as":"cort.as", "cuthut.com":"cuthut.com", "cuturl.com":"cuturl.com", "decenturl.com":"decenturl.com", "df9.net":"df9.net", "doiop.com":"doiop.com", "dwarfurl.com":"dwarfurl.com", "easyurl.net":"easyurl.net", "eepurl.com":"eepurl.com", "eezurl.com":"eezurl.com", "ewerl.com":"ewerl.com", "fa.by":"fa.by", "fav.me":"fav.me", "ff.im":"ff.im", "fff.to":"fff.to", "fhurl.com":"fhurl.com", "flic.kr":"flic.kr", "flq.us":"flq.us", "fly2.ws":"fly2.ws", "fuseurl.com":"fuseurl.com", "fwd4.me":"fwd4.me", "gl.am":"gl.am", "go.9nl.com":"go.9nl.com", "go2.me":"go2.me", "golmao.com":"golmao.com", "goo.gl":"goo.gl", "goshrink.com":"goshrink.com", "gri.ms":"gri.ms", "gurl.es":"gurl.es", "hellotxt.com":"hellotxt.com", "hex.io":"hex.io", "href.in":"href.in", "htxt.it":"htxt.it", "hugeurl.com":"hugeurl.com", "hurl.ws":"hurl.ws", "icanhaz.com":"icanhaz.com", "icio.us":"icio.us", "idek.net":"idek.net", "is.gd":"is.gd", "it2.in":"it2.in", "ito.mx":"ito.mx", "j.mp":"j.mp", "jijr.com":"jijr.com", "kissa.be":"kissa.be", "kl.am":"kl.am", "korta.nu":"korta.nu", "l9k.net":"l9k.net", "liip.to":"liip.to", "liltext.com":"liltext.com", "lin.cr":"lin.cr", "linkbee.com":"linkbee.com", "liurl.cn":"liurl.cn", "ln-s.net":"ln-s.net", "ln-s.ru":"ln-s.ru", "lnkurl.com":"lnkurl.com", "loopt.us":"loopt.us", "lru.jp":"lru.jp", "lt.tl":"lt.tl", "lurl.no":"lurl.no", "memurl.com":"memurl.com", "migre.me":"migre.me", "minilien.com":"minilien.com", "miniurl.com":"miniurl.com", "minurl.fr":"minurl.fr", "moourl.com":"moourl.com", "myurl.in":"myurl.in", "ncane.com":"ncane.com", "netnet.me":"netnet.me", "nn.nf":"nn.nf", "o-x.fr":"o-x.fr", "ofl.me":"ofl.me", "omf.gd":"omf.gd", "ow.ly":"ow.ly", "oxyz.info":"oxyz.info", "p8g.tw":"p8g.tw", "parv.us":"parv.us", "pic.gd":"pic.gd", "ping.fm":"ping.fm", "piurl.com":"piurl.com", "plurl.me":"plurl.me", "pnt.me":"pnt.me", "poll.fm":"poll.fm", "pop.ly":"pop.ly", "poprl.com":"poprl.com", "post.ly":"post.ly", "posted.at":"posted.at", "ptiturl.com":"ptiturl.com", "qurlyq.com":"qurlyq.com", "rb6.me":"rb6.me", "readthis.ca":"readthis.ca", "redirects.ca":"redirects.ca", "redirx.com":"redirx.com", "relyt.us":"relyt.us", "retwt.me":"retwt.me", "ri.ms":"ri.ms", "rickroll.it":"rickroll.it", "rly.cc":"rly.cc", "rsmonkey.com":"rsmonkey.com", "rubyurl.com":"rubyurl.com", "rurl.org":"rurl.org", "s3nt.com":"s3nt.com", "s7y.us":"s7y.us", "short.ie":"short.ie", "short.to":"short.to", "shortna.me":"shortna.me", "shoturl.us":"shoturl.us", "shrinkster.com":"shrinkster.com", "shrinkurl.us":"shrinkurl.us", "shrtl.com":"shrtl.com", "shw.me":"shw.me", "simurl.net":"simurl.net", "simurl.org":"simurl.org", "simurl.us":"simurl.us", "sn.im":"sn.im", "sn.vc":"sn.vc", "snipr.com":"snipr.com", "snipurl.com":"snipurl.com", "snurl.com":"snurl.com", "sp2.ro":"sp2.ro", "spedr.com":"spedr.com", "starturl.com":"starturl.com", "stickurl.com":"stickurl.com", "sturly.com":"sturly.com", "su.pr":"su.pr", "takemyfile.com":"takemyfile.com", "tcrn.ch":"tcrn.ch", "thrdl.es":"thrdl.es", "tighturl.com":"tighturl.com", "tiny.cc":"tiny.cc", "tiny.pl":"tiny.pl", "tinyarro.ws":"tinyarro.ws", "tinytw.it":"tinytw.it", "tinyurl.com":"tinyurl.com", "tl.gd":"tl.gd", "tnw.to":"tnw.to", "to.ly":"to.ly", "togoto.us":"togoto.us", "tr.im":"tr.im", "tr.my":"tr.my", "trcb.me":"trcb.me", "tumblr.com":"tumblr.com", "tw0.us":"tw0.us", "tw1.us":"tw1.us", "tw2.us":"tw2.us", "tw5.us":"tw5.us", "tw6.us":"tw6.us", "tw8.us":"tw8.us", "tw9.us":"tw9.us", "twa.lk":"twa.lk", "twi.gy":"twi.gy", "twit.ac":"twit.ac", "twitthis.com":"twitthis.com", "twiturl.de":"twiturl.de", "twitzap.com":"twitzap.com", "twtr.us":"twtr.us", "twurl.nl":"twurl.nl", "u.mavrev.com":"u.mavrev.com", "u.nu":"u.nu", "ub0.cc":"ub0.cc", "updating.me":"updating.me", "ur1.ca":"ur1.ca", "url.co.uk":"url.co.uk", "url.ie":"url.ie", "url.inc-x.eu":"url.inc-x.eu", "url4.eu":"url4.eu", "urlborg.com":"urlborg.com", "urlbrief.com":"urlbrief.com", "urlcut.com":"urlcut.com", "urlhawk.com":"urlhawk.com", "urlkiss.com":"urlkiss.com", "urlpire.com":"urlpire.com", "urlvi.be":"urlvi.be", "urlx.ie":"urlx.ie", "uservoice.com":"uservoice.com", "ustre.am":"ustre.am", "virl.com":"virl.com", "vl.am":"vl.am", "wa9.la":"wa9.la", "wapurl.co.uk":"wapurl.co.uk", "wipi.es":"wipi.es", "wkrg.com":"wkrg.com", "wp.me":"wp.me", "x.hypem.com":"x.hypem.com", "x.se":"x.se", "xeeurl.com":"xeeurl.com", "xr.com":"xr.com", "xrl.in":"xrl.in", "xrl.us":"xrl.us", "xurl.jp":"xurl.jp", "xzb.cc":"xzb.cc", "yatuc.com":"yatuc.com", "ye-s.com":"ye-s.com", "yep.it":"yep.it", "yfrog.com":"yfrog.com", "zi.pe":"zi.pe", "zz.gd":"zz.gd"};
			callback.call(this, data);
		}
	};
})(jQuery);
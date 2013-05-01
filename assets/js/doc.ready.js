$(document).ready(function()
{	
	/******************************
	Main Image Slideshow
	******************************/
	if( $('#slideshow-container').length > 0 )
	{
		$('#slideshow-container').after
		(
			'<div id="slideshow-arrows"><a href="#" id="slideshow-prev"></a><a href="#" id="slideshow-next"></a></div><div id="slideshow-buttons-wrap"><div id="slideshow-buttons"></div></div>'
		);
		
		$('#slideshow-container').cycle({ 
			fx:	  'fade', 
			timeout:  8000,
			speed:  2000,
			fastOnEvent:   500,
			cleartype:  false,
			pause: 1,
			pauseOnPagerHover: 1,
			pager:  '#slideshow-buttons',
			next:	'#slideshow-next',
			prev:	'#slideshow-prev',
			pagerEvent: 'mouseover',
			pagerAnchorBuilder: function(idx, slide)
			{
				return '<a href="#"><img src="/assets/images/slideshow/bullets.png" /></a>';
			}
		});
		$('#slideshow-container').hover(
			function()
			{
				//show nav arrows
				$('#slideshow-arrows').fadeIn();
			},
			function()
			{
				//hide nav arrows
				$('#slideshow-arrows').fadeOut();
			}
		);
	}
	
	/******************************
	Contact Form
	******************************/

	if( $('form').length > 0 )
	{
		/* AJAX Submission */
	
		$('#contact-form').ajaxForm({
			beforeSubmit: function(data, form, options)
			{
				// Validate
				var error = '';
				$.each($("#contact-form .val"), function(i,v) {
					var title = $(v).attr('title');
					var value = $(v).val();
					if(title == value)
					{
						error += "Please complete your " + value + '<br/>';
					}
				});
				
				if(error)
				{	
					$('#form-message').html('<span class="error">'+error+'</span>');
					return false;
				}
			},
			success: function(data)
			{
				if (data.match(/<title>Error<\/title>/))
				{
					var error = $(data).find('ul li:first').text();
					$('#form-message').html('<span class="error">'+error+'</span>');
				}
				else
				{
					$('#contact-form').hide();
					$('#form-message').html('Thank you for your interest.<br/>Your email has been sent.');
				}
			},
			dataType: 'html'
		});

	}
	
	/******************************
	Responsive Menu
	******************************/
	$('#menu-toggle').toggle(
		function()
		{
			$('#header-main-menu > ul').fadeIn(100);
			$('#menu-toggle').addClass("active");
			return false;
		},
		function()
		{
			$('#header-main-menu > ul').fadeOut(100);
			$('#menu-toggle').removeClass("active");
			return false;
		}
	);
	
	/******************************
	Popups - prettyPhoto
	******************************/
	
	$("a.popup").prettyPhoto(
	{
		default_width: 697,
		default_height: 392,
		theme: 'dark_rounded'
	});
	
	/******************************
	ios-viewport-scaling-bug-fix.js
	******************************/
	(function(doc)
	{
	 
		var addEvent = 'addEventListener',
			type = 'gesturestart',
			qsa = 'querySelectorAll',
			scales = [1, 1],
			meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
		function fix()
		{
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}
		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [.25, 1.6];
			doc[addEvent](type, fix, true);
		}
	}(document));
	
	/******************************
	COOKIE NOTICE
	******************************/
	if(getCookie('show_cookie_message') != 'no')
	{
		$('#cookie_box').show();
	}

	$('.cookie_box_close').click(function()
	{
		$('#cookie_box').fadeOut("slow");
		setCookie('show_cookie_message','no');
		return false;
	});
	
});

/******************************
Functions
******************************/
function setCookie(cookie_name, value)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + (365*25));
	document.cookie = cookie_name + "=" + escape(value) + "; expires="+exdate.toUTCString();
}

function getCookie(cookie_name)
{
	if (document.cookie.length>0)
	{
		cookie_start = document.cookie.indexOf(cookie_name + "=");
		if (cookie_start != -1)
		{ 
			cookie_start = cookie_start + cookie_name.length+1; 
			cookie_end = document.cookie.indexOf(";",cookie_start);
			if (cookie_end == -1)
			{
				cookie_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(cookie_start,cookie_end));
		} 
	}
	return "";
}

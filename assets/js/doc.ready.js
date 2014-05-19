$(document).ready(function()
{
	/***********************************
	Checkout - Shipping Fields
	***********************************/
	if ($('#shipping-fields').length > 0)
	{
		$('#use_billing_info').click(function(e)
		{
			$('#shipping-fields').slideToggle();
		});
	}
	
	/***********************************
	Contact Form AJAX Submission
	***********************************/
	var contact_form_options =
	{
		beforeSubmit: function(data, form, options)
		{
			$('.error').removeClass('error');
			// Validate
			var error = '';
			$.each($('.contact_form .required'), function(i,elem)
			{
				if(!$(elem).val())
				{
					var error_label = $('label[for="'+ $(elem).attr('id') +'"]');
					error += 'Please complete your ' + error_label.text() + '<br/>';
					error_label.addClass('error');
				}
			});
			if(error)
			{	
				$('.form-message').html('<span class="error">'+error+'</span>');
				return false;
			}
		},
		success: function(data)
		{
			if (data.match(/<title>Error<\/title>/))
			{
				var error = $(data).find('ul li:first').text();
				$('.form-message').html('<span class="error">'+error+'</span>');
			}
			else
			{
				$('.contact_form').hide();
				$('#contact-form-thank-you').show();
			}
		}
	};
	
	$('#contact_form').ajaxForm(contact_form_options);
	
	/***********************************
	Form labels as placeholders
	***********************************/
	// Place title text as placeholder & hide labels
	if (document.createElement("input").placeholder != undefined)
	{
		$('.compact label').each(function()
		{
			var label = $(this);
			if($(label).next().val() == '')
			{
				$(label).next().attr('placeholder',$(label).text()).addClass('full');
				$(label).hide();
			}
		});
	}
	
	/***********************************
	Gallery
	***********************************/
	$('.gallery-image .gallery-thumb').magnificPopup(
	{
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item)
			{
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
		gallery:
		{
			enabled: true
		},
		zoom:
		{
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element)
			{
				return element.find('img');
			}
		}
		
	});
	
	/***********************************
	Infinite Scroll
	***********************************/
	if($('.index-list').length > 0)
	{
		$('.index-list').infinitescroll(
		{
			loading: {
				finishedMsg: "<em>No more posts to display!</em>",
				img: "/assets/images/loading.gif",
				msg: null,
				msgText: "<em>Loading the next set of posts...</em>",
				selector: null,
				speed: 'fast',
				start: undefined
			},
			navSelector : ".pagination",
			nextSelector : "a.older",
			itemSelector : ".article",
			contentSelector: ".index-list",
			extractLink: true
		});
	}
	
	/***********************************
	Login/Register tabs
	***********************************/
	if ($('#register-form').length > 0)
	{
		if ((window.location.hash == "#register" ) || ($('#register-form .error').length > 0))
		{
			$('#login-form').hide();
			$('#register-form').fadeIn(300);
		}
		$('.form-switch a').click(function()
		{
			var a = $(this);
			var b = a.attr('href') + "-form";	// Will return either #login-form or #register-form
			$(a).parents('form').hide();
			$(b).fadeIn(300);
		});
	}
	
	/******************************
	Modals
	Docs: http://dimsemenov.com/plugins/magnific-popup/documentation.html
	******************************/
	
	$(".modal").magnificPopup(
	{
		type:'image',
		disableon: 580,
		closeOnContentClick: true,	// Enable if just one image in popup
		zoom:
		{
			enabled: true,
			duration: 300,
			easing: 'ease-in-out' 
		}
	});
	
	/***********************************
	Product Category Filter
	***********************************/
	if ($('.shop-cat #product-filter').length > 0)
	{
		$(document).on("click", '.filter, .category-group', function(e)
		{
			e.preventDefault();
			$clicked = $(this);
			$url = $clicked.attr("href");
			$fragment = $url + ' #products .product';
			$title = $clicked.text();
			// Collect and insert filtered products
			$('#products').load($fragment, function()
			{
				$(this).children().hide().fadeIn(200);
				history.pushState(null, $title, $url);
				document.title = $title;
			});
		});
		$(document).ajaxSend(function(e, jqXHR)
		{
			$('.product').fadeOut(200,function()
			{
				$('#products').html('<div id="loading" />');
			})
		});
	}
	
	/***********************************
	Product On-Page Filter
	***********************************/
	if ($('.shop #nav_categories').length > 0)
	{
		if(document.location.hash != "")
		{
			$('#products').children().hide();
			$('#products .'+document.location.hash.split('#')[1]).show();
			$(document.location.hash).prop('checked',true)
		}
		$('#nav_categories input').click(function()
		{
			$input = $(this);
			if($input.is(':checked'))
			{
				var group = "input:checkbox[name='" + $(this).attr("name") + "']";
				$(group).prop("checked", false);
				$input.prop("checked", true);
				$val = $input.val();
				$('#products').fadeOut(400,function()
				{
					$('#products').children().hide();
					$('#products .'+$val).show();
					$('#products').fadeIn(400);
					document.location.hash = $val;
				});
			}
			else
			{
				$input.prop("checked", false);
				$('#products').fadeOut(400,function()
				{
					$('#products').children().show();
					$('#products').fadeIn(400);
					history.pushState(null, document.title, document.location.href.split('#')[0]);
				});
			}
		});
	}
	
	/******************************
	Responsive Menu
	******************************/
	$('#header-main-menu').meanmenu(
	{
		meanScreenWidth: "580"
	});
	
	
	/***********************************
	Slideshows
	***********************************/
	/* Home Slideshow */
	if ($('#home-slideshow').length > 0)
	{
		$('#home-slideshow').cycle(
		{
			log					:	false,
			slides				:	'> .slide',
			next				:	'.cycle-next',
			prev				:	'.cycle-prev',
			pager				:	'.cycle-pager',
			pagerEvent			:	'mouseover.cycle',
			pagerTemplate		:	'<span></span>',
			pauseOnHover		:	true,
			timeout				:	9000
		});
		$('#home-slideshow').hover(function()
		{
			$('.slideshow-control').fadeIn();
		},
		function()
		{
			$('.slideshow-control').fadeOut();
		});
	}
	
	/* Product Slideshow */
	if ($('#product-slideshow').length > 0)
	{
		$('#product-slideshow').cycle(
		{
			log 			: 	false,
			slides			:	'> .slide',
			pager			:	'.cycle-pager',
			pagerEvent		:	'mouseover.cycle',
			pagerTemplate	:	'<img src="{{children.0.src}}" width="85" class="col slide-thumb" />',
			pauseOnHover	:	true
		});
	}
	
	/******************************
	ios-viewport-scaling-bug-fix.js
	*****************************
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
	}(document));*/
	
	/******************************
	COOKIE NOTICE
	******************************/
	if(getCookie('show_cookie_message') != 'no')
	{
		$('#cookie_box').addClass('visible');
	}

	$('.cookie_box_close').click(function()
	{
		$('#cookie_box').removeClass('visible');
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

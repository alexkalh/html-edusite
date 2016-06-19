"use strict";

jQuery(document).ready ($) ->
	Edusite.initNavigation()
	Edusite.initNivoSlider()
	Edusite.initCarousel()
	Edusite.initBlog()
	Edusite.initTestimonials()
	return

jQuery(window).load ($) ->
	return

jQuery(window).scroll ($) ->
	return


Edusite =
	
	initNavigation: ->
		if jQuery('.navigation').length
			jQuery('.navigation ul').superfish
				cssArrows: false
				delay: 0
				speed: 'fast'
				speedOut: 'fast'

		return
	
	initNivoSlider: ->
		$e_slider = jQuery('.e-slider')
		if $e_slider.length
			$e_slider.find('.nivoSlider').nivoSlider
				pauseTime: 10000
				directionNav: true
				controlNav: false
				randomStart: false
				beforeChange: ->
					$e_slider.find('.nivo-caption').find( '.animated' ).each ->
						jQuery(this).addClass 'fadeOut'
						return
					return
				afterChange: ->
					$e_slider.find('.nivo-caption').find('.animated').each ->
						jQuery(this).addClass jQuery(this).attr( 'data-animate' )
						return
					return
				afterLoad: ->
					$e_slider.find('.nivo-caption').find('.animated').each ->
						jQuery(this).addClass jQuery(this).attr('data-animate')
						return
					return

		return		
	
	initCarousel: ->
		$e_carousel = jQuery('.e-carousel .owl-carousel')
		if $e_carousel.length
			$e_carousel.owlCarousel				
				items : 2
				pagination : false
				navigation : false

		return

	initTestimonials: ->
		$e_testimonials = jQuery('.e-testimonials .owl-carousel')
		if $e_testimonials.length
			$e_testimonials.owlCarousel				
				items : 1
				singleItem : true
				pagination : true
				navigation : false
		return

	initBlog: ->
		$e_blogs = jQuery('.e-blog .owl-carousel')
		if $e_blogs.length
			$e_blogs.owlCarousel				
				items : 2
				pagination : false
				navigation : false

		return		
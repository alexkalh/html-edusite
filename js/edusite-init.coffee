"use strict";

jQuery(document).ready ($) ->
	Edusite.initNavigation()
	Edusite.initNivoSlider()
	Edusite.initCarousel()
	Edusite.initBlog()
	Edusite.initTestimonials()

	Edusite_Count_Down.register()

	Edusite_Accordions.init()
	return

jQuery(window).load ($) ->
	Edusite.initMatchHeight()	
	return

jQuery(window).scroll ($) ->
	return


Edusite =
	
	initNavigation: ->
		if jQuery('.e-navigation').length
			jQuery('.e-navigation ul').superfish
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
				directionNav: false
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

			jQuery.each $e_carousel, ()->
				$_widget = jQuery(this).closest '.e-carousel'
				$_next   = $_widget.find '.e-next'
				$_prev   = $_widget.find '.e-prev'

				$_owl = jQuery(this).owlCarousel			
					items : 2
					pagination : false
					navigation : false
					afterInit: ->		
						$_prev.on "click", ->
							$_owl.trigger 'owl.prev'
							return

						$_next.on "click", ->
							$_owl.trigger 'owl.next'
							return

						return
				return
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

	initMatchHeight: ->
		$e_rows = jQuery( '.e-match-height' )
		if $e_rows.length
			jQuery.each $e_rows, ()->
				jQuery(this).find(' > div .e-col').matchHeight()
				return
		return


Edusite_Count_Down = 
	
	register: ->
		$e_counter = jQuery '.e-count-down'
		
		if $e_counter.length
			jQuery.each $e_counter, ()->				
				$_obj = jQuery(this)				
				$_end   = new Date $_obj.find('.e-date').val()				
				countdown( $_end, ( ( ts ) ->						
					$_obj.find( '.e-number:eq(0) b' ).html ts.hours
					$_obj.find( '.e-number:eq(1) b' ).html ts.minutes
					$_obj.find( '.e-number:eq(2) b' ).html ts.seconds						
					return
				), countdown.HOURS | countdown.MINUTES | countdown.SECONDS)			
						
				return
		return

Edusite_Accordions = 

	init: ->
		$e_accordions = jQuery '.e-accordions'
		if $e_accordions.length			
			$e_accordions.on 'click', '> h4', ( $event )->				
				$e_wrap    = jQuery( this ).closest '.e-accordions'
				$e_caption = jQuery( this )

				if ! $e_caption.hasClass 'e-active'
					$e_wrap.find( '.e-active' ).removeClass( 'e-active' )
					$e_caption.addClass 'e-active'
					$e_caption.next().addClass 'e-active'

				return
		return
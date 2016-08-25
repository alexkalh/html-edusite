"use strict";

jQuery(document).ready ($) ->

	Edusite.initNavigation()	
	Edusite_Count_Down.create()
	Edusite_Slider.init( 'nivo' )
	Edusite_Course.init( 'carousel' )	
	Edusite_Testimonial.init( 'carousel' )

	return

jQuery(window).load ($) ->	
	Edusite_Hack.matchHeight( '> div .e-col' )
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
			
Edusite_Slider = 
	init: ( type )->
		if 'nivo' == type
			Edusite_Slider.getNivo()
		return
	getNivo: ->
		$e_nivoSliderLarge = jQuery('.e-slider--nivo')
		if $e_nivoSliderLarge.length
			$e_nivoSliderLarge.find('.nivoSlider').nivoSlider
				pauseTime: 10000
				directionNav: false
				controlNav: false
				randomStart: false				
				beforeChange: ->
					$e_nivoSliderLarge.find('.nivo-caption').find( '.animated' ).each ->
						jQuery(this).addClass 'fadeOut'
						return
					return
				afterChange: ->
					$e_nivoSliderLarge.find('.nivo-caption').find('.animated').each ->
						jQuery(this).addClass jQuery(this).attr( 'data-animate' )
						return
					return
				afterLoad: ->
					$e_nivoSliderLarge.find('.nivo-caption').find('.animated').each ->
						jQuery(this).addClass jQuery(this).attr('data-animate')
						return
					return
		return
	
Edusite_Course = 
	init: ( type ) ->
		if 'carousel' == type
			Edusite_Course.makeCarousel()
		return

	makeCarousel: ->
		$e_course_sliders = jQuery( '.e-courses--carousel .owl-carousel' )
		if $e_course_sliders.length
			
			jQuery.each $e_course_sliders, ()->

				$_widget = jQuery(this).closest '.e-courses--carousel'
				$_next   = $_widget.find '.e-owl__nav__link--next'
				$_prev   = $_widget.find '.e-owl__nav__link--prev'

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

Edusite_Count_Down = 
	create: ->
		$e_counter = jQuery '.e-count_down'
		
		if $e_counter.length
			jQuery.each $e_counter, ()->				
				$_obj = jQuery(this)				
				$_end   = new Date $_obj.find('input[type=hidden]').val()				
				countdown( $_end, ( ( ts ) ->						
					$_obj.find( '.e-date--hours .e-date_block__number' ).html ts.hours
					$_obj.find( '.e-date--minutes .e-date_block__number' ).html ts.minutes
					$_obj.find( '.e-date--seconds .e-date_block__number' ).html ts.seconds						
					return
				), countdown.HOURS | countdown.MINUTES | countdown.SECONDS)			
						
				return
		return

Edusite_Hack = 
	matchHeight: (selector)->
		$e_rows = jQuery( '.e-height--match' )
		if $e_rows.length
			jQuery.each $e_rows, ()->
				jQuery(this).find( selector ).matchHeight()
				return
		return

Edusite_Testimonial =
	init: ( type ) ->
		if 'carousel' == type
			Edusite_Testimonial.makeCarousel()
		return

	makeCarousel: () ->
		$carousels = jQuery '.e-testimonials--carousel'

		if $carousels.length

			jQuery.each $carousels, ( index, item ) ->
				$slides    = jQuery(this).find '.e-testimonials__slides'
				$avatars   = jQuery(this).find '.e-testimonials__avatars'
				
				slides_id  = $slides.attr( 'id' )
				avatars_id = $avatars.attr( 'id' )

				console.log( slides_id )
				console.log( avatars_id )

				if $slides.length

					$slides.slick
						slidesToShow: 1
						slidesToScroll: 1
						arrows: false
						fade: false
						swipe: false
						adaptiveHeight: true
						asNavFor: '#' + avatars_id

					$avatars.slick
						slidesToShow: 3
						slidesToScroll: 1
						arrows: false
						fade: false	
						centerMode: true
						focusOnSelect: true
						swipe: false
						asNavFor: '#' + slides_id
						centerPadding: '0px'

				return


		return

"use strict";

jQuery( document ).ready ( $ ) ->
	Edusite.initNavigation()	
	Edusite_Count_Down.create()
	Edusite_Slider.init( 'nivo' )
	Edusite_Course.init( 'carousel' )	
	Edusite_Testimonial.init( 'carousel' )
	Edusite_Testimonial.init( 'carouselSingle' )
	Edusite_Progress_Bar.init( '1st' )
	Edusite_Field.init( 'select' )
	return

jQuery( window ).on 'load', ( $ ) ->
	Edusite_Hack.matchHeight( '> div .e-col' )	
	return

jQuery( window ).on 'scroll', ( $ ) ->
	return

Edusite =	
	initNavigation: ->
		if jQuery('.e-navigation').length
			jQuery('.e-navigation ul').superfish
				cssArrows: false
				delay: 800
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

Edusite_Progress_Bar = 
	init: ( type ) ->		
		if '1st' == type
			Edusite_Progress_Bar.init_style_1st()
		return

	init_style_1st: () ->

		$bars = jQuery '.e-progress_bar--1st'

		if $bars.length

			jQuery.each $bars, ( index, element ) ->

				$element = jQuery( this ).find '.e-progress_bar__current'

				start   = $element.attr 'data-start'
				percent = $element.attr 'data-percent'
				delay   = 500

				if !$element.hasClass( 'animated' )
					$element.css
						width : start

				$element.appear ->
				  setTimeout (->
				    $element.animate( { 'width': percent + '%' }, 500, 'easeInOutExpo' ).addClass 'animated'
				    return
				  ), delay

				  return

				return

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
		else if 'carouselSingle' == type
			Edusite_Testimonial.makeCarouselSingle()
		return

	makeCarousel: () ->
		$carousels = jQuery '.e-testimonials--carousel'

		if $carousels.length

			jQuery.each $carousels, ( index, item ) ->
				$slides    = jQuery(this).find '.e-testimonials__slides'
				$avatars   = jQuery(this).find '.e-testimonials__avatars'
				
				slides_id  = $slides.attr( 'id' )
				avatars_id = $avatars.attr( 'id' )

				if $slides.length

					$slides.slick
						slidesToShow: 1
						slidesToScroll: 1
						arrows: false
						fade: false
						swipe: false
						adaptiveHeight: false
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

	makeCarouselSingle: () ->
		$carousels = jQuery '.e-testimonials--carouselSingle'

		if $carousels.length

			jQuery.each $carousels, ( index, item ) ->

				$slides = jQuery(this).find '.e-testimonials__slides'

				if $slides.length
					$slides.owlCarousel			
						items : 1
						singleItem: true
						pagination : true
						navigation : false

				return

		return

Edusite_Effect =
	init: ( type )->
		return

Edusite_Field = 
	init: ( type )->
		if 'select' == type
			Edusite_Field._select()
		return

	_select: () ->
		$fields = jQuery( 'select[data-field=select]' )

		if $fields.length
			
			_.each $fields, ( el )->
				$options  = jQuery( el ).find( 'option' )
				$selected = jQuery( el ).find( 'option:selected' )				
				
				list = '<div class="e-field__placehold"><span class="e-field__current">' + $selected.text() + '</span><span class="e-field__caret fa fa-caret-down"></span></div>'
				list += '<ul class="e-field__list">'
				_.each $options, ( el_child )->
					list += '<li class="e-field__item" data-value="'+ jQuery( el_child ).attr( 'value' ) + '">' + jQuery( el_child ).text() + '</li>'
					return
				list += '</ul>'

				jQuery( el ).wrap( '<div data-field="dropdown" class="' + jQuery( el ).attr( 'data-field-class' ) + '"></div>' ).addClass( 'hidden' )
				jQuery( el ).parent().append( list )

				return
		
			jQuery( '.e-form' ).on 'click', '.e-field__placehold', ( event )->
				
				$element  = jQuery( this )
				$caret    = $element.find( '.e-field__caret' )
				$dropdown = $element.parent()
				$list     = $dropdown.find( '.e-field__list' )

				if $list.is(':hidden')
					$list.show()
					$caret.removeClass( 'fa-caret-down' ).addClass( 'fa-caret-up' )
				else
					$list.hide()
					$caret.removeClass( 'fa-caret-up' ).addClass( 'fa-caret-down' )

				return

			jQuery( '.e-form' ).on 'click', '.e-field__item', ( event )->
				$dropdown       = jQuery( this ).parents( '.e-field--dropdown' )
				$placehold      = $dropdown.find( '.e-field__placehold' )
				$current        = $dropdown.find( '.e-field__current' )
				$select         = $dropdown.find( 'select' )
				$selected_value = jQuery( this ).attr( 'data-value' )
				$selected_text  = jQuery( this ).text()

				if $selected_text != $current.text()
					$current.text $selected_text
					$select.find( 'option').removeAttr( 'selected' )
					$select.find( 'option[value="' + $selected_value + '"]').attr( 'selected', 'selected' )					
				
				$placehold.click()				

				return

		return


"use strict";

jQuery( document ).ready ( $ ) ->
	Edusite.initNavigation()
	Edusite_Count_Down.create()
	Edusite_Slider.init( 'nivo' )
	Edusite_Course.init( 'carousel' )
	Edusite_Course.init( 'masonry' )
	Edusite_Lecture.init( 'carousel' )
	Edusite_Testimonial.init( 'carousel' )
	Edusite_Testimonial.init( 'carousel-single' )
	Edusite_Testimonial.init( 'carousel-with-nav' )
	Edusite_Progress_Bar.init( 'default' )
	Edusite_Progress_Bar.init( 'secondary' )
	Edusite_Gallery.init( 'default' )
	Edusite_Video.init( 'responsive' )
	Edusite_Audio.init( 'mediaelementplayer' )
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
		else if 'masonry' == type
			Edusite_Course.makeMasonry()
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

	makeMasonry: ->

		$e_course_masonries = jQuery( '.e-courses--masonry .e-courses__outer' )
		if $e_course_masonries.length

			jQuery.each $e_course_masonries, ()->
				$_tmp = jQuery( @ )
				$_tmp.imagesLoaded ()->
					$_tmp.masonry
						itemSelector: '.e-courses__course'
					return
				return
		return

Edusite_Count_Down =
	create: ->
		$e_counter = jQuery '.e-count_down--first'

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
		if 'default' == type
			Edusite_Progress_Bar.init_style_default()
		else if 'secondary' == type
			Edusite_Progress_Bar.init_style_secondary()
		return

	init_style_default: () ->

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

	init_style_secondary: () ->
		$bars = jQuery '.e-progress_bar--secondary'

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
		else if 'carousel-single' == type
			Edusite_Testimonial.makeCarouselSingle()		
		else if 'carousel-with-nav' == type
			Edusite_Testimonial.makeCarouselWithNav()
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

	makeCarouselWithNav: () ->
		$carousels = jQuery '.e-testimonials--carousel_with_nav'

		if $carousels.length

			jQuery.each $carousels, ( index, item ) ->

				$slides = jQuery(this).find '.e-testimonials__slides'

				if $slides.length
					$slides.owlCarousel
						items : 1
						singleItem: true
						pagination : false
						navigation : true
						autoHeight : true
						rewindNav: false
						transitionStyle: 'fade'
						navigationText: [ '<i class="e-testimonials__nav__item e-testimonials__nav__prev arrow_left"></i>', '<i class="e-testimonials__nav__item e-testimonials__nav__next arrow_right"></i>' ]

				return
		return


Edusite_Effect =
	init: ( type )->
		return

Edusite_Gallery =
	init: ( stype )->
		if 'default' == stype
			Edusite_Gallery.init_style_default()
		return

	init_style_default: () ->

		$galleries = jQuery("[data-role='gallery'][data-style='default']").not("[data-state='bound']")

		if $galleries.length
			jQuery.each $galleries, () ->

				jQuery( @ ).find( '.owl-carousel' ).owlCarousel
					items: 1
					singleItem: true
					pagination: false
					navigation: true
					theme: 'e-owl--default'
					navigationText: [ '<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>' ]

				return

		return

Edusite_Video =
	init: ( stype )->
		if 'responsive' == stype
			Edusite_Video.init_responsive()
		return
	init_responsive: ()->
		jQuery('body').fitVids()
		return

Edusite_Audio =
	init: ( stype ) ->
		if 'mediaelementplayer' == stype
			Edusite_Audio.init_mediaelementplayer()
		return
	init_mediaelementplayer: ()->
		jQuery('audio').mediaelementplayer()
		return

Edusite_Lecture =
	init: ( stype ) ->
		if 'carousel' == stype
			Edusite_Lecture.init_carousel()
		return
	init_carousel: ()->

		$e_lectures = jQuery( '.e-lectures--carousel .owl-carousel' )
		if $e_lectures.length

			jQuery.each $e_lectures, ()->
				$_owl = jQuery(this).owlCarousel
					items : 4
					pagination : false
					navigation : true
					theme: 'e-owl--bottom_navigation'
					navigationText: [ '<i class="e-owl__arrow ti-angle-left"></i>', '<i class="e-owl__arrow ti-angle-right"></i>' ]
				return
		return

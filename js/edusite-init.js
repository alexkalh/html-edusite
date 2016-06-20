(function() {
  "use strict";
  var Edusite;

  jQuery(document).ready(function($) {
    Edusite.initNavigation();
    Edusite.initNivoSlider();
    Edusite.initCarousel();
    Edusite.initBlog();
    Edusite.initTestimonials();
  });

  jQuery(window).load(function($) {
    Edusite.initMatchHeight();
  });

  jQuery(window).scroll(function($) {});

  Edusite = {
    initNavigation: function() {
      if (jQuery('.e-navigation').length) {
        jQuery('.e-navigation ul').superfish({
          cssArrows: false,
          delay: 0,
          speed: 'fast',
          speedOut: 'fast'
        });
      }
    },
    initNivoSlider: function() {
      var $e_slider;
      $e_slider = jQuery('.e-slider');
      if ($e_slider.length) {
        $e_slider.find('.nivoSlider').nivoSlider({
          pauseTime: 10000,
          directionNav: false,
          controlNav: false,
          randomStart: false,
          beforeChange: function() {
            $e_slider.find('.nivo-caption').find('.animated').each(function() {
              jQuery(this).addClass('fadeOut');
            });
          },
          afterChange: function() {
            $e_slider.find('.nivo-caption').find('.animated').each(function() {
              jQuery(this).addClass(jQuery(this).attr('data-animate'));
            });
          },
          afterLoad: function() {
            $e_slider.find('.nivo-caption').find('.animated').each(function() {
              jQuery(this).addClass(jQuery(this).attr('data-animate'));
            });
          }
        });
      }
    },
    initCarousel: function() {
      var $e_carousel;
      $e_carousel = jQuery('.e-carousel .owl-carousel');
      if ($e_carousel.length) {
        $e_carousel.owlCarousel({
          items: 2,
          pagination: false,
          navigation: false
        });
      }
    },
    initTestimonials: function() {
      var $e_testimonials;
      $e_testimonials = jQuery('.e-testimonials .owl-carousel');
      if ($e_testimonials.length) {
        $e_testimonials.owlCarousel({
          items: 1,
          singleItem: true,
          pagination: true,
          navigation: false
        });
      }
    },
    initBlog: function() {
      var $e_blogs;
      $e_blogs = jQuery('.e-blog .owl-carousel');
      if ($e_blogs.length) {
        $e_blogs.owlCarousel({
          items: 2,
          pagination: false,
          navigation: false
        });
      }
    },
    initMatchHeight: function() {
      var $e_rows;
      $e_rows = jQuery('.e-match-height');
      if ($e_rows.length) {
        jQuery.each($e_rows, function() {
          jQuery(this).find(' > div .e-col').matchHeight();
        });
      }
    }
  };

}).call(this);

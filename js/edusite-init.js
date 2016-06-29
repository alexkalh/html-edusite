(function() {
  "use strict";
  var Edusite, Edusite_Accordions, Edusite_Count_Down;

  jQuery(document).ready(function($) {
    Edusite.initNavigation();
    Edusite.initNivoSlider();
    Edusite.initCarousel();
    Edusite.initBlog();
    Edusite.initTestimonials();
    Edusite_Count_Down.register();
    Edusite_Accordions.init();
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
        jQuery.each($e_carousel, function() {
          var $_next, $_owl, $_prev, $_widget;
          $_widget = jQuery(this).closest('.e-carousel');
          $_next = $_widget.find('.e-next');
          $_prev = $_widget.find('.e-prev');
          $_owl = jQuery(this).owlCarousel({
            items: 2,
            pagination: false,
            navigation: false,
            afterInit: function() {
              $_prev.on("click", function() {
                $_owl.trigger('owl.prev');
              });
              $_next.on("click", function() {
                $_owl.trigger('owl.next');
              });
            }
          });
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

  Edusite_Count_Down = {
    register: function() {
      var $e_counter;
      $e_counter = jQuery('.e-count-down');
      if ($e_counter.length) {
        jQuery.each($e_counter, function() {
          var $_end, $_obj;
          $_obj = jQuery(this);
          $_end = new Date($_obj.find('.e-date').val());
          countdown($_end, (function(ts) {
            $_obj.find('.e-number:eq(0) b').html(ts.hours);
            $_obj.find('.e-number:eq(1) b').html(ts.minutes);
            $_obj.find('.e-number:eq(2) b').html(ts.seconds);
          }), countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
        });
      }
    }
  };

  Edusite_Accordions = {
    init: function() {
      var $e_accordions;
      $e_accordions = jQuery('.e-accordions');
      if ($e_accordions.length) {
        $e_accordions.on('click', '> h4', function($event) {
          var $e_caption, $e_wrap;
          $e_wrap = jQuery(this).closest('.e-accordions');
          $e_caption = jQuery(this);
          if (!$e_caption.hasClass('e-active')) {
            $e_wrap.find('.e-active').removeClass('e-active');
            $e_caption.addClass('e-active');
            $e_caption.next().addClass('e-active');
          }
        });
      }
    }
  };

}).call(this);

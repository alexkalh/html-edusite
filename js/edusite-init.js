"use strict";
var Edusite, Edusite_Count_Down, Edusite_Course, Edusite_Effect, Edusite_Hack, Edusite_Slider, Edusite_Testimonial;

jQuery(document).ready(function($) {
  Edusite.initNavigation();
  Edusite_Count_Down.create();
  Edusite_Slider.init('nivo');
  Edusite_Course.init('carousel');
  Edusite_Testimonial.init('carousel');
  Edusite_Testimonial.init('carouselSingle');
});

jQuery(window).load(function($) {
  Edusite_Hack.matchHeight('> div .e-col');
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
  }
};

Edusite_Slider = {
  init: function(type) {
    if ('nivo' === type) {
      Edusite_Slider.getNivo();
    }
  },
  getNivo: function() {
    var $e_nivoSliderLarge;
    $e_nivoSliderLarge = jQuery('.e-slider--nivo');
    if ($e_nivoSliderLarge.length) {
      $e_nivoSliderLarge.find('.nivoSlider').nivoSlider({
        pauseTime: 10000,
        directionNav: false,
        controlNav: false,
        randomStart: false,
        beforeChange: function() {
          $e_nivoSliderLarge.find('.nivo-caption').find('.animated').each(function() {
            jQuery(this).addClass('fadeOut');
          });
        },
        afterChange: function() {
          $e_nivoSliderLarge.find('.nivo-caption').find('.animated').each(function() {
            jQuery(this).addClass(jQuery(this).attr('data-animate'));
          });
        },
        afterLoad: function() {
          $e_nivoSliderLarge.find('.nivo-caption').find('.animated').each(function() {
            jQuery(this).addClass(jQuery(this).attr('data-animate'));
          });
        }
      });
    }
  }
};

Edusite_Course = {
  init: function(type) {
    if ('carousel' === type) {
      Edusite_Course.makeCarousel();
    }
  },
  makeCarousel: function() {
    var $e_course_sliders;
    $e_course_sliders = jQuery('.e-courses--carousel .owl-carousel');
    if ($e_course_sliders.length) {
      jQuery.each($e_course_sliders, function() {
        var $_next, $_owl, $_prev, $_widget;
        $_widget = jQuery(this).closest('.e-courses--carousel');
        $_next = $_widget.find('.e-owl__nav__link--next');
        $_prev = $_widget.find('.e-owl__nav__link--prev');
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
  }
};

Edusite_Count_Down = {
  create: function() {
    var $e_counter;
    $e_counter = jQuery('.e-count_down');
    if ($e_counter.length) {
      jQuery.each($e_counter, function() {
        var $_end, $_obj;
        $_obj = jQuery(this);
        $_end = new Date($_obj.find('input[type=hidden]').val());
        countdown($_end, (function(ts) {
          $_obj.find('.e-date--hours .e-date_block__number').html(ts.hours);
          $_obj.find('.e-date--minutes .e-date_block__number').html(ts.minutes);
          $_obj.find('.e-date--seconds .e-date_block__number').html(ts.seconds);
        }), countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
      });
    }
  }
};

Edusite_Hack = {
  matchHeight: function(selector) {
    var $e_rows;
    $e_rows = jQuery('.e-height--match');
    if ($e_rows.length) {
      jQuery.each($e_rows, function() {
        jQuery(this).find(selector).matchHeight();
      });
    }
  }
};

Edusite_Testimonial = {
  init: function(type) {
    if ('carousel' === type) {
      Edusite_Testimonial.makeCarousel();
    } else if ('carouselSingle' === type) {
      Edusite_Testimonial.makeCarouselSingle();
    }
  },
  makeCarousel: function() {
    var $carousels;
    $carousels = jQuery('.e-testimonials--carousel');
    if ($carousels.length) {
      jQuery.each($carousels, function(index, item) {
        var $avatars, $slides, avatars_id, slides_id;
        $slides = jQuery(this).find('.e-testimonials__slides');
        $avatars = jQuery(this).find('.e-testimonials__avatars');
        slides_id = $slides.attr('id');
        avatars_id = $avatars.attr('id');
        if ($slides.length) {
          $slides.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            swipe: false,
            adaptiveHeight: false,
            asNavFor: '#' + avatars_id
          });
          $avatars.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            centerMode: true,
            focusOnSelect: true,
            swipe: false,
            asNavFor: '#' + slides_id,
            centerPadding: '0px'
          });
        }
      });
    }
  },
  makeCarouselSingle: function() {
    var $carousels;
    $carousels = jQuery('.e-testimonials--carouselSingle');
    if ($carousels.length) {
      jQuery.each($carousels, function(index, item) {
        var $slides;
        $slides = jQuery(this).find('.e-testimonials__slides');
        if ($slides.length) {
          $slides.owlCarousel({
            items: 1,
            singleItem: true,
            pagination: true,
            navigation: false
          });
        }
      });
    }
  }
};

Edusite_Effect = {
  init: function(type) {}
};

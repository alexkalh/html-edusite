"use strict";
var Edusite, Edusite_Audio, Edusite_Count_Down, Edusite_Course, Edusite_Effect, Edusite_Gallery, Edusite_Hack, Edusite_Lecture, Edusite_Progress_Bar, Edusite_Slider, Edusite_Testimonial, Edusite_Video;

jQuery(document).ready(function($) {
  Edusite.initNavigation();
  Edusite_Count_Down.create();
  Edusite_Slider.init('nivo');
  Edusite_Course.init('carousel');
  Edusite_Lecture.init('carousel');
  Edusite_Testimonial.init('carousel');
  Edusite_Testimonial.init('carouselSingle');
  Edusite_Progress_Bar.init('default');
  Edusite_Gallery.init('default');
  Edusite_Video.init('responsive');
  Edusite_Audio.init('mediaelementplayer');
});

jQuery(window).on('load', function($) {
  Edusite_Hack.matchHeight('> div .e-col');
});

jQuery(window).on('scroll', function($) {});

Edusite = {
  initNavigation: function() {
    if (jQuery('.e-navigation').length) {
      jQuery('.e-navigation ul').superfish({
        cssArrows: false,
        delay: 800,
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

Edusite_Progress_Bar = {
  init: function(type) {
    if ('default' === type) {
      Edusite_Progress_Bar.init_style_default();
    }
  },
  init_style_default: function() {
    var $bars;
    $bars = jQuery('.e-progress_bar--1st');
    if ($bars.length) {
      jQuery.each($bars, function(index, element) {
        var $element, delay, percent, start;
        $element = jQuery(this).find('.e-progress_bar__current');
        start = $element.attr('data-start');
        percent = $element.attr('data-percent');
        delay = 500;
        if (!$element.hasClass('animated')) {
          $element.css({
            width: start
          });
        }
        $element.appear(function() {
          setTimeout((function() {
            $element.animate({
              'width': percent + '%'
            }, 500, 'easeInOutExpo').addClass('animated');
          }), delay);
        });
      });
      return;
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

Edusite_Gallery = {
  init: function(stype) {
    if ('default' === stype) {
      Edusite_Gallery.init_style_default();
    }
  },
  init_style_default: function() {
    var $galleries;
    $galleries = jQuery("[data-role='gallery'][data-style='default']").not("[data-state='bound']");
    if ($galleries.length) {
      jQuery.each($galleries, function() {
        jQuery(this).find('.owl-carousel').owlCarousel({
          items: 1,
          singleItem: true,
          pagination: false,
          navigation: true,
          theme: 'e-owl--default',
          navigationText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>']
        });
      });
    }
  }
};

Edusite_Video = {
  init: function(stype) {
    if ('responsive' === stype) {
      Edusite_Video.init_responsive();
    }
  },
  init_responsive: function() {
    jQuery('body').fitVids();
  }
};

Edusite_Audio = {
  init: function(stype) {
    if ('mediaelementplayer' === stype) {
      Edusite_Audio.init_mediaelementplayer();
    }
  },
  init_mediaelementplayer: function() {
    jQuery('audio').mediaelementplayer();
  }
};

Edusite_Lecture = {
  init: function(stype) {
    if ('carousel' === stype) {
      Edusite_Lecture.init_carousel();
    }
  },
  init_carousel: function() {
    var $e_lectures;
    $e_lectures = jQuery('.e-lectures--carousel .owl-carousel');
    if ($e_lectures.length) {
      jQuery.each($e_lectures, function() {
        var $_owl;
        $_owl = jQuery(this).owlCarousel({
          items: 4,
          pagination: false,
          navigation: true,
          theme: 'e-owl--bottom_navigation',
          navigationText: ['<i class="e-owl__arrow ti-angle-left"></i>', '<i class="e-owl__arrow ti-angle-right"></i>']
        });
      });
    }
  }
};

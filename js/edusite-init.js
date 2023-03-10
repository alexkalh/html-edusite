"use strict";
var Edusite, Edusite_Audio, Edusite_Count_Down, Edusite_Course, Edusite_Effect, Edusite_Form, Edusite_Gallery, Edusite_Hack, Edusite_Lecture, Edusite_Map, Edusite_Post, Edusite_Progress_Bar, Edusite_Slider, Edusite_Testimonial, Edusite_Video, e_google_maps;

e_google_maps = '';

jQuery(document).ready(function($) {
  Edusite.initNavigation();
  Edusite_Count_Down.init('first');
  Edusite_Count_Down.init('second');
  Edusite_Count_Down.init('third');
  Edusite_Slider.init('nivo');
  Edusite_Course.init('carousel');
  Edusite_Post.init('masonry');
  Edusite_Course.init('masonry');
  Edusite_Lecture.init('carousel');
  Edusite_Testimonial.init('carousel');
  Edusite_Testimonial.init('carousel-single');
  Edusite_Testimonial.init('carousel-with-nav');
  Edusite_Progress_Bar.init('default');
  Edusite_Progress_Bar.init('secondary');
  Edusite_Gallery.init('default');
  Edusite_Video.init('responsive');
  Edusite_Audio.init('mediaelementplayer');
  Edusite_Form.init();
  Edusite_Map.init();
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

Edusite_Post = {
  init: function(type) {
    if ('masonry' === type) {
      return Edusite_Post.makeMasonry();
    }
  },
  makeMasonry: function() {
    var $e_post_masonries;
    $e_post_masonries = jQuery('.e-posts--metadata_toggle .e-posts__outer');
    if ($e_post_masonries.length) {
      jQuery.each($e_post_masonries, function() {
        var $_tmp;
        $_tmp = jQuery(this);
        $_tmp.imagesLoaded(function() {
          $_tmp.masonry({
            itemSelector: '.e-posts__article'
          });
        });
      });
    }
  }
};

Edusite_Course = {
  init: function(type) {
    if ('carousel' === type) {
      Edusite_Course.makeCarousel();
    } else if ('masonry' === type) {
      Edusite_Course.makeMasonry();
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
          itemsDesktop: [1199, 2],
          itemsDesktopSmall: [979, 2],
          itemsTablet: [768, 2],
          itemsTabletSmall: [479, 1],
          itemsMobile: [479, 1],
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
  makeMasonry: function() {
    var $e_course_masonries;
    $e_course_masonries = jQuery('.e-courses--masonry .e-courses__outer');
    if ($e_course_masonries.length) {
      jQuery.each($e_course_masonries, function() {
        var $_tmp;
        $_tmp = jQuery(this);
        $_tmp.imagesLoaded(function() {
          $_tmp.masonry({
            itemSelector: '.e-courses__course'
          });
        });
      });
    }
  }
};

Edusite_Count_Down = {
  init: function(type) {
    if ('first' === type) {
      Edusite_Count_Down.init_style_first();
    } else if ('second' === type) {
      Edusite_Count_Down.init_style_second();
    } else if ('third' === type) {
      Edusite_Count_Down.init_style_third();
    }
  },
  init_style_first: function() {
    var $e_counter;
    $e_counter = jQuery('.e-count_down--first');
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
  },
  init_style_second: function() {
    var $e_counter;
    $e_counter = jQuery('.e-count_down--circle');
    if ($e_counter.length) {
      jQuery.each($e_counter, function() {
        var $_end, $_obj;
        $_obj = jQuery(this);
        $_end = new Date($_obj.find('.e-count_down__counter').attr('data-datetime'));
        countdown($_end, (function(ts) {
          $_obj.find('.e-date--days .e-date_block__number').html(ts.days);
          $_obj.find('.e-date--hours .e-date_block__number').html(ts.hours);
          $_obj.find('.e-date--minutes .e-date_block__number').html(ts.minutes);
          $_obj.find('.e-date--seconds .e-date_block__number').html(ts.seconds);
        }), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
      });
    }
  },
  init_style_third: function() {
    var $e_counter;
    $e_counter = jQuery('.e-count_down--secondary');
    if ($e_counter.length) {
      jQuery.each($e_counter, function() {
        var $_end, $_obj;
        $_obj = jQuery(this);
        $_end = new Date($_obj.find('.e-count_down__counter').attr('data-datetime'));
        countdown($_end, (function(ts) {
          $_obj.find('.e-date--days .e-date_block__number').html(ts.days);
          $_obj.find('.e-date--hours .e-date_block__number').html(ts.hours);
          $_obj.find('.e-date--minutes .e-date_block__number').html(ts.minutes);
          $_obj.find('.e-date--seconds .e-date_block__number').html(ts.seconds);
        }), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
      });
    }
  }
};

Edusite_Progress_Bar = {
  init: function(type) {
    if ('default' === type) {
      Edusite_Progress_Bar.init_style_default();
    } else if ('secondary' === type) {
      Edusite_Progress_Bar.init_style_secondary();
    }
  },
  init_style_default: function() {
    var $bars;
    $bars = jQuery('.e-progress_bar--default');
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
    }
  },
  init_style_secondary: function() {
    var $bars;
    $bars = jQuery('.e-progress_bar--secondary');
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
    } else if ('carousel-single' === type) {
      Edusite_Testimonial.makeCarouselSingle();
    } else if ('carousel-with-nav' === type) {
      Edusite_Testimonial.makeCarouselWithNav();
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
    $carousels = jQuery('.e-testimonials--carousel_single');
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
  },
  makeCarouselWithNav: function() {
    var $carousels;
    $carousels = jQuery('.e-testimonials--carousel_with_nav');
    if ($carousels.length) {
      jQuery.each($carousels, function(index, item) {
        var $slides;
        $slides = jQuery(this).find('.e-testimonials__slides');
        if ($slides.length) {
          $slides.owlCarousel({
            items: 1,
            singleItem: true,
            pagination: false,
            navigation: true,
            autoHeight: true,
            rewindNav: false,
            transitionStyle: 'fade',
            navigationText: ['<i class="e-testimonials__nav__item e-testimonials__nav__prev arrow_left"></i>', '<i class="e-testimonials__nav__item e-testimonials__nav__next arrow_right"></i>']
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

Edusite_Form = {
  init: function() {
    Edusite_Form.init_select();
  },
  init_select: function() {
    jQuery('select.e-field--select').niceSelect();
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

Edusite_Map = {
  init: function() {
    var $e_map, id_map, lat, lng, place;
    $e_map = jQuery('.e-google_map--default');
    if ($e_map.length) {
      id_map = $e_map.attr('id');
      lat = parseFloat($e_map.attr('data-latitude'));
      lng = parseFloat($e_map.attr('data-longitude'));
      place = $e_map.attr('data-place');
      e_google_maps = new GMaps({
        el: '#' + id_map,
        lat: lat,
        lng: lng,
        zoom: 10,
        scrollwheel: false,
        zoomControl: true,
        zoomControlOpt: {
          style: 'SMALL',
          position: 'TOP_LEFT',
          panControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          overviewMapControl: true
        }
      });
      e_google_maps.addMarker({
        lat: lat,
        lng: lng,
        title: place
      });
    }
  }
};

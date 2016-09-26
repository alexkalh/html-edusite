"use strict";
var Edusite, Edusite_Count_Down, Edusite_Course, Edusite_Effect, Edusite_Field, Edusite_Hack, Edusite_Progress_Bar, Edusite_Slider, Edusite_Testimonial;

jQuery(document).ready(function($) {
  Edusite.initNavigation();
  Edusite_Count_Down.create();
  Edusite_Slider.init('nivo');
  Edusite_Course.init('carousel');
  Edusite_Testimonial.init('carousel');
  Edusite_Testimonial.init('carouselSingle');
  Edusite_Progress_Bar.init('1st');
  Edusite_Field.init('select');
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
    if ('1st' === type) {
      Edusite_Progress_Bar.init_style_1st();
    }
  },
  init_style_1st: function() {
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

Edusite_Field = {
  init: function(type) {
    if ('select' === type) {
      Edusite_Field._select();
    }
  },
  _select: function() {
    var $fields;
    $fields = jQuery('select[data-field=select]');
    if ($fields.length) {
      _.each($fields, function(el) {
        var $options, $selected, list;
        $options = jQuery(el).find('option');
        $selected = jQuery(el).find('option:selected');
        list = '<div class="e-field__placehold"><span class="e-field__current">' + $selected.text() + '</span><span class="e-field__caret fa fa-caret-down"></span></div>';
        list += '<ul class="e-field__list">';
        _.each($options, function(el_child) {
          list += '<li class="e-field__item" data-value="' + jQuery(el_child).attr('value') + '">' + jQuery(el_child).text() + '</li>';
        });
        list += '</ul>';
        jQuery(el).wrap('<div data-field="dropdown" class="' + jQuery(el).attr('data-field-class') + '"></div>').addClass('hidden');
        jQuery(el).parent().append(list);
      });
      jQuery('.e-form').on('click', '.e-field__placehold', function(event) {
        var $caret, $dropdown, $element, $list;
        $element = jQuery(this);
        $caret = $element.find('.e-field__caret');
        $dropdown = $element.parent();
        $list = $dropdown.find('.e-field__list');
        if ($list.is(':hidden')) {
          $list.show();
          $caret.removeClass('fa-caret-down').addClass('fa-caret-up');
        } else {
          $list.hide();
          $caret.removeClass('fa-caret-up').addClass('fa-caret-down');
        }
      });
      jQuery('.e-form').on('click', '.e-field__item', function(event) {
        var $current, $dropdown, $placehold, $select, $selected_text, $selected_value;
        $dropdown = jQuery(this).parents('.e-field--dropdown');
        $placehold = $dropdown.find('.e-field__placehold');
        $current = $dropdown.find('.e-field__current');
        $select = $dropdown.find('select');
        $selected_value = jQuery(this).attr('data-value');
        $selected_text = jQuery(this).text();
        if ($selected_text !== $current.text()) {
          $current.text($selected_text);
          $select.find('option').removeAttr('selected');
          $select.find('option[value="' + $selected_value + '"]').attr('selected', 'selected');
        }
        $placehold.click();
      });
    }
  }
};

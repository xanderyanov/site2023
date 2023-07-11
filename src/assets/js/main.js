var $window;
var prevWindowWidth = 0;
var windowWidth;

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
//in selector we set style, for example
//height: calc(var(--vh, 1vh) * 100); for 100vh

function initVars() {
  $window = $(window);
  windowWidth = $window.width();
  windowHeight = $window.height();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

$(function () {
  initVars();

  $('a[data-fancybox]').fancybox({
    closeBtn: false,
    backFocus: false,
    arrows: true,
    keyboard: true,
    nextClick: true,
    infobar: true,
    protect: true,
    nextEffect: 'elastic',
    prevEffect: 'elastic',
    padding: 0,
    loop: true,
    animationEffect: 'zoom-in-out',
    transitionEffect: 'slide',
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true, // Continue movement after releasing mouse/touch when panning
    },
  });

  const swiperOptions = {
    paginationClickable: true,
    autoplay: 7500,
    spaceBetween: 0,
    loop: true,
    effect: 'slide',
    loop: true,
    // pagination: {
    //   el: '.swiper-pagination1',
    // },
    pagination: {
      el: '.swiper-pagination1',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    on: {
      activeIndexChange: function () {
        console.log('activeIndexChange');

        $('.swiper-slide')
          .children('.swiper__cadr')
          .removeClass('animationBaretsky1')
          .fadeOut(500);

        setTimeout(function () {
          $('.swiper-slide-active')
            .children('.swiper__cadr')
            .fadeIn(500)
            .addClass('animated')
            .addClass('animationBaretsky1');
        }, 500);
      },
      init: function () {
        console.log('init');

        $('.swiper-slide')
          .children('.swiper__cadr')
          .removeClass('animationBaretsky1')
          .fadeOut(500);

        setTimeout(function () {
          $('.swiper-slide-active')
            .children('.swiper__cadr')
            .fadeIn(500)
            .addClass('animated')
            .addClass('animationBaretsky1');
        }, 500);
      },
    },
  };

  const swiper1 = new Swiper('.swiper-container1', swiperOptions);

  swiper1.on('beforeSlideChangeStart', function () {
    console.log('beforeSlideChangeStart');
  });

  $('.menuButton').on('click', function () {
    $(this).toggleClass('open');
    $('.topMenu').slideToggle();
  });

  $('.phoneZ').mask('+7 (999) 999-9999');
  $('.phone1').mask('+7 (999) 999-9999');
  $('.phone2').mask('+7 (999) 999-9999');
  $('.phone3').mask('+7 (999) 999-9999');

  // $('table').wrap('<div class="table_outer"></div>');

  $('.toTop').hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('.toTop').fadeIn();
    } else {
      $('.toTop').fadeOut();
    }
  });
  $('.toTop').on('click', function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });

  $('.form1').on('click', '.submit1', function (e) {
    e.preventDefault();
    var name = $('.name1').val();
    var phone = $('.phone1').val();
    var email = $('.email1').val();
    var workemail = $('.work_email1').val();
    var message = $('.message1').val();
    var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.name1').addClass('error');
      setTimeout(function () {
        $('.name1').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phone1').addClass('error');
      setTimeout(function () {
        $('.phone1').removeClass('error');
      }, 3000);
    } else if (email == '') {
      swal({
        title: 'Ошибка Email',
        text: 'Заполните поле Email',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (!r.test(email)) {
      swal({
        title: 'Ошибка',
        text: 'Корректно заполните поле e-mail',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (message == '') {
      swal({
        title: 'Пустое сообщение',
        text: 'Заполните текст сообщения',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.message1').addClass('error');
      setTimeout(function () {
        $('.message1').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mail1.php',
        {
          name: name,
          phone: phone,
          email: email,
          message: message,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.name1').val('').removeClass('error');
          $('.phone1').val('').removeClass('error');
          $('.email1').val('').removeClass('error');
          $('.message1').val('').removeClass('error');
        }
      );
    }
  });
});

//################ likeBlock

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if ($('.map__area').length) {
  ymaps.ready(initMaps);

  function initMaps() {
    var myMap = new ymaps.Map('map', {
      center: [51.53636907237114, 46.022191999999926],
      zoom: 14,
      controls: ['zoomControl'],
    });

    myMap.behaviors.disable('scrollZoom');
    if (isMobile.any()) {
      myMap.behaviors.disable('drag');
    }

    var myGeoObjects = [];

    myGeoObjects[0] = new ymaps.Placemark(
      [51.53636907237114, 46.022191999999926],
      {
        balloonContentHeader:
          '<div class="baloon__top">Кэрос-медицина</div>' +
          '<div class="baloon__description">IT-Компания</div>',
        balloonContentBody:
          '<div class="baloon__content"><img src="assets/img/meddix_logo_or_gr.svg">' +
          '<a href="tel:88452650500">8 (8452) 650-500</a>',
        balloonContentFooter:
          '<div class="baloon__footer">Саратов, ул. Московская, 113/117, <br>ТК «Мир», 5 этаж.</div>',
        clusterCaption:
          'Косметология<br>салон массажа<br>HAIR услуги<br>NAIL-BAR<br>профессиональная косметика',
        hintContent:
          '<div class="baloon__top">It-Компания "Кэрос-медицина"</div>',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'assets/img/marker3.png',
        iconImageSize: [64, 64],
        iconImageOffset: [-32, -32],
      }
    );

    var clusterIcons = [
      {
        href: '/images/pointer.png',
        size: [29, 46],
        offset: [0, 0],
      },
    ];

    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonPanelMaxMapArea: 0,
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 200,
      clusterBalloonPagerSize: 5,
      clusterBalloonPagerType: 'marker',
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
  }
}

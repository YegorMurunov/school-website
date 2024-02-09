"use strict";

// HEADER
// вложенные списки
var navLinks = document.querySelectorAll('.nav-link');
var arrows = document.querySelectorAll('.nav-link_arrow');
var navLi = document.querySelectorAll('.header__content__nav__li');

if (navLinks.length > 0) {
  // проверка на наличие ссылок
  navLinks.forEach(function (navLink) {
    // проходися по всем ссылкам и убираем у всех ссылок с классом active класс active
    navLink.addEventListener('click', function (e) {
      // открытие на ссылку
      e.preventDefault();
      var parent = navLink.parentNode;

      if (parent.classList.contains('active')) {
        parent.classList.remove('active');
        var arrow = parent.querySelector('.nav-link_arrow');
        arrow.classList.remove('active');
      } else {
        navLi.forEach(function (li) {
          li.classList.remove('active');
          arrows.forEach(function (arrow) {
            arrow.classList.remove('active');
          });
        });

        var _arrow = parent.querySelector('.nav-link_arrow'); // получаем стрелочку текущей ссылке


        _arrow.classList.add('active'); // добовляем классы active


        parent.classList.add('active');
      }
    });
    document.body.addEventListener('click', function (e) {
      if (!e.target.closest('.header__content__nav__li')) {
        navLi.forEach(function (li) {
          if (li.classList.contains('active')) {
            navLi.forEach(function (li) {
              li.classList.remove('active');
              arrows.forEach(function (arrow) {
                arrow.classList.remove('active');
              });
            });
          }
        });
      }
    });
  });
} // Меню


var menuCloseIcon = document.querySelector('.header__menu');
menuCloseIcon.addEventListener('click', function () {
  menuCloseIcon.classList.toggle('active');
  document.body.classList.toggle('lock');
  document.querySelector('.header__content__nav').classList.toggle('active');
}); // CONTENT
// slider

var images = document.querySelectorAll('.section__hero__slider__line__img');
var sliderLine = document.querySelector('.section__hero__slider__line');
var sliderDots = document.querySelectorAll('.section__hero__slider__dots__item');
var count = 0;
var width;

if (images.length > 0) {
  var init = function init() {
    width = document.querySelector('.section__hero__slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(function (img) {
      img.style.width = width + 'px';
      img.style.height = 'auto'; // сохраняем пропорции изображения
    });
    rollSlider();
  };

  var autoSlider = function autoSlider() {
    var timer;
    timer = setTimeout(function () {
      count++;

      if (count >= images.length) {
        count = 0;
        clearTimeout(timer);
      }

      rollSlider();
      autoSlider();
    }, 5000);
  };

  var rollSlider = function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    sliderDots.forEach(function (dot) {
      dot.classList.remove('active');
      sliderDots[count].classList.add('active');
    });
  };

  window.addEventListener('resize', init);
  sliderDots.forEach(function (dot) {
    dot.addEventListener('click', function (e) {
      for (var i = 0; i < sliderDots.length + 1; i++) {
        if (e.target == sliderDots[i - 1]) {
          count = i - 1;
          rollSlider();
        }
      }
    });
  });
  init();
  autoSlider();
} // списки


var menuItems = document.querySelectorAll('.section__info__item.subList');
menuItems.forEach(function (item) {
  item.addEventListener('click', function (e) {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
      item.classList.remove('active');
    } else {
      menuItems.forEach(function (item) {
        item.classList.remove('active');
      });
      item.classList.add('active'); // Вычисление высоты саб листа (т.к есть саб листы с большем количеством блоков)

      var itemList = item.querySelector('.section__info__item__list');
      var height = itemList.clientHeight;
      itemList.style.top = "".concat(-height, "px");
      itemList.onclick = event.stopPropagation();
    }
  });
  document.body.addEventListener('click', function (e) {
    if (!e.target.closest('.section__hero__info__item')) {
      menuItems.forEach(function (item) {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });
    }
  });
});
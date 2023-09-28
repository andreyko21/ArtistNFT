import Swiper from 'swiper';
import $ from 'jquery';
import Header from './modules/header';
import firebase from './modules/firebase';

class MainPage {
  constructor() {
    this.header = new Header();
    this.init();
  }
  init() {
    firebase.getAuth();
  }
}

const main = new MainPage();

$(document).ready(function () {
  $('.wrapper').mousemove(function (e) {
    var containerWidth = $(this).width();
    var containerHeight = $(this).height();
    var mouseX = e.pageX - $(this).offset().left;
    var mouseY = e.pageY - $(this).offset().top;
    var offsetX = 0.5 - mouseX / containerWidth;
    var offsetY = 0.5 - mouseY / containerHeight;

    $('.parallax').css({
      transform:
        'translate(-50%,-50%) translate(' +
        offsetX * 40 +
        'px,' +
        offsetY * 40 +
        'px)',
    });
  });
  new Swiper('.biography-section__swiper', {
    // Опції Swiper
    slidesPerView: 2.1, // Кількість видимих слайдів одночасно
    spaceBetween: 10, // Відступ між слайдами
    breakpoints: {
      430: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      539: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });
});

import Swiper from 'swiper';
import $ from 'jquery';
import Header from './modules/header';

class Forum {
  constructor() {
    this.header = new Header();
  }
}

const forum = new Forum();

new Swiper('.forum-banner__swiper-container', {
  slidesPerView: 1.18,
  spaceBetween: 14,
  breakpoints: {
    600: {
      slidesPerView: 1.8,
      spaceBetween: 14,
    },

    960: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1150: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

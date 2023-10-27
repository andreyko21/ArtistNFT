import Swiper from 'swiper';
import $ from 'jquery';
import Header from './modules/header';
import firebase from './modules/firebase';
import ContactMe from './modules/contactMe';
import Parallax from './modules/parallax';

class MainPage {
  constructor() {
    this.header = new Header();
    this.contactMe = new ContactMe();
    this.init();
  }
  init() {
    firebase.getAuth();
    this.contactMe.validation();
  }
}

const main = new MainPage();

new Swiper('.biography-section__swiper', {
  slidesPerView: 2.3,
  spaceBetween: 10,
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

new Swiper('.nft-swiper-section__swiper-container', {
  slidesPerView: 1.22,
  spaceBetween: 16,
  centeredSlides: false,
  loop: false,
  breakpoints: {
    450: {
      slidesPerView: 1.6,
      centeredSlides: false,
      loop: false,
    },
    601: {
      slidesPerView: 1.9,
      centeredSlides: true,
      loop: true,
    },
    681: {
      slidesPerView: 2.3,
      centeredSlides: true,
      loop: true,
    },
    820: {
      slidesPerView: 2.8,
      centeredSlides: true,
      loop: true,
    },
    960: {
      slidesPerView: 3.3,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
    },
    1190: {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
    },
    1441: {
      slidesPerView: 4.5,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
    },
    1550: {
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
    },
  },
});
Parallax();

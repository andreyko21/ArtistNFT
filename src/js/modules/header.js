import $ from 'jquery';
import Dropdown from './dropdown';
import firebase from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ScrollLock from './scrollLock';

export default class Header {
  constructor() {
    this.burgerMenuButton = $('.burger-menu-button');
    this.burgerMenu = $('.menu');
    this.BindEvents();
    this.dropDown = new Dropdown('.dropdown');
    this.scrollLock = new ScrollLock();
    this.init();
  }

  init() {
    this.auth();
  }

  auth() {
    onAuthStateChanged(firebase.getAuth(), (user) => {
      if (user) {
        $('.authorization-button').html(
          '<span class="authorization-button__gradient">Profile</span>'
        );
        $('.authorization-button').on('click', () => {
          window.location.href = '/orders.html';
        });
      } else {
        $('.authorization-button').html(
          '<span class="authorization-button__gradient">Authorization</span>'
        );
        $('.authorization-button').on('click', () => {
          window.location.href = '/sign.html';
        });
      }
    });
  }

  BindEvents() {
    this.burgerMenuButton.click(() => this.ToggleBurgerMenu());
    $('.premium-access-button').click(() => {
      window.location.href = '/pricing.html';
    });
    $(window).on('resize', () => this.CheckScreenSize());
  }

  CheckScreenSize() {
    if ($(window).width() < 1024 && this.burgerMenu.hasClass('menu_open')) {
      this.scrollLock.toggleBodyLock(true);
    } else {
      this.scrollLock.toggleBodyLock(false);
    }
  }

  ToggleBurgerMenu() {
    this.burgerMenuButton.toggleClass('burger-menu-button_open');
    if (this.burgerMenu.hasClass('menu_open')) {
      this.burgerMenu.fadeOut(300);
      this.scrollLock.toggleBodyLock(false);
    } else {
      this.burgerMenu.fadeIn(300);
      this.scrollLock.toggleBodyLock(true);
    }
    this.burgerMenu.toggleClass('menu_open');
  }
}

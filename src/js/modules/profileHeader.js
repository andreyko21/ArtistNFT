import $ from 'jquery';

export default class Header {
  constructor() {
    this.burgerMenuButton = $('.burger-menu-button');
    this.burgerMenu = $('.profile-sidebar');
    this.siliderBackground = $('.silider-background');

    this.BindEvents();
  }

  BindEvents() {
    this.burgerMenuButton.click(() => this.ToggleBurgerMenu());
    this.siliderBackground.click(() => this.ToggleBurgerMenu());
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
      this.siliderBackground.fadeOut(300);
    } else {
      this.burgerMenu.fadeIn(300);
      this.siliderBackground.fadeIn(300);
    }
    this.siliderBackground.toggleClass('silider-background_open');
    this.burgerMenu.toggleClass('menu_open');
  }
}

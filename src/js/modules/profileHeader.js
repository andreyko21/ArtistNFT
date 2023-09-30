import $ from 'jquery';

export default class Header {
  constructor() {
    this.burgerMenuButton = $('.burger-menu-button');
    this.burgerMenu = $('.profile-sidebar');
    this.siliderBackground = $('.silider-background');
    this.BindEvents();
    this.dropDown = new Dropdown();
  }

  BindEvents() {
    this.burgerMenuButton.click(() => this.ToggleBurgerMenu());
    this.siliderBackground.click(() => this.ToggleBurgerMenu());
  }

  CheckScreenSize() {
    const windowWidth = $(window).width();
    if (windowWidth <= 1150) {
    } else {
      this.dropdown.insertAfter('.menu');
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

import $ from "jquery";

export default class Header{
    constructor(){
        this.burgerMenuButton = $('.burger-menu-button');
        this.burgerMenu = $('.menu');
        this.BindEvents();
    }

    BindEvents(){
        this.burgerMenuButton.click(()=>this.ToggleBurgerMenu())
    }

    ToggleBurgerMenu() {
        this.burgerMenuButton.toggleClass('burger-menu-button_open');
        if (this.burgerMenu.hasClass('menu_open')) {
            this.burgerMenu.fadeOut(300);
        } else {
            this.burgerMenu.fadeIn(300);
        }
        this.burgerMenu.toggleClass('menu_open');
    }
}
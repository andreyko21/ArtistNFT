import $, { event } from "jquery";

export default class Dropdown{
    constructor(){
        this.dropdown = $('.dropdown');
        this.dropdownTrigger = this.dropdown.find('.dropdown__trigger');
        this.dropdownContent = this.dropdown.find('.dropdown__content');
        this.dropdownItem = this.dropdown.find('.dropdown__item');
        this.dropdownArrow = this.dropdown.find('.dropdown__icon');
        this.BindEvents();
        this.CheckScreenSize();

    }

    BindEvents(){
        this.dropdownTrigger.on('click',()=>this.ToggleDropDown());
        this.dropdownContent.on('click','.dropdown__item',(event)=>this.SelectItem(event));
        $(window).on("resize", () => this.CheckScreenSize());
    }

    ToggleDropDown() {
        this.dropdown.toggleClass('dropdown_open');
        
    }

    CheckScreenSize() {
        const windowWidth = $(window).width();
        this.dropdownArrow.css('transform:', 'rotate(45deg)');
        if (windowWidth <= 400) {
            $('.menu__footer').append(this.dropdown);
            const downHeight = $(window).height() - this.dropdown.offset().top - this.dropdown.height();
            console.log(this.dropdownContent.height() + 20);
        } else {
            this.dropdown.insertAfter('.menu');
        }
    }

    async SelectItem(event) {
        const selectedItem = $(event.target);
        this.dropdownContent.find(selectedItem).remove();
        const lastSelectItem = this.dropdownTrigger.find('.dropdown__item');
        this.dropdownTrigger.find('.dropdown__item').replaceWith(selectedItem);
        this.dropdownContent.append(lastSelectItem);
        this.ToggleDropDown();
    }
}
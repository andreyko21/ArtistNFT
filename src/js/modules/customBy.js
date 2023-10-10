import $ from "jquery";
import firebase from './firebase';
import 'jquery-validation';

export default class CustomBy {
  constructor() {
      this.li = $(".custom-by__dropdown-li");
      this.form = $('.custom-by__form');
      this.dropOne = new Dropdown('#dropOne');
      this.dropTwo = new Dropdown('#dropTwo');
  }
  // dropdown() {
  //   const dropDownOne = new Dropdown('#dropOne');
  //   const dropDownTwo = new Dropdown('#dropTwo')
  // }
  validation(){
    this.form.validate({
      rules: {
        checkbox: {
            required: true,
          },
        comment: {
            required: true,
            minlength: 5 
          },
        radioBtn: {
            required: true,
          },
      },
      messages: {
        checkbox:{
            required: 'please click checkbox'
        },
        comment:{
          required: 'minimum 5 characters',
          minlength: 'minimum 5 characters'
        },
        radioBtn:{
            required: 'choose a color'
        },
      },
      errorPlacement: function(error, element) {
        if (element.attr("name") === "checkbox") {
          error.appendTo(".custom-by__i-agree-error");
        } else if (element.attr("name") === "radioBtn") {
            error.appendTo(".custom-by__color-error");
        } else if (element.attr("name") === "comment") {
          error.appendTo(".custom-by__error-comment");
        }
      },
      submitHandler: function(form) {
        //дополнительные действия перед отправкой\\

        alert('ok')
        form.submit();
      }
    });
  }
}


class Dropdown {
  constructor(thisDrop) {
      this.drop = $(thisDrop);
      this.dropdownToggle = this.drop.find('.custom-by__dropdown-btn');
      this.dropdownMenu = this.drop.find('.custom-by__dropdown-list');
      this.li = this.drop.find('.custom-by__dropdown-li');
      this.height = this.dropdownMenu.height();
      this.dropdown();
    }
    dropdown(){
      const options = {
        rootMargin: `0px 0px -${this.height + 70}px 0px`,
        threshold: 0
      };
      const observer = new IntersectionObserver(callback, options);
      const self = this;

      function callback(entries) {
          entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                  self.dropdownMenu.css('top', '64px');
              } else {
                  self.dropdownMenu.css('top', -self.height);
              }
          });
      }

      $(document).ready(function () {
          const targetElement = self.dropdownToggle[0];
          observer.observe(targetElement);
      });

      const classDrop = this.drop;
      const thisBtn = this.dropdownToggle;

      this.dropdownToggle.on('click', function () {
          classDrop.toggleClass("custom-by__dropdown-active");
      });

      $(document).on('click', function (event) {
          if (!thisBtn.is(event.target) && thisBtn.has(event.target).length === 0) {
              classDrop.removeClass("custom-by__dropdown-active");
          }
      });

      this.li.click(function () {
          thisBtn.text($(this).html());
      });
  }
}




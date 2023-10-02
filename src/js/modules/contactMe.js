import $ from "jquery";
import firebase from './firebase';
import 'jquery-validation';

export default class ContactMe {
  constructor(){
      this.form = $('.contact-me__form')
  }
  validation(){
    //Кастумный метод для проверки почты с доменами на кирилице\\
    $.validator.addMethod("castumEmail", function(value, element) {
        var regex = /^[a-zA-Z0-9а-яА-ЯёЁ_.-]+@[a-zA-Z0-9а-яА-ЯёЁ.-]+\.[a-zA-Zа-яА-ЯёЁ]{2,}$/;
        return this.optional(element) || regex.test(value);
    }, "Please enter a correct email"); 

    this.form.validate({
      rules: {
        name: "required",
        email: {
          required: true,
          castumEmail: true
        },
        question: {
            required: true,
            minlength: 5 
        },
        checkbox: {
          required: true,
        },
      },
      messages: {
        name: "Please enter name",
        email: {
          required: "Please enter a email",
        },
        question:{
            required: "Please enter a question",
            minlength: "min 5 characters",
        },
        checkbox:{
          required: 'please click checkbox'
      },
      },
      errorPlacement: function(error, element) {
        if (element.attr("name") === "name") {
          error.appendTo(".contact-me__error-name");
        } else if (element.attr("name") === "email") {
          error.appendTo(".contact-me__error-mail");
        } else if (element.attr("name") === "question") {
          error.appendTo(".contact-me__error-question");
        } else if (element.attr("name") === "checkbox") {
          error.appendTo(".contact-me__i-agree-error");
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



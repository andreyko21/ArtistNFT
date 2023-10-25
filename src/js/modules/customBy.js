import $ from "jquery";
import Dropdown from "./dropdownForm";
import firebase from './firebase';
import { collection, getDocs, addDoc} from "firebase/firestore";
import 'jquery-validation';

export default class CustomBy {
  constructor() {
      this.li = $(".custom-by__dropdown-li");
      this.form = $('.custom-by__form');
      this.changeItem = $('.custom-by__input-item');
      this.changeSize = $('.custom-by__input-size');
      this.question = $('.custom-by__question');
      this.radioBtn = $('.custom-by__radio-btn');
      this.formCheckbox = $('#custom-by-checkbox');
      this.dropOne = new Dropdown('#dropOne');
      this.dropTwo = new Dropdown('#dropTwo');
      this.db = firebase.getFirestore();
      this.auth = firebase.getAuth();
      this.color = '';
      this.validation();
  }
  changeColor(){
    this.radioBtn.each((index, radio) => {
      if (radio.checked) {
        this.color = $(radio).data('color');
        console.log(this.color)
      }
    });
  }
  async firebase(){
      await getDocs(collection(this.db, "users"));
      this.changeColor();
      if(this.auth.currentUser){
        addDoc(collection(this.db, "users",this.auth.currentUser.uid, 'orders'),{
          clothes: this.changeItem.eq(0).html(),
          size: this.changeSize.eq(0).html(),
          comment: this.question.val(),
          color: this.color,
          deliveryAddress: 'Maidan Nezalezhnosti, 1, Kyiv, 02000'
        });
        alert('Замовлення додано');
        this.question.val('')
        this.radioBtn.prop('checked', false);
        this.formCheckbox.prop('checked', false);
      }else{
        alert('Користувач не авторизованний')
      }
  }
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
      submitHandler: () => {
        this.firebase();
      },
    });
  }
}







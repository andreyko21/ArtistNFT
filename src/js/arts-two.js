import $ from 'jquery';
import Header from './modules/header';
import { collection, getDocs} from "firebase/firestore";
import firebase from './modules/firebase';
import LoadArts from './modules/loadArts';
import CustomBy from './modules/customBy';

class ArtsOne {
  constructor() {
    this.header = new Header();
    this.db = firebase.getFirestore();
    this.customBy = new CustomBy();
    this.prolax();
    this.firebase();
    this.oneItem();
  }
  async firebase() {
    const querySnapshot = await getDocs(collection(this.db, "arts"));
    querySnapshot.forEach((doc) => {
      const load = new LoadArts(doc.data(), doc.id);
    });
  }
  oneItem(){
    $('.cards').on('click mouseenter', '.one-card', (event) => {
      $('.active').removeClass('active');
      const clickedElement = $(event.currentTarget);
      clickedElement.addClass('active');
      clickedElement.find('.btn').removeClass('one-card__btn_active');
      setTimeout(function(){
        clickedElement.find('.btn').addClass('one-card__btn_active');
      },1);
    });
    
    $('.cards').on('mouseleave', '.one-card', () => {
      $('.active').removeClass('active');
    });
  }
  prolax(){
    $(document).ready(function () {
      $('.arts-two').mousemove(function (e) {
        var containerWidth = $(this).width();
        var containerHeight = $(this).height();
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;
        var offsetX = 0.5 - mouseX / containerWidth;
        var offsetY = 0.5 - mouseY / containerHeight;
    
        $('.parallax').css({
          transform:
            'translate(-50%,-50%) translate(' +
            offsetX * 40 +
            'px,' +
            offsetY * 40 +
            'px)',
        });
      });
  });
}};
const artsOne = new  ArtsOne();






























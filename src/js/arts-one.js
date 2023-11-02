import $ from 'jquery';
import Header from './modules/header';
import { collection, getDocs} from "firebase/firestore";
import firebase from './modules/firebase';
import LoadArts from './modules/loadArts';
import Parallax from './modules/parallax';
import Preloader from './modules/preloader';

class ArtsOne {
  constructor() {
    this.header = new Header();
    this.db = firebase.getFirestore();
    this.prolax = new Parallax();
    this.firebase();
    this.oneItem();
  }
  async firebase() {
    const querySnapshot = await getDocs(collection(this.db, "arts"));
    querySnapshot.forEach((doc) => {
      const load = new LoadArts(doc.data(), doc.id);
    });
    this.stopPreload = new Preloader('page__container');
  }
  oneItem(){
    $('.arts__cards').on('click mouseenter', '.one-card', (event) => {
      $('.active').removeClass('active');
      const clickedElement = $(event.currentTarget);
      clickedElement.addClass('active');
      clickedElement.find('.btn').removeClass('one-card__btn_active');
      setTimeout(function(){
        clickedElement.find('.btn').addClass('one-card__btn_active');
      },1);
    });
    
    $('.arts__cards').on('mouseleave', '.one-card', () => {
      $('.active').removeClass('active');
    });
  }
};
const artsOne = new  ArtsOne();






























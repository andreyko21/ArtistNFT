import $ from 'jquery';
import OneItem from './modules/one-item';
import firebase from './modules/firebase';
import { collection, doc, addDoc, getDocs, getDoc } from 'firebase/firestore';
import Header from './modules/header';


class ArtsOne {
    constructor() {
      this.header = new Header();
      this.db = firebase.getFirestore();
      this.usersCollection = collection(this.db, 'arts');
      this.prolax();
    }
    init() {
        console.log(this.usersCollection)
    }
    prolax(){
      $(document).ready(function () {
        $('.arts').mousemove(function (e) {
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





// Временный вариант 
const allItems = document.querySelectorAll('.one-card');

function delActive(){
  const allActive = document.querySelectorAll('.active');
  allActive.forEach((thisClass) => {
    thisClass.classList.remove('active')
  });
}

function addActive(item){
  delActive();
  item.classList.add('active')
}

allItems.forEach((item) => {
  item.addEventListener('click', function() {
    addActive(item);
  });
  item.addEventListener("mouseenter", function() {
    addActive(item);
  });
  item.addEventListener("mouseleave", function() {
    delActive();
  });
})


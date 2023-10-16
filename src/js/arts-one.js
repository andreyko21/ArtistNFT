import $ from 'jquery';
import OneItem from './modules/one-item';
import Header from './modules/header';
// import firebase from './modules/firebase';

import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQdQY3D9G60qB3PCBhtCz-W7YynZJQzSU',
  authDomain: 'artistnft.firebaseapp.com',
  projectId: 'artistnft',
  storageBucket: 'artistnft.appspot.com',
  messagingSenderId: '1090475560828',
  appId: '1:1090475560828:web:3ff50b4eb39bbcacd45ef9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, 'arts'));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, ' => ', doc.data());
});

class ArtsOne {
  constructor() {
    this.header = new Header();
    this.prolax();
  }
  init() {
    console.log(this.usersCollection);
  }
  prolax() {
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
  }
}

const artsOne = new ArtsOne();

// Временный вариант
const allItems = document.querySelectorAll('.one-card');

function delActive() {
  const allActive = document.querySelectorAll('.active');
  allActive.forEach((thisClass) => {
    thisClass.classList.remove('active');
  });
}

function addActive(item) {
  delActive();
  item.classList.add('active');
}

allItems.forEach((item) => {
  item.addEventListener('click', function () {
    addActive(item);
  });
  item.addEventListener('mouseenter', function () {
    addActive(item);
  });
  item.addEventListener('mouseleave', function () {
    delActive();
  });
});

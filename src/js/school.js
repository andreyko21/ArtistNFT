import Header from './modules/header';
import firebase from './modules/firebase';
import $ from 'jquery';
import { getAuth, onAuthStateChanged } from "firebase/auth";

$(document).ready(function () {
   $('.wrapper').mousemove(function (e) {
      var containerWidth = $(this).width();
      var containerHeight = $(this).height();
      var mouseX = e.pageX - $(this).offset().left;
      var mouseY = e.pageY - $(this).offset().top;
      var offsetX = 0.5 - mouseX / containerWidth;
      var offsetY = 0.5 - mouseY / containerHeight;

      $('.designer__box-star_top').css({
         transform:
            'translate(' +
            offsetX * 40 +
            'px,' +
            offsetY * 40 +
            'px)',
         rotate: '160' + 'deg'

      });
      $('.designer__box-star_bottom').css({
         transform:
            'translate(' +
            offsetX * 40 +
            'px,' +
            offsetY * 40 +
            'px)',
         rotate: '190' + 'deg'

      });
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


const subscriptionBlocks = document.querySelectorAll('.subscription__block');
const subscriptionSwitchBtns = document.querySelectorAll('.subscription__switch button');
const designerContentLink = document.querySelector('.designer__content-link');
function activeSubscription() {
   subscriptionBlocks.forEach(block => {
      block.addEventListener('click', () => {
         subscriptionBlocks.forEach(otherBlock => {
            otherBlock.classList.remove('subscription__block_active');
            otherBlock.querySelector('.subscription__title').classList.remove('subscription__title_active');
            otherBlock.querySelector('.subscription__text').classList.remove('subscription__text_active');
            otherBlock.querySelector('.subscription__btn button').classList.remove('btn_black');
         });

         block.classList.add('subscription__block_active');
         block.querySelector('.subscription__title').classList.add('subscription__title_active');
         block.querySelector('.subscription__text').classList.add('subscription__text_active');
         block.querySelector('.subscription__btn button').classList.add('btn_black');
      });
   });
}
if (window.innerWidth >= 1024) {
   activeSubscription();
}

function switchSubscription(index) {
   subscriptionBlocks.forEach((block) => {
      block.classList.remove('subscription__block_active');
      block.querySelector('.subscription__title').classList.remove('subscription__title_active');
      block.querySelector('.subscription__text').classList.remove('subscription__text_active');
      block.querySelector('.subscription__btn button').classList.remove('btn_black');
      block.classList.add('hide');
   });

   subscriptionBlocks[index].classList.add('subscription__block_active');
   subscriptionBlocks[index].querySelector('.subscription__title').classList.add('subscription__title_active');
   subscriptionBlocks[index].querySelector('.subscription__text').classList.add('subscription__text_active');
   subscriptionBlocks[index].querySelector('.subscription__btn button').classList.add('btn_black');
   subscriptionBlocks[index].classList.remove('hide');
}

subscriptionSwitchBtns.forEach((btn, index) => {
   btn.addEventListener('click', () => {
      subscriptionSwitchBtns.forEach((otherBtn) => {
         otherBtn.classList.remove('btn_black');
      });

      switchSubscription(index);
      btn.classList.add('btn_black');
   });
});

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
   console.log(user);
   if (user !== null) {
      designerContentLink.style.display = 'none';
   } else {
      designerContentLink.style.display = 'block';
   }
});




import Header from './modules/header';
import ContactMe from './modules/contactMe';
import firebase from './modules/firebase';
import $ from 'jquery';
import { getAuth, onAuthStateChanged } from "firebase/auth";
class SubscriptionManager {
   constructor() {
      this.subscriptionBlocks = document.querySelectorAll('.subscription__block');
      this.subscriptionSwitchBtns = document.querySelectorAll('.subscription__switch button');
      this.designerContentLink = document.querySelector('.designer__content-link');
      this.header = new Header();
      this.contactMe = new ContactMe();
      this.val = this.contactMe.validation();
      this.auth = getAuth();

      if (window.innerWidth >= 1024) {
         this.activeSubscription();
      }

      this.setupEventListeners();
   }

   activeSubscription() {
      this.subscriptionBlocks.forEach(block => {
         block.addEventListener('click', () => {
            this.subscriptionBlocks.forEach(otherBlock => {
               this.deactivateBlock(otherBlock);
            });

            this.activateBlock(block);
         });
      });
   }

   switchSubscription(index) {
      this.subscriptionBlocks.forEach((block) => {
         this.deactivateBlock(block);
         block.classList.add('hide');
      });

      this.activateBlock(this.subscriptionBlocks[index]);
      this.subscriptionBlocks[index].classList.remove('hide');
   }

   setupEventListeners() {
      this.subscriptionSwitchBtns.forEach((btn, index) => {
         btn.addEventListener('click', () => {
            this.subscriptionSwitchBtns.forEach((otherBtn) => {
               otherBtn.classList.remove('btn_black');
            });

            this.switchSubscription(index);
            btn.classList.add('btn_black');
         });
      });

      onAuthStateChanged(this.auth, (user) => {
         console.log(user);
         if (user !== null) {
            this.designerContentLink.style.display = 'none';
         } else {
            this.designerContentLink.style.display = 'block';
         }
      });
   }

   deactivateBlock(block) {
      block.classList.remove('subscription__block_active');
      block.querySelector('.subscription__title').classList.remove('subscription__title_active');
      block.querySelector('.subscription__text').classList.remove('subscription__text_active');
      block.querySelector('.subscription__btn button').classList.remove('btn_black');
   }

   activateBlock(block) {
      block.classList.add('subscription__block_active');
      block.querySelector('.subscription__title').classList.add('subscription__title_active');
      block.querySelector('.subscription__text').classList.add('subscription__text_active');
      block.querySelector('.subscription__btn button').classList.add('btn_black');
   }
}

new SubscriptionManager();

import Swiper from 'swiper';
import $ from 'jquery';
import Header from './modules/header';
import firebase from './modules/firebase';
import ContactMe from './modules/contactMe';
import Parallax from './modules/parallax';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
class MainPage {
  constructor() {
    this.header = new Header();
    this.contactMe = new ContactMe();
    this.db = firebase.getFirestore();
    this.nftArr = [];

    this.init();
  }
  init() {
    firebase.getAuth();
    this.nftsCollection = collection(this.db, 'nfts');
    this.contactMe.validation();
    this.getDocsAndRender();
  }

  getDocsAndRender() {
    getDocs(this.nftsCollection).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.nftArr.push(data);
      });
      this.renderNFTs(this.nftArr.slice(0, 12));
    });
  }

  renderNFTs(product) {
    const card = $('.card');
    card.html('');

    product.forEach((nft) => {
      const cardHtml = `
        <div class="card__item swiper-slide" id="${nft.id}">
          <h3 class="card__title"><span>${nft.title}</span></h3>
          <div class="card__img">
            <picture>
              <source srcset="${nft.imgWebp}" type="image/webp">
              <img src="${nft.img}" alt="nft">
            </picture>
          </div>
          <h3 class="card__title card__title_sub"><span>${nft.title}</span></h3>
          <h4 class="card__sub-title">${nft.subTitle} or ${nft.title} </h4>
          <p class="card__text">${nft.text}</p>
          <hr class="card__line">
          <div class="card__row">
            <p class="card__price">${nft.price}</p>
            <div class="card__btn">
            <a href="product-arts.html?id=${nft.id}&name=${nft.name}" class="btn"><span>Buy now</span></a>
            </div>
          </div>
        </div>`;
      $('.nft-swiper-section__swiper-wrapper').append(cardHtml);
    });

    new Swiper('.nft-swiper-section__swiper-container', {
      slidesPerView: 1.3,
      spaceBetween: 16,
      centeredSlides: false,
      loop: true,
      breakpoints: {
        420: {
          slidesPerView: 2.3,
          centeredSlides: true,
          loop: true,
        },
        940: {
          slidesPerView: 3,
          centeredSlides: true,
          loop: true,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
        },
        1441: {
          slidesPerView: 4.5,
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
        },
        1550: {
          slidesPerView: 5,
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
        },
      },
    });
  }
}

const main = new MainPage();

new Swiper('.biography-section__swiper', {
  slidesPerView: 2.3,
  spaceBetween: 10,
  breakpoints: {
    430: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    },
    539: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

Parallax();

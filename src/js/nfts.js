
import $ from 'jquery';
import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import Parallax from './modules/parallax';
import Header from './modules/header';

class NFTApp {
   constructor() {
      this.db = getFirestore();
      this.nftsCollection = collection(this.db, 'nfts');
      this.prevButton = $('.nfts__pagination-prev');
      this.nextButton = $('.nfts__pagination-next');
      this.paginationList = $('.nfts__pagination-list');
      this.paginationNumbers = $('.nfts__pagination-number');
      this.currentPage = 1;
      this.nftArr = [];
      this.header = new Header();
      this.parallax = new Parallax();
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      this.currentPage = parseInt(pageParam) || 1;

      this.init();
   }

   init() {
      this.getDocsAndRender();
      this.prevButton.on('click', this.handlePrevClick.bind(this));
      this.nextButton.on('click', this.handleNextClick.bind(this));
      this.paginationNumbers.each((index, element) => {
         $(element).on('click', () => {
            const pageNumber = $(element).data('page');
            this.changePage(pageNumber);
         });
      });
   }

   getDocsAndRender() {
      getDocs(this.nftsCollection).then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.nftArr.push(data);
         });
         this.renderNFTs(this.nftArr.slice(0, 12));
         this.updateActiveClass();
         this.updateURL();
      });
   }

   renderNFTs(product) {
      const card = $('.card');
      card.html('');

      product.forEach((nft) => {
         const cardHtml = `
        <div class="card__item" id="${nft.id}">
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

         card.append(cardHtml);
      });
   }

   handlePrevClick() {
      if (this.currentPage > 1) {
         this.currentPage--;
         this.updateActiveClass();
         this.updateURL();
      }
   }

   handleNextClick() {
      if (this.currentPage < 2) {
         this.currentPage++;
         this.updateActiveClass();
         this.updateURL();
      }
   }

   updateActiveClass() {
      const paginationNumbers = this.paginationList.find('.nfts__pagination-number');
      paginationNumbers.each((index, number) => {
         const $number = $(number);
         if (index === this.currentPage - 1) {
            $number.addClass('nfts__pagination-number_active');
            this.renderNFTs(this.nftArr.slice(index * 12, (index * 12) + 12));
         } else {
            $number.removeClass('nfts__pagination-number_active');
         }
      });
   }

   updateURL() {
      const newURL = `?page=${this.currentPage}`;
      history.pushState({ page: this.currentPage }, null, newURL);
   }

}
new NFTApp();


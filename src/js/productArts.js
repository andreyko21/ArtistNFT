import $ from 'jquery';
import Header from './modules/header';
import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, } from 'firebase/firestore';
import Parallax from './modules/parallax';
import ContactMe from './modules/contactMe';


class ProductApp {
   constructor() {
      this.db = getFirestore();
      this.auth = firebase.getAuth();
      this.urlParams = new URLSearchParams(window.location.search);
      this.productId = this.urlParams.get('id');
      this.name = this.urlParams.get('name');
      this.artsCollection = collection(this.db, 'arts');
      this.nftsCollection = collection(this.db, 'nfts');
      this.productArts = [];
      this.productNfts = [];
      this.paymentInfos = [];
      this.upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      this.lowerCase = "abcdefghijklmnopqrstuvwxyz";
      this.minus = "-";
      this.underline = "_";
      this.special = "!\"#$%&'*+,./:;=?@\\^`|~";
      this.secret = '';
      this.arrSecret = [];
      this.data = new Date();
      this.day = this.data.getDate();
      this.month = this.data.getMonth() + 1;
      this.year = this.data.getFullYear();
      this.newData = this.day + '.' + this.month + '.' + this.year;
      this.parallax = new Parallax();
      this.contactMe = new ContactMe();
      this.val = this.contactMe.validation();
      this.randomValues = new Uint32Array(64);
      window.crypto.getRandomValues(this.randomValues);
      this.all = this.upperCase + this.lowerCase + this.minus + this.underline + this.special;
      this.header = new Header();
      this.loadCollectionArts();

      this.randomKey();

      if (this.name) {
         this.loadCollectionNfts();
      }


   }

   async getProductCollectionArts() {
      const urlParams = new URLSearchParams(window.location.search);
      const productId1 = urlParams.get('id');
      this.productDataArts = await getDocs(this.artsCollection);
      this.productDataArts.forEach((doc) => {
         this.productArts.push({
            id: doc.id,
            imagePng: doc.data().imagePng,
            title: doc.data().title,
            titleNft: doc.data().titleNft,
            text: doc.data().text,
            price: doc.data().price,
            textSub: doc.data().textSub,
            type: doc.data().type,
            imageWebP: doc.data().imageWebP,
            details: doc.data().details,

         });
      });

      this.getProductArts(this.productArts.find((item) => item.id === productId1));
      this.getProccesArts(this.productArts.find((item) => item.id === productId1));

   }

   async loadCollectionArts() {
      await this.getProductCollectionArts();
   }

   async getProductCollectionNfts() {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      const productName = urlParams.get('name');

      getDocs(this.nftsCollection).then((querySnapshot) => {
         const products = querySnapshot.docs.map((doc) => doc.data());
         const selectedProduct = products.find((item) => item.id == productId && item.name == productName);
         this.getProductNfts(selectedProduct);
         this.getProccesNfts(selectedProduct);

      });


   }


   async loadCollectionNfts() {
      await this.getProductCollectionNfts();
   }

   getProductArts(product) {

      const productContent = $('.product__content');
      productContent.html('');
      if (product) {
         const productHtml = `
         <div class="product__image">
            <div class = "product__image-img">
               <picture>
                  <source srcset="${product.imageWebP}" type="image/webp">
                  <img src="${product.imagePng}" alt="nft">
               </picture>
            </div>
         </div>
         <div class="product__info">
            <h1 class="product__info-title"><span>${product.titleNft}</span></h1>
            <h2 class="product__info-sub-title">${product.title} or ${product.titleNft}</h2>
            <p class="product__info-text">${product.text[0]}</p>
            <p class="product__info-text product__info-text_sub">${product.text[1]}</p>
            <div class="product__info-row">
               <div class="product__info-item">  
                  <p class="product__info-price">$${product.price}</p>
                  <div class="product__info-btn">
                      <a class="btn  product__info-link" href="payment.html?id=${product.id}">
                     <img src="images/svg/money.svg" alt="money">
                     <span>Buy now</span>
                     </a>
                  </div>
               </div>
               <hr class="product__info-line">
               <p class="product__info-sub-text">${product.textSub}</p>
            </div>
         </div>`;

         productContent.append(productHtml);

         $('.product__info-link').on('click', () => {
            let existingData = localStorage.getItem('info');
            let paymentInfos = [];

            if (existingData) {
               paymentInfos = JSON.parse(existingData);
            }

            paymentInfos.push({
               title: product.title,
               titleNft: product.titleNft,
               price: product.price,
               imagePng: product.imagePng,
               imageWebP: product.imageWebP,
               key: this.arrSecret,
               data: this.newData,
               status: 'Success',
            });

            localStorage.setItem('info', JSON.stringify(paymentInfos));

            console.log('ok');
         });
      }
   }

   getProductNfts(products) {
      console.log(products);
      const productContent = $('.product__content');
      productContent.html('');
      if (products) {
         const productHtml = `
        <div class="product__image">
          <div class="product__image-img">
            <picture>
              <source srcset="${products.imgWebp}" type="image/webp">
              <img src="${products.img}" alt="nft">
            </picture>
          </div>
        </div>
        <div class="product__info">
          <h1 class="product__info-title"><span>${products.title}</span></h1>
          <h2 class="product__info-sub-title">${products.subTitle} or ${products.title}</h2>
          <p class="product__info-text">${products.info[0]}</p>
          <p class="product__info-text product__info-text_sub">${products.info[1]}</p>
          <div class="product__info-row">
            <div class="product__info-item">
              <p class="product__info-price">${products.price}</p>
              <div class="product__info-btn">
                <a class="btn product__info-links" href="payment.html?id=${products.id}&name=${products.name}">
                  <img src="images/svg/money.svg" alt="money">
                  <span>Buy now</span>
                </a>
              </div>
            </div>
            <hr class="product__info-line">
            <p class="product__info-sub-text">${products.infoSub}</p>
          </div>
        </div>`;

         productContent.append(productHtml);

         $('.product__info-links').on('click', () => {
            let existingData = localStorage.getItem('info');
            let paymentInfos = [];

            if (existingData) {
               paymentInfos = JSON.parse(existingData);
            }

            paymentInfos.push({
               title: products.title,
               titleNft: products.titleNft,
               price: products.price,
               imagePng: products.img,
               imageWebP: products.imgWebp,
               key: this.arrSecret,
               data: this.newData,
               status: 'Success',
            });

            localStorage.setItem('info', JSON.stringify(paymentInfos));

            console.log('ok');
         });

      }
   }

   getProccesArts(img) {
      const productProcessImg = $('.product__process-img');
      productProcessImg.html('');
      if (img) {
         const productProcessHtml = `
      <div class="product__process-images"> 
         <picture class="">
         <source srcset="${img.imageWebP}" type="image/webp">
         <img src="${img.imagePng}" alt="nft">
         </picture>
         </div>`;
         if (img.type === 'premium') {
            const productProcessPremium = `
         <div class="product__process-premium">
         <h4 class="product__process-title product__process-title_sub">
            <span>avalaible for premium</span>
         </h4>
         <p class="product__process-text">
            <img src="images/svg/lock.svg" alt="lock">
            CONTENT LOCKED
         </p>
         <div class="product__process-btn">
            <button class="btn btn_arrow">
               <span>Unlock</span>
            </button>
         </div>  
      </div>
         `;
            productProcessImg.append(productProcessPremium);
         } else {
            $(document).ready(function () {
               $('.product__process-images img').css({
                  'filter': 'blur(0)',
                  'opacity': '1'
               });
            });
         }
         productProcessImg.append(productProcessHtml);
      }
   }
   getProccesNfts(img) {
      const productProcessImg = $('.product__process-img');
      productProcessImg.html('');
      if (img) {
         const productProcessHtml = `
      <div class="product__process-images"> 
         <picture class="">
         <source srcset="${img.imgWebp}" type="image/webp">
         <img src="${img.img}" alt="nft">
         </picture>
         </div>`;
         if (img.type === 'premium') {
            const productProcessPremium = `
         <div class="product__process-premium">
         <h4 class="product__process-title product__process-title_sub">
            <span>avalaible for premium</span>
         </h4>
         <p class="product__process-text">
            <img src="images/svg/lock.svg" alt="lock">
            CONTENT LOCKED
         </p>
         <div class="product__process-btn">
            <button class="btn btn_arrow">
               <span>Unlock</span>
            </button>
         </div>  
      </div>
         `;
            productProcessImg.append(productProcessPremium);
         } else {
            $(document).ready(function () {
               $('.product__process-images img').css({
                  'filter': 'blur(0)',
                  'opacity': '1'
               });
            });
         }
         productProcessImg.append(productProcessHtml);

      }
   }

   randomKey() {
      this.secret = '';
      this.arrSecret = [];
      for (let i = 0; i < this.randomValues.length; i++) {
         this.secret += this.all.charAt(this.randomValues[i] % this.all.length);
      }
      this.arrSecret.push(this.secret);
      // console.log(this.arrSecret);
   }


}

new ProductApp();













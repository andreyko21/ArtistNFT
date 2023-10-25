import $ from 'jquery';
import Header from './modules/header';
import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, } from 'firebase/firestore';



class ProductApp {
   constructor() {
      this.db = getFirestore();
      this.auth = firebase.getAuth();
      this.urlParams = new URLSearchParams(window.location.search);
      this.productId = this.urlParams.get('id');
      this.artsCollection = collection(this.db, 'arts');
      this.nftsCollection = collection(this.db, 'nfts');
      this.arrProduct = [];
      // this.paymentInfo = [];
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
      this.randomValues = new Uint32Array(64);
      window.crypto.getRandomValues(this.randomValues);
      this.all = this.upperCase + this.lowerCase + this.minus + this.underline + this.special;
      this.getProductCollection();
      this.randomKey();

   }
   async getProductCollection() {
      const productData = await getDocs(this.artsCollection);
      productData.forEach((doc) => {
         this.arrProduct.push({
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
      this.getProductNfr(this.arrProduct.find((item) => item.id === this.productId));
      this.getProcces(this.arrProduct.find((item) => item.id === this.productId));
 
      

   }
   async setProductCollection() {
      await getDocs(collection(this.db, "users"));
      if (this.auth.currentUser) {
         addDoc(collection(this.db, "users", this.auth.currentUser.uid, 'nft'), {
            img: this.arrProduct.find((item) => item.id === this.productId).imagePng,
            imgWebp: this.arrProduct.find((item) => item.id === this.productId).imageWebP,
            key: this.arrSecret,
            title: this.arrProduct.find((item) => item.id === this.productId).title,
            price: this.arrProduct.find((item) => item.id === this.productId).price,
            status: 'Success',
            day: this.day,
            month: this.month,
            year: this.year,
         });
        
      }else{
         console.log('no')
      }
   }

   getProductNfr(product) {
      const productContent = $('.product__content');
      productContent.html('');
      const productHtml = `
         <div class="product__image">
            <div class = "product__image-img">
               <picture>
                  <source srcset="${product.imagePng}" type="image/webp">
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
                     <a class="btn  product__info-link" href="payment.html">
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
         this.setProductCollection();
         // this.paymentInfo = JSON.parse(localStorage.getItem('info'));
         // this.paymentInfo.push({
         //    title: product.title,
         //    titleNft: product.titleNft,
         //    price: product.price,
         //    text: product.text,
         //    details: product.details,
         //    imagePng: product.imagePng,
         //    imageWebP: product.imageWebP,
         //    key: this.arrSecret

         // });
         // localStorage.setItem('info', JSON.stringify(this.paymentInfo));
      });


   }

   getProcces(img) {
      const productProcessImg = $('.product__process-img');
      productProcessImg.html('');

      const productProcessHtml = `
      <div class="product__process-images"> 
         <picture class="">
         <source srcset="${img.imagePng}" type="image/webp">
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

   randomKey() {
      this.secret = '';
      this.arrSecret = [];
      for (let i = 0; i < this.randomValues.length; i++) {
         this.secret += this.all.charAt(this.randomValues[i] % this.all.length);
      }
      this.arrSecret.push(this.secret);
      console.log(this.arrSecret);
   }
}

new ProductApp();






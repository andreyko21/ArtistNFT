import $ from 'jquery';
import Header from './modules/header';
import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';



class ProductApp {
   constructor() {
      this.db = getFirestore();
      this.urlParams = new URLSearchParams(window.location.search);
      this.productId = this.urlParams.get('id');
      this.nftsCollection = collection(this.db, 'arts');
      this.arrProduct = [];
      this.paymentInfo = [];
      this.getProductCollection();
   }
   async getProductCollection() {
      const productData = await getDocs(this.nftsCollection);
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
         this.paymentInfo.push({
            title: product.title,
            titleNft: product.titleNft,
            price: product.price,
            text: product.text,
            details: product.details,
         });
         localStorage.setItem('info', JSON.stringify(this.paymentInfo));
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

}

new ProductApp();






import $ from 'jquery';
import 'jquery-validation';
import Header from './modules/header';
import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
class Payment {
   constructor() {
      this.db = getFirestore();
      this.auth = firebase.getAuth();
      this.urlParams = new URLSearchParams(window.location.search);
      this.productId = this.urlParams.get('id');
      this.name = this.urlParams.get('name');
      this.artsCollection = collection(this.db, 'arts');
      this.nftsCollection = collection(this.db, 'nfts');
      this.paymentButtons = $('.payment__pay-btn');
      this.paymentCard = $('.payment__pay-card');
      this.paymentPaypal = $('.payment__pay-pal');
      this.paymentCrypto = $('.payment__pay-crypto');
      this.paymentError = $('.payment__pay-error');
      this.submitBtn = $('.submit');
      this.productArts = [];
      this.checkbox = $('#contact-me-checkbox');
      // this.getPaymentInfo(this.paymentDetails);
      this.switchClickPay();
      this.initValidation();
      this.clickMouse();
      this.header = new Header();
      this.getProductCollectionArts();
      let local = JSON.parse(localStorage.getItem('info'));


      if (this.name) {
         this.loadCollectionNfts();
      }
   }


   async addCollectionArts() {
      await getDocs(collection(this.db, "users"));
      let local = JSON.parse(localStorage.getItem('info'));

      if (this.auth.currentUser) {
         const nftCollectionRef = collection(this.db, "users", this.auth.currentUser.uid, 'nft');

         for (const item of local) {
            const querySnapshot = await getDocs(query(nftCollectionRef, where("key", "==", item.key)));
            const matchingDocs = querySnapshot.docs;

            if (matchingDocs.length === 0) {
               await addDoc(nftCollectionRef, item);
               console.log('ok')
            }
         }
         console.log('ok');
      } else {
         console.log('error');
      }
   }







   async getProductCollectionArts() {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
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

      this.getPaymentInfoArts(this.productArts.find((item) => item.id === productId));



   }

   getPaymentInfoArts(item) {
      const paymentInfo = $('.payment__info');
      paymentInfo.html('');
      if (item) {
         const paymentInfoHtml = `
         <h2 class="payment__info-title">${item.title} or ${item.titleNft}</h2>
         <div class="payment__info-row">
           <div class="payment__info-item">
             <h3 class="payment__info-subtitle"><span>PRICE</span></h3>
             <p class="payment__info-price">$${item.price}</p>
           </div>
           <button class="payment__info-btn">BID</button>
         </div>
         <hr class="payment__info-line">
         <h3 class="payment__info-subtitle"><span>${item.details[0]}</span></h3>
         <div class="payment__info-subrow">
           <p class="payment__info-size">${item.details[1]}</p>
           <p class="payment__info-details">${item.details[2]}</p>
         </div>
         <p class="payment__info-text">${item.text[0]}</p>
         <p class="payment__info-text">${item.text[1]}</p>
       `;

         paymentInfo.append(paymentInfoHtml);
      }
   }
   async getProductCollectionNfts() {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      const productName = urlParams.get('name');
      getDocs(this.nftsCollection).then((querySnapshot) => {
         const products = querySnapshot.docs.map((doc) => doc.data());
         const selectedProduct = products.find((item) => item.id == productId && item.name == productName);
         this.getPaymentInfoNfts(selectedProduct);

      });


   }
   async loadCollectionNfts() {
      await this.getProductCollectionNfts();
   }
   getPaymentInfoNfts(items) {
      const paymentInfo = $('.payment__info');
      paymentInfo.html('');
      if (items) {
         const paymentInfoHtml = `
         <h2 class="payment__info-title">${items.subTitle} or ${items.title}</h2>
         <div class="payment__info-row">
           <div class="payment__info-item">
             <h3 class="payment__info-subtitle"><span>PRICE</span></h3>
             <p class="payment__info-price">$${items.price}</p>
           </div>
           <button class="payment__info-btn">BID</button>
         </div>
         <hr class="payment__info-line">
         <h3 class="payment__info-subtitle"><span>${items.details[0]}</span></h3>
         <div class="payment__info-subrow">
           <p class="payment__info-size">${items.details[1]}</p>
           <p class="payment__info-details">${items.details[2]}</p>
         </div>
         <p class="payment__info-text">${items.info[0]}</p>
         <p class="payment__info-text">${items.info[1]}</p>
       `;

         paymentInfo.append(paymentInfoHtml);
      }
   }

   switchClickPay() {
      this.paymentButtons.on('click', (event) => this.switchPay(event));
   }

   switchPay(event) {
      const targetButton = $(event.target);
      const index = this.paymentButtons.index(targetButton);

      this.paymentButtons.removeClass('payment__pay-btn_active');
      targetButton.addClass('payment__pay-btn_active');

      this.paymentCard.addClass('hide');
      this.paymentPaypal.addClass('hide');
      this.paymentCrypto.addClass('hide');

      if (index === 0) {
         this.paymentCard.removeClass('hide');
      } else if (index === 1) {
         this.paymentPaypal.removeClass('hide');
      } else if (index === 2) {
         this.paymentCrypto.removeClass('hide');
      }
   }

   initValidation() {

      $('.name').on('input', this.validateName);
      $('.email').on('input', this.validateEmail);
      $('.number').on('input', this.formatNumber);
      $('.data').on('input', this.formatDate);
      $('.cvc').on('input', this.validateCVC);


   }

   validateName() {
      let inputValue = $(this).val();
      let sanitizedValue = inputValue.replace(/\d/g, '');

      if (inputValue !== sanitizedValue || inputValue.length < 2) {
         $(this).val(sanitizedValue);
         $(this).addClass('error');
      } else {
         $(this).removeClass('error');
      }
   }

   validateEmail() {
      const emailValue = $(this).val();
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(emailValue)) {
         $(this).addClass('error');
      } else {
         $(this).removeClass('error');
      }
   }

   formatNumber() {
      let inputValue = $(this).val();
      inputValue = inputValue.replace(/[^0-9]/g, '');

      let formattedValue = '';
      for (let i = 0; i < inputValue.length; i++) {
         if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
         }
         formattedValue += inputValue[i];
      }
      if (inputValue.length <= 15) {
         $(this).addClass('error');
      } else {
         $(this).removeClass('error');
      }

      formattedValue = formattedValue.substr(0, 19);
      $(this).val(formattedValue);
   }
   formatDate() {
      let inputValue = $(this).val();
      inputValue = inputValue.replace(/[^0-9]/g, '');

      if (inputValue.length > 3) {
         inputValue = inputValue.substr(0, 4);

         $(this).removeClass('error');
      } else {
         $(this).addClass('error');
      }

      if (inputValue.length >= 1) {
         inputValue = inputValue.substr(0, 2) + '/' + inputValue.substr(2);

      }

      $(this).val(inputValue);
   }
   validateCVC() {
      let inputValue = $(this).val();
      inputValue = inputValue.replace(/[^0-9]/g, '');

      if (inputValue.length > 2) {
         inputValue = inputValue.substr(0, 3);
         $(this).removeClass('error');
      } else {
         $(this).addClass('error');
      }

      $(this).val(inputValue);
   }

   clickMouse() {
      const self = this;

      this.checkbox.on('change', function () {
         if ($(this).is(':checked')) {
            self.submitBtn.removeClass('disabled');
         } else {
            self.submitBtn.addClass('disabled');
         }
      });

      this.submitBtn.on('click', function (e) {
         e.preventDefault();
         self.addCollectionArts();
      });

   }



}
new Payment();




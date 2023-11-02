import $ from 'jquery';
import 'jquery-validation';
import Header from './modules/header';
import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
class Payment {
   constructor() {
      this.db = getFirestore();
      this.auth = firebase.getAuth();
      this.artsCollection = collection(this.db, 'arts');
      this.nftsCollection = collection(this.db, 'nfts');
      this.header = new Header();
      this.initPaymentElements();
      this.getProductArts();
      this.loadNftsIfNameExists();
   }


   initPaymentElements() {
      this.paymentButtons = $('.payment__pay-btn');
      this.paymentCard = $('.payment__pay-card');
      this.paymentPayPal = $('.payment__pay-pal');
      this.paymentCrypto = $('.payment__pay-crypto');
      this.paymentError = $('.payment__pay-error');
      this.submitBtn = $('.submit');
      this.productArts = [];
      this.checkbox = $('#contact-me-card');
      this.checkboxPal = $('#contact-me-pay');
      this.checkboxCrypto = $('#contact-me-crypto');
      this.switchClickPay();
      this.formInputValidation();
      this.setupInputValidation();
   }

   formInputValidation() {
      this.initValidation(this.paymentCard);
      this.initValidation(this.paymentPayPal);
      this.initValidation(this.paymentCrypto);
   }

   setupInputValidation() {
      $('input[name="number"]').on('input', (event) => this.validateInputNumber(event));
      $('input[name="data"]').on('input', (event) => this.validateInputData(event));
      $('input[name="cvc"]').on('input', (event) => this.validateInputCvc(event));
      $('input[name="name"]').on('input', (event) => this.validateInputName(event));
      $('input[name="email"]').on('input', (event) => this.validateInputEmail(event));
      $('#submitButton').on('click', (event) => this.onSubmitButtonClick(event));
   }

   initValidation(form) {
      form.validate({
         rules: {
            name: {
               required: true,
               minlength: 2,
            },
            email: {
               required: true,
               email: true
            },
            number: {
               required: true,
               minlength: 16,
               maxlength: 16,

            },
            data: {
               required: true,
               minlength: 4,
            },
            cvc: {
               required: true,
               minlength: 3,
            },
            checkbox: {
               required: true
            },
            checkboxPal: {
               required: true
            },
            checkboxCrypto: {
               required: true
            }
         },
         messages: {
            name: {
               required: "Please enter your name",
               minlength: "Name must be at least 2 characters",
               pattern: "Name can only contain letters and spaces"
            },
            email: {
               required: "Please enter your email address",
               email: "Please enter a valid email address"
            },
            number: {
               required: "Please enter your credit card number",
               minlength: "Credit card number must be exactly 16 digits"
            },
            data: {
               required: "Please enter the date",
               minlength: "Date must be in MMYY format"
            },
            cvc: {
               required: "Please enter the CVC code",
               minlength: "CVC code must be exactly 3 digits"
            },
            // checkbox: {
            //    required: "Please check this box"
            // },
            // checkboxPal: {
            //    required: "Please check this box"
            // },
            // checkboxCrypto: {
            //    required: "Please check this box"
            // }
         },

         errorPlacement: (error, element) => {
            error.appendTo(element.parent().find('.payment__pay-error'));
         },
         highlight: (element, errorClass, validClass) => {
            $(element).addClass('error').removeClass(validClass);
         },
         unhighlight: (element, errorClass, validClass) => {
            $(element).removeClass('error').addClass(validClass);
         }
      });
   }

   validateInputNumber(event) {
      let inputValue = $(event.target).val().replace(/[^0-9]/g, '');
      let formattedValue = '';


      for (let i = 0; i < inputValue.length; i++) {
         if (i > 0 && i % 4 === 0) {
            // formattedValue += ' ';
         }
         formattedValue += inputValue[i];
      }

      if (inputValue.length === 16) {
         $(event.target).removeClass('error');
      } else {
         $(event.target).addClass('error');
      }

      formattedValue = formattedValue.substr(0, 16);

      $(event.target).val(formattedValue);

      // }


   }

   validateInputData(event) {
      let inputValue = $(event.target).val().replace(/[^0-9]/g, '');
      if (inputValue.length > 3) {
         inputValue = inputValue.substr(0, 4);
         $(event.target).removeClass('error');
      } else {
         $(event.target).addClass('error');
      }

      if (inputValue.length >= 1) {
         inputValue = inputValue.substr(0, 2) + '/' + inputValue.substr(2);
      }

      $(event.target).val(inputValue);
   }

   validateInputCvc(event) {
      let inputValue = $(event.target).val().replace(/[^0-9]/g, '');
      if (inputValue.length > 2) {
         inputValue = inputValue.substr(0, 3);
         $(event.target).removeClass('error');
      } else {
         $(event.target).addClass('error');
      }

      $(event.target).val(inputValue);
   }

   validateInputName(event) {
      let inputValue = $(event.target).val();
      let sanitizedValue = inputValue.replace(/\d/g, '');

      if (inputValue !== sanitizedValue || inputValue.length < 2 || inputValue.length === '') {
         $(event.target).val(sanitizedValue);
         $(event.target).addClass('error');
      } else {
         $(event.target).removeClass('error');
      }
   }

   validateInputEmail(event) {
      const emailValue = $(event.target).val();
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(emailValue)) {
         $(event.target).addClass('error');
      } else {
         $(event.target).removeClass('error');
      }
   }

   onSubmitButtonClick(event) {
      event.preventDefault();

   }

   async addCollectionToDatabase() {
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

   async getProductArts() {
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

      this.renderInfoArts(this.productArts.find((item) => item.id === productId));
   }

   renderInfoArts(item) {
      const paymentInfo = $('.payment__details');
      paymentInfo.html('');
      if (item) {
         const paymentInfoHtml = `
   <div class="payment__info">
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
       </div> `;

         paymentInfo.append(paymentInfoHtml);
      }
   }
   async getProductNfts() {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      const productName = urlParams.get('name');
      getDocs(this.nftsCollection).then((querySnapshot) => {
         const products = querySnapshot.docs.map((doc) => doc.data());
         const selectedProduct = products.find((item) => item.id == productId && item.name == productName);
         this.renderInfoNfts(selectedProduct);
      });
   }

   async loadCollectionNfts() {
      await this.getProductNfts();
   }

   loadNftsIfNameExists() {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get('name');
      if (name) {
         this.loadCollectionNfts();
      }
   }

   renderInfoNfts(items) {
      const paymentInfo = $('.payment__details');
      paymentInfo.html('');
      if (items) {
         const paymentInfoHtml = `
   <div class="payment__info">
          <h2 class="payment__info-title">${items.subTitle} or ${items.title}</h2>
          <div class="payment__info-row">
            <div class="payment__info-item">
              <h3 class="payment__info-subtitle"><span>PRICE</span></h3>
              <p class="payment__info-price">${items.price}</p>
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
        </div>`;

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
      this.paymentPayPal.addClass('hide');
      this.paymentCrypto.addClass('hide');

      if (index === 0) {
         this.paymentCard.removeClass('hide');
      } else if (index === 1) {
         this.paymentPayPal.removeClass('hide');
      } else if (index === 2) {
         this.paymentCrypto.removeClass('hide');
      }
   }

}

new Payment();







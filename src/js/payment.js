import $ from 'jquery';
import 'jquery-validation';
import Header from './modules/header';
class Payment {
   constructor() {
      this.paymentDetails = JSON.parse(localStorage.getItem('info'));
      this.paymentButtons = $('.payment__pay-btn');
      this.paymentCard = $('.payment__pay-card');
      this.paymentPaypal = $('.payment__pay-pal');
      this.paymentCrypto = $('.payment__pay-crypto');
      this.paymentError = $('.payment__pay-error');
      this.submitBtn = $('.submit');
     
      console.log(this.form);
      this.getPaymentInfo(this.paymentDetails);
      this.switchClickPay();
      // this.initValidation();
      this.clickMouse();
      // this.randomKey();
      this.checkForm();
      this.header = new Header();
   }

   getPaymentInfo(paymentDetails) {
      const paymentInfo = $('.payment__info');
      paymentInfo.html('');

      paymentDetails.map(item => {
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
      });
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
      this.submitBtn.on('click', function (event) {
         event.preventDefault();
      });
   }

   checkForm() {
      // if () {
      //    this.submitBtn.removeClass('disabled');
      //    alert('Your payment has been sent');
      // } else {
      //    this.submitBtn.addClass('disabled');
      // }
   }



}
new Payment();




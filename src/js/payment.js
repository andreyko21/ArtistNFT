import $ from 'jquery';

// const paymentPayBtns = document.querySelectorAll('.payment__pay-btn');
// const paymentPayPal = document.querySelector('.payment__pay-pal');
// paymentPayBtns.forEach(btn => {
//    btn.addEventListener('click', () => {
//       paymentPayBtns.forEach(removeBtn => {
//          removeBtn.classList.remove('payment__pay-btn_active');

//       });

//       btn.classList.add('payment__pay-btn_active');
//    });
// });

class Payment {
   constructor() {
      this.paymentDetails = JSON.parse(localStorage.getItem('info'));
      this.paymentButtons = $('.payment__pay-btn');
      this.paypalPayment = $('.payment__pay-pal');
      this.cryptoPayment = $('.payment__pay-crypto');

      this.getPaymentInfo(this.paymentDetails);
      this.switchPay();
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

   switchPay() {
      this.paymentButtons.on('click', (e) => {
         e.preventDefault();

         const target = $(e.target);
         if (!target.hasClass('payment__pay-btn_active')) {
            this.paymentButtons.removeClass('payment__pay-btn_active');
            target.addClass('payment__pay-btn_active');

            if (target.hasClass('payment__pay-pal')) {
               this.paypalPayment.removeClass('hide');
               this.cryptoPayment.addClass('hide');
            } else if (target.hasClass('payment__pay-crypto')) {
               this.cryptoPayment.removeClass('hide');
               this.paypalPayment.addClass('hide');
            }
         }
      });
   }
}

new Payment();
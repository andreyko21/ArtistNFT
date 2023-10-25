import firebase from './modules/firebase';
import { getFirestore, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
const db = getFirestore();

const nftsCollection = collection(db, 'nfts');
const prevButton = document.querySelector('.nfts__pagination-prev');
const nextButton = document.querySelector('.nfts__pagination-next');
const paginationList = document.querySelector('.nfts__pagination-list');
let currentPage = 1;
let nftArr = [];

getDocs(nftsCollection).then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
      const data = doc.data();
      nftArr.push(data);
   });
   getCardNft(nftArr.slice(0, 12));
});


function getCardNft(product) {
   const card = document.querySelector('.card');
   card.innerHTML = '';

   product.forEach((nft) => {
      const cardHtml = `
<div class="card__item" id="${nft.id}">
   <h3 class="card__title">${nft.title}</h3>
      <div class="card__img">
         <picture>
            <source srcset="${nft.imgWebp}" type="image/webp">
            <img src="${nft.img}" alt="nft">
         </picture>
      </div>
   <h3 class="card__title card__title_sub">${nft.title}</h3>
   <h4 class="card__sub-title">${nft.subTitle}</h4>
   <p class="card__text">${nft.text}</p>
   <hr class="card__line">
   <div class="card__row">
      <p class="card__price">${nft.price}</p>
      <div class="card__btn">
         <button class="btn"><span>${nft.button}</span></button>
      </div></div>
   </div>
</div>`;

      card.insertAdjacentHTML('beforeend', cardHtml);
   });

   const cardItems = document.querySelectorAll('.card__item');
   cardItems.forEach((item) => {
      item.addEventListener('click', (e) => {
         const id = e.currentTarget.id;
         console.log(id);     
         window.location.href = `product-arts.html?id=${id}`;
      });
   });
}

prevButton.addEventListener('click', () => {
   if (currentPage > 1) {
      currentPage--;
      updateActiveClass();
   }
});

nextButton.addEventListener('click', () => {
   if (currentPage < 2) {
      currentPage++;
      updateActiveClass();
   }

});

function updateActiveClass() {
   const paginationNumbers = paginationList.querySelectorAll('.nfts__pagination-number');
   paginationNumbers.forEach((number, index) => {
      if (index === currentPage - 1) {
         number.classList.add('nfts__pagination-number_active');
         getCardNft(nftArr.slice((index * 12), (index * 12) + 12));
      } else {
         number.classList.remove('nfts__pagination-number_active');
      }
   });
}
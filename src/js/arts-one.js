import $ from 'jquery';
import OneItem from './modules/one-item';
import Header from './modules/header';
import { collection, getDocs} from "firebase/firestore";
import firebase from './modules/firebase';


class ArtsOne {
  constructor() {
    this.header = new Header();
    this.db = firebase.getFirestore();
    this.prolax();
    this.firebase();
  }
  async firebase() {
    const querySnapshot = await getDocs(collection(this.db, "arts"));
    querySnapshot.forEach((doc) => {

      loadItem(doc.data(), doc.id);

    });
  }
  prolax(){
    $(document).ready(function () {
      $('.arts').mousemove(function (e) {
        var containerWidth = $(this).width();
        var containerHeight = $(this).height();
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;
        var offsetX = 0.5 - mouseX / containerWidth;
        var offsetY = 0.5 - mouseY / containerHeight;
    
        $('.parallax').css({
          transform:
            'translate(-50%,-50%) translate(' +
            offsetX * 40 +
            'px,' +
            offsetY * 40 +
            'px)',
        });
      });
  });
}};
const artsOne = new  ArtsOne();

function loadItem(info, id){
  const cardBlock = document.querySelector('.arts__cards');
  cardBlock.innerHTML += `
    <div class="one-card ${id} prevent one-card_open">
    <div class="one-card__unlock">
      <div class="one-card__unlock-main">
        <div class="one-card__unlock-title">avalaible for premium</div>
        <div class="one-card__unlock-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M28.3334 15V11.6667C28.3334 7 24.6667 3.33333 20.0001 3.33333C15.3334 3.33333 11.6667 7 11.6667 11.6667V15C8.83341 15 6.66675 17.1667 6.66675 20V31.6667C6.66675 34.5 8.83341 36.6667 11.6667 36.6667H28.3334C31.1667 36.6667 33.3334 34.5 33.3334 31.6667V20C33.3334 17.1667 31.1667 15 28.3334 15ZM15.0001 11.6667C15.0001 8.83333 17.1667 6.66666 20.0001 6.66666C22.8334 6.66666 25.0001 8.83333 25.0001 11.6667V15H15.0001V11.6667ZM21.8334 25.8333L21.6667 26V28.3333C21.6667 29.3333 21.0001 30 20.0001 30C19.0001 30 18.3334 29.3333 18.3334 28.3333V26C17.3334 25 17.1667 23.5 18.1667 22.5C19.1667 21.5 20.6667 21.3333 21.6667 22.3333C22.6667 23.1667 22.8334 24.8333 21.8334 25.8333Z" fill="#C8D2DC"/>
          </svg>
          <span>CONTENT LOCKED</span>
        </div>
        <a href="" class="btn btn_arrow one-card__btn one-card__unlock-btn"><span>Unlock</span></a>
      </div>
    </div>
    <div class="one-card__open ">
        <div class="one-card__open-main">
          <div class="one-card__open-title">Title of picture</div>
          <div class="one-card__open-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor ipsum dolor</div>
          <div class="one-card__open-price">$100 322</div>
          <div class="one-card__btn-row">
            <a href="" class="btn btn_black one-card__btn one-card__open-btn"><span>Buy</span></a>
            <a href="" class="btn btn_arrow one-card__btn one-card__open-btn"><span>View</span></a>
          </div>
        </div>
    </div>
    <picture class="one-card__bg one-card__bg_blur">
      <source srcset="./images/arts-one/bg-blur.webp" type="image/webp">
      <img src="./images/arts-one/bg-blur.png" alt="">
    </picture>
    <picture class="one-card__bg one-card__bg_default">
      <source srcset="./images/arts-one/bg-item.webp" type="image/webp">
      <img src="./images/arts-one/bg-item.png" alt="">
    </picture>
    </div>
  `;
}

const cardBlock2 = document.querySelector('.arts__cards');

$('.arts__cards').on('click mouseenter', '.one-card', (event) => {
  $('.active').removeClass('active');
  const clickedElement = $(event.currentTarget);
  clickedElement.addClass('active');
  clickedElement.find('.btn').removeClass('one-card__btn_active');
  setTimeout(function(){
    clickedElement.find('.btn').addClass('one-card__btn_active');
  },1);
});


$('.arts__cards').on('mouseleave', '.one-card', () => {
  $('.active').removeClass('active');
});


// function loadScript(){
//   const script = document.createElement('script');
//   script.textContent = `
//     const allItems = document.querySelectorAll('.one-card');
//     function delActive(){
//       const allActive = document.querySelectorAll('.active');

//       allActive.forEach((thisClass) => {
//         console.log(thisClass)
//         thisClass.classList.remove('active')
//       });
//     }
//     function addActive(item){
//       delActive();
//       item.classList.add('active')
//     }

//     allItems.forEach((item) => {
//       item.addEventListener('click', function() {
//         addActive(item);
//       });
//       item.addEventListener("mouseenter", function() {
//         addActive(item);
//       });
//       item.addEventListener("mouseleave", function() {
//         delActive();
//       });
//     });
//   `;
//   document.head.appendChild(script);
// }

























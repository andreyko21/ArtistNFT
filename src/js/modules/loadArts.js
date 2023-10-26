import $ from 'jquery';

export default class LoadArts{
    constructor(info, id){
      this.info = info;
      this.id = id;
      this.cardBlock = $('.cards');
      this.addClass();
      this.loaditem();
    }
    addClass(){
      this.classInfo = 'one-card_open';
      this.sizeClass = '';
      if(this.info.type === "premium"){
        this.classInfo = 'one-card_unlock';
      }
      if(this.info.size === 'big'){
        this.sizeClass = 'one-card_big';
      }
    }
    //
    loaditem(){
      this.cardBlock.append(`
        <div class="one-card ${this.id} ${this.classInfo} ${this.sizeClass}">
        <div class="one-card__unlock">
          <div class="one-card__unlock-main">
            <div class="one-card__unlock-title">avalaible for premium</div>
            <div class="one-card__unlock-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M28.3334 15V11.6667C28.3334 7 24.6667 3.33333 20.0001 3.33333C15.3334 3.33333 11.6667 7 11.6667 11.6667V15C8.83341 15 6.66675 17.1667 6.66675 20V31.6667C6.66675 34.5 8.83341 36.6667 11.6667 36.6667H28.3334C31.1667 36.6667 33.3334 34.5 33.3334 31.6667V20C33.3334 17.1667 31.1667 15 28.3334 15ZM15.0001 11.6667C15.0001 8.83333 17.1667 6.66666 20.0001 6.66666C22.8334 6.66666 25.0001 8.83333 25.0001 11.6667V15H15.0001V11.6667ZM21.8334 25.8333L21.6667 26V28.3333C21.6667 29.3333 21.0001 30 20.0001 30C19.0001 30 18.3334 29.3333 18.3334 28.3333V26C17.3334 25 17.1667 23.5 18.1667 22.5C19.1667 21.5 20.6667 21.3333 21.6667 22.3333C22.6667 23.1667 22.8334 24.8333 21.8334 25.8333Z" fill="#C8D2DC"/>
              </svg>
              <span>CONTENT LOCKED</span>
            </div>
            <a href="#?id=${this.id}" class="btn btn_arrow one-card__btn one-card__unlock-btn"><span>Unlock</span></a>
          </div>
        </div>
        <div class="one-card__open ">
            <div class="one-card__open-main">
              <div class="one-card__open-title">${this.info.title}</div>
              <div class="one-card__open-info">${this.info.info}</div>
              <div class="one-card__open-price">$${this.info.price}</div>
              <div class="one-card__btn-row">
                <a href="#?id=${this.id}" class="btn btn_black one-card__btn one-card__open-btn"><span>Buy</span></a>
                <a href="#?id=${this.id}" class="btn btn_arrow one-card__btn one-card__open-btn"><span>View</span></a>
              </div>
            </div>
        </div>
        <picture class="one-card__bg">
          <source srcset="${this.info.imageWebP}" type="image/webp">
          <img src="${this.info.imagePng}" alt="">
        </picture>
        </div>
      `);
    }
}
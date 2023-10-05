import $ from 'jquery';
import Header from './modules/header';
import CustomBy from './modules/customBy';

class ArtsOne {
    constructor() {
      this.header = new Header();
      this.customBy = new CustomBy();
      this.init();

    }
    init() {
        this.customBy.dropdown();
        this.customBy.validation();
    }
  }
  
const artsOne = new  ArtsOne();
console.log(123)
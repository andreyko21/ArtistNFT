// import Swiper, { Navigation, Pagination } from 'swiper';

import Header from './modules/header';
import firebase from "./modules/firebase";

class MainPage{
    constructor(){
        this.header = new Header();
        this.init();
    }
    init(){
        firebase.getAuth();
    }
}

const main = new MainPage();
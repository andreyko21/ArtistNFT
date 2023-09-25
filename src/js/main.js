// import Swiper, { Navigation, Pagination } from 'swiper';

import Header from './modules/header';
import ContactMe from "./modules/contactMe";
import firebase from "./modules/firebase";

class MainPage{
    constructor(){
        this.header = new Header();
        this.contactMe = new ContactMe();
        this.init();
    }
    init(){
        this.contactMe.check();


        firebase.getAuth();
    }
}

const main = new MainPage();
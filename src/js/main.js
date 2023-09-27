// import Swiper, { Navigation, Pagination } from 'swiper';

import Header from './modules/header';
import ContactMe from "./modules/contactMe";
import CustomBy from "./modules/customBy";
import firebase from "./modules/firebase";

class MainPage{
    constructor(){
        this.header = new Header();
        this.contactMe = new ContactMe();
        this.customBy = new CustomBy();
        this.init();
    }
    init(){
        // this.contactMe.validation();
        this.customBy.dropdown();


        firebase.getAuth();
    }
}

const main = new MainPage();
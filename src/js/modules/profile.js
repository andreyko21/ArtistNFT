import Header from './profileHeader';
import firebase from './firebase';
import $ from 'jquery';

export default class Profile {
  constructor() {
    this.logOutButton = $('.log-out');
    this.init();
    this.header = new Header();
  }

  async init() {
    await this.checkAuth();
    this.bindEvents();
  }

  bindEvents() {
    this.logOutButton.on('click', () => {
      this.logOut();
    });
  }

  logOut() {
    firebase.getAuth().signOut();
  }

  checkAuth() {
    firebase.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        window.location.href = '/sign.html';
      }
    });
  }
}

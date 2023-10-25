import $ from 'jquery';
import firebase from './modules/firebase';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import Profile from './modules/profile';

class ProfileNftOrders {
  constructor() {
    this.profile = new Profile();
    this.init();
    this.tableListBlock = $('.table__body');
  }

  init() {
    this.getOrders();
  }

  getOrders() {
    const db = firebase.getFirestore();
    const ordersRef = collection(db, 'users', this.profile.user.uid, 'orders');
    const querySnapshot = getDocs(ordersRef);
    querySnapshot.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        this.render(doc.data());
      });
    });
  }

  render() {}
}

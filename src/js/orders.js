import $ from 'jquery';
import firebase from './modules/firebase';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import Profile from './modules/profile';

class ProfileNftOrders {
  constructor() {
    this.profile = new Profile();
    this.tableListBlock = $('.table__body');
    this.init();
  }

  async init() {
    this.getOrders();
  }

  getOrders() {
    firebase.getAuth().onAuthStateChanged((user) => {
      const db = firebase.getFirestore();
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const querySnapshot = getDocs(ordersRef);
      querySnapshot.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.render(doc.data());
        });
      });
    });
  }
  render(data) {
    const newOrder = `<tr class="table-order">
          <td class="table-order__type">${data.clothes}</td>
          <td class="table-order__color"><span style="background-color:${
            data.color
          }"></span></td>
          <td class="table-order__email">emailofcustomer@gmail.com</td>
          <td class="table-order__size">${data.size}</td>
          <td class="table-order__comment">
            <p class="table-order__comment-text">${data.comment.slice(
              0,
              16
            )}</p>
            <p class="table-order__comment-text table-order__comment-text_mobile">${
              data.comment
            }</p>
            <button class="table-order__comment-button show-more-link">
              Show more
            </button>
          </td>
          <td class="table-order__address">
            <p class="table-order__address-text"></p>
            <button class="show-more-link">Show more</button>
          </td>
          <td class="table-order__action">
            <button class="table-order__action-button btn">
              <span>Message</span>
            </button>
          </td>
        </tr>`;
    this.tableListBlock.append(newOrder);
  }
}
new ProfileNftOrders();

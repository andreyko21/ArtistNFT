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
    firebase.getAuth().onAuthStateChanged((user) => {
      const db = firebase.getFirestore();
      const ordersRef = collection(db, 'users', user.uid, 'nft');
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
    const newOrder = `<tr class="table-nft-order">
          <td class="table-nft-order__nft-img">
            <img src="${data.imageWebP}" />
          </td>
          <td class="table-nft-order__nft-name">${data.title}</td>
          <td class="table-nft-order__crypto-address">
            <div class="table-nft-order__crypto-address-copy">
              <span class="table-nft-order__crypto-address-copy-text"></span
              ><button
                class="table-nft-order__crypto-address-copy-button"
                aria-label="copy"
              >
                <span class="icon-copy"></span>
              </button>
            </div>
          </td>
          <td class="table-nft-order__status">
            <span class="table-nft-order__status-success">Success</span>
          </td>
          <td class="table-nft-order__price">$100 322</td>
          <td class="table-nft-order__date">12, June 14:00</td>
        </tr>`;
    this.tableListBlock.append(newOrder);
  }
}

new ProfileNftOrders();

import $ from 'jquery';
import firebase from './modules/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database';

class UsersPage {
  constructor() {
    this.init();
    this.usersList = [];
    this.tableListBlock = $('.table__body');
    this.uid = 'iGrzXDq0rocvPXo9KoHngenZqvf2';
  }

  async init() {
    await this.getUsers();
    this.changeOnlineStatus();
  }

  async getUsers() {
    const db = await firebase.getFirestore();
    const q = query(collection(db, 'users'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.usersList = [];
      querySnapshot.forEach((doc) => {
        const newUser = {};
        newUser.name = doc.data().firstName ? doc.data().firstName : 'None';
        newUser.onlineStatus = doc.data().lastActiveTime == null ? true : false;
        this.usersList.push(newUser);
      });
      this.renderUserList();
    });
  }

  async changeOnlineStatus() {
    var userStatusDatabaseRef = ref(
      firebase.getDatabase(),
      '/status/' + this.uid
    );
    var isOfflineForDatabase = {
      state: 'offline',
      last_changed: 10,
    };

    var isOnlineForDatabase = {
      state: 'online',
      last_changed: 10,
    };

    const connectedRef = ref(firebase.getDatabase(), '.info/connected');

    const connectedSnapshot = await get(connectedRef);

    if (connectedSnapshot.val() === true) {
      await set(userStatusDatabaseRef, isOnlineForDatabase);
      onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase);
    }
  }

  renderUserList() {
    this.usersList.forEach((element) => {
      this.render(element);
    });
  }

  render(element) {
    const newUser = `<tr class="table-user">
          <td class="table-user__img">
            <div class="table-user__img-block">
              <img src="/images/profile/avatar.svg" alt="Avatar" />
              <span class="online-status ${
                element.onlineStatus
                  ? 'online-status_online'
                  : 'online-status_offline'
              }"></span>
            </div>
          </td>
          <td class="table-user__name">${element.name}</td>
          <td class="table-user__email">emailofcustomer@gmail.com</td>
          <td class="table-user__active">
            <button class="table-user__action-button btn">Message</button>
          </td>
        </tr>`;
    this.tableListBlock.append(newUser);
  }
}

new UsersPage();

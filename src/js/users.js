import $, { get } from 'jquery';
import firebase from './modules/firebase';
import {
  collection,
  setDoc,
  addDoc,
  doc,
  query,
  getDoc,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { ref } from 'firebase/database';
import Profile from './modules/profile';
class UsersPage {
  constructor() {
    this.profile = new Profile();
    this.init();
    this.usersList = [];
    this.tableListBlock = $('.table__body');
  }

  async init() {
    await this.getUsers();
    this.changeOnlineStatus();
    this.bindEvents();
  }

  bindEvents() {
    this.tableListBlock.on('click', '.table-user__action-button', (e) => {
      this.createChat(e.currentTarget.id);
    });
  }

  async createChat(id) {
    console.log(id);
    const db = firebase.getFirestore();
    const newChatMyRef = doc(
      collection(db, 'users', this.profile.user.uid, 'chats'),
      id
    );
    const newChatCompanionRef = doc(
      collection(db, 'users', id, 'chats'),
      this.profile.user.uid
    );
    const newChatRef = collection(db, 'chats');
    let email = '';
    await getDoc(newChatMyRef).then(async (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log(docSnapshot.data());
      } else {
        await getDoc(doc(collection(db, 'users'), id)).then(
          async (docSnapshot) => {
            if (docSnapshot.exists()) {
              email = docSnapshot.data().email;
            }
          }
        );
        const MyChat = {
          email: email,
        };
        const CompanionChat = {
          email: this.profile.user.email,
        };
        const Chat = {
          users: [this.profile.user.uid, id],
          messages: [],
        };
        await addDoc(newChatRef, Chat).then((docRef) => {
          MyChat.chatId = docRef.id;
          CompanionChat.chatId = docRef.id;
        });
        setDoc(newChatMyRef, MyChat);
        setDoc(newChatCompanionRef, CompanionChat);
      }
    });
  }

  async getUsers() {
    this.db = await firebase.getFirestore();
    const q = query(collection(this.db, 'users'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.usersList = [];
      querySnapshot.forEach((doc) => {
        if (doc.id == this.profile.user.uid) {
          return;
        }
        const newUser = {};
        newUser.name = doc.data().firstName ? doc.data().firstName : 'None';
        newUser.onlineStatus = doc.data().lastActiveTime == null ? true : false;
        newUser.email = doc.data().email;
        newUser.id = doc.id;
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
          <td class="table-user__name">User Name</td>
          <td class="table-user__email">${element.email}</td>
          <td class="table-user__active">
            <button id="${
              element.id
            }" class="table-user__action-button btn"><span>Message</span></button>
          </td>
        </tr>`;
    this.tableListBlock.append(newUser);
  }
}

new UsersPage();

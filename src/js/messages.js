import $ from 'jquery';
import firebase from './modules/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import Profile from './modules/profile';
import { onAuthStateChanged } from 'firebase/auth';

class Chat {
  constructor() {
    this.profile = new Profile();
    this.usersListBlock = $('.chat-list__list-users');
    this.currentChat = $('.current-chat');
    this.currentChatBackButton = $('.current-chat__back-button');
    this.page = $('.page');
    this.currentChatMessageBox = $('.current-chat__message-box');
    this.BindEvents();
  }
  BindEvents() {
    this.usersListBlock.on('click', '.chat-list__user', () =>
      this.OpenMessage()
    );
    this.currentChatBackButton.click(() => this.CloseMessage());
    $('.page__main').on('click', '.current-chat__message-send', () => {
      this.SendMessage();
    });
  }
  OpenMessage() {
    this.currentChat.fadeIn(300, () => {
      this.currentChat.css('display', 'flex');
    });
    this.currentChat.addClass('current-chat_open');
    this.page.css('overflow-y', 'hidden');
  }
  SendMessage() {
    const message = {};
    message.text = $('.current-chat__message-input').val();
    if (message == '') {
      return;
    } else {
      const currentDate = new Date();
      message.date = currentDate.getHours() + ':' + currentDate.getMinutes();
      $('.current-chat__message-input').val('');
      this.AddNewMessage(message);
      message.userId = this.profile.user.uid;
      const chatId = window.location.search.replace('?id=', '');
      const db = firebase.getFirestore();
      const newMessageRef = doc(collection(db, 'chats'), chatId);
      updateDoc(newMessageRef, {
        messages: arrayUnion(message),
      });
    }
  }
  CloseMessage() {
    this.currentChat.fadeOut(300, () => {
      this.currentChat.css('display', 'none');
    });
    this.currentChat.removeClass('current-chat_open');
    this.page.css('overflow-y', 'auto');
  }
  AddNewMessage(message) {
    const newMessage = `<div class="current-chat__message current-user-message">
        <div class="current-chat__message-block message-block_text">
         ${message.text}
        </div>
        <div class="current-chat__message-block-time">${message.date}</div>
      </div>`;
    $('.current-chat__message-box').prepend(newMessage);
  }
}

class Message {
  constructor() {
    this.db = firebase.getFirestore();
    this.auth = firebase.getAuth();
    this.Init();
  }
  async Init() {
    onAuthStateChanged(this.auth, async (user) => {
      this.GetChatsRefList();
    });
  }

  async GetChatsRefList() {
    const chatsList = [];

    try {
      const querySnapshot = await getDocs(
        collection(this.db, 'users', this.auth.currentUser.uid, 'chats')
      );

      for (const doc of querySnapshot.docs) {
        const newChat = {};
        newChat.email = doc.data().email;
        newChat.id = doc.data().chatId;

        this.AddChatHtml(newChat);
      }
      return chatsList;
    } catch (error) {
      console.error('Помилка отримання чатів: ', error);
    }
  }

  async GetChatDataByRef(reference) {
    try {
      const docSnapshot = await getDoc(reference);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Помилка отримання конкретного чата: ', error);
    }
  }

  async GetUserInfo(userId) {
    try {
      const userDocRef = doc(this.usersCollection, userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData;
      } else {
        console.log('Користувач не знайдений.');
        return null;
      }
    } catch (error) {
      console.error('Помилка отримання даних користувача: ', error);
      throw error;
    }
  }

  AddChatHtml(chat) {
    let list = '';
    let currentChat = '';
    if (window.location.search.includes(chat.id)) {
      list = `<a class="chat-list__user chat-list__user_active " href="?id=${
        chat.id
      }">
        <div class="chat-list__user-avatar-block">
          <img src="/images/profile/avatar.svg" alt="Avatar" />
        </div>
        <div class="chat-list__user-name">${chat.email.slice(0, 15)}</div>
        <div class="chat-list__user-last-message-time">10 min ago</div>
        <div class="chat-list__user-message-text">
          Message that have been writed...
        </div>
      </a>`;

      currentChat = `<div class="current-chat__user-info">
      <button class="current-chat__back-button">
        <span class="icon-right-arrow"></span>
      </button>
      <div class="current-chat__user-avatar">
        <img src="/images/profile/avatar.svg" alt="Avatar" />
      </div>
      <div class="current-chat__user-name">${chat.email.slice(0, 35)}</div>
      <div class="current-chat__user-status">
        <span class="online-status"></span> Online
      </div>
    </div>
    <div class="current-chat__message-box">
    </div>
    <div class="current-chat__message-input-block">
      <input type="textarea" class="current-chat__message-input" />
      <button class="current-chat__message-send">
        <img src="/images/profile/send.svg" alt="Send" />
      </button>
    </div>`;
    } else {
      list = `<a class="chat-list__user" href="?id=${chat.id}">
        <div class="chat-list__user-avatar-block">
          <img src="/images/profile/avatar.svg" alt="Avatar" />
        </div>
        <div class="chat-list__user-name">${chat.email.slice(0, 15)}</div>
        <div class="chat-list__user-last-message-time">10 min ago</div>
        <div class="chat-list__user-message-text">
          Message that have been writed...
        </div>
      </a>`;
    }

    $('.chat-list__list-users').append(list);
    $('.current-chat').append(currentChat);
  }
}
const message = new Message();

const chat = new Chat();

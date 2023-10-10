import Header from './modules/profileHeader';
import firebase from './modules/firebase';
import { collection, doc, addDoc, getDocs, getDoc } from 'firebase/firestore';
import $ from 'jquery';

const header = new Header();

class Chat {
  constructor() {
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
  }
  OpenMessage() {
    this.currentChat.fadeIn(300, () => {
      this.currentChat.css('display', 'flex');
    });
    this.currentChat.addClass('current-chat_open');
    this.page.css('overflow-y', 'hidden');
  }
  CloseMessage() {
    this.currentChat.fadeOut(300, () => {
      this.currentChat.css('display', 'none');
    });
    this.currentChat.removeClass('current-chat_open');
    this.page.css('overflow-y', 'auto');
  }
}

const chat = new Chat();

class Message {
  constructor() {
    this.db = firebase.getFirestore();
    this.auth = firebase.getAuth();
    this.usersCollection = collection(this.db, 'users');
    this.Init();
  }
  async Init() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user = user;
        const chatsRefList = await this.GetChatsRefList();
        for (const chat of chatsRefList) {
          const chatData = await this.GetChatDataByRef(chat.reference);

          for (const userId of chatData.uid) {
            if (userId !== this.user.uid) {
              const userData = await this.GetUserInfo(userId);
              this.AddChatHtml(userData);
            }
          }
        }
      } else {
        console.log('Користувач не автентифікований.');
      }
    });
  }

  async GetChatsRefList() {
    const chatsList = [];

    try {
      const querySnapshot = await getDocs(
        collection(doc(this.usersCollection, this.user.uid), 'chats')
      );

      for (const doc of querySnapshot.docs) {
        chatsList.push(doc.data());
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

  AddChatHtml(userData) {
    const template = `<a class="chat-list__user" href="#">
        <div class="chat-list__user-avatar-block">
          <img src="/images/profile/avatar.svg" alt="Avatar" />
        </div>
        <div class="chat-list__user-name">${userData.firstName} ${userData.lastName}</div>
        <div class="chat-list__user-last-message-time">10 min ago</div>
        <div class="chat-list__user-message-text">
          Message that have been writed...
        </div>
      </a>`;
    $('.chat-list__list-users').append(template);
  }

  NewChat() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        const uidUser2 = 'FoiZHEchOXQqVPKJ2FTuLaZ88nh2';
        const folderName = `${uid}_${uidUser2}`;

        await addDoc(collection(this.db, 'chats'), {
          name: 'chat',
          uid: [uid, uidUser2],
        });
        console.log(uid);
      } else {
        console.log('Користувач не автентифікований.');
      }
    });
  }
}
const message = new Message();

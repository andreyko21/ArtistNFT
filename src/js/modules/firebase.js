import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCQdQY3D9G60qB3PCBhtCz-W7YynZJQzSU',
  authDomain: 'artistnft.firebaseapp.com',
  projectId: 'artistnft',
  storageBucket: 'artistnft.appspot.com',
  messagingSenderId: '1090475560828',
  appId: '1:1090475560828:web:3ff50b4eb39bbcacd45ef9',
};

class Firebase {
  constructor() {
    if (!Firebase.instance) {
      this.app = initializeApp(firebaseConfig);
      Firebase.instance = this;
    }

    return Firebase.instance;
  }

  getAuth() {
    return getAuth(this.app);
  }

  getFirestore() {
    return getFirestore(this.app);
  }

  getDatabase() {
    return getDatabase(this.app);
  }
}

const firebase = new Firebase();

export default firebase;

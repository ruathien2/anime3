import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC2PX7bXTAdUd6DFVChBeXvEBEO-1Gl21s',
  authDomain: 'tutorial-63348.firebaseapp.com',
  projectId: 'tutorial-63348',
  storageBucket: 'tutorial-63348.appspot.com',
  messagingSenderId: '453997685428',
  appId: '1:453997685428:web:aa41d27d9ed93d377185e1',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();

export const storage = getStorage(app);

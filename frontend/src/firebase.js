import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB9jYGbJmv5iOYvJpX01a1lXEBfPfonZXY',
  authDomain: 'scholarship-d8b94.firebaseapp.com',
  projectId: 'scholarship-d8b94',
  storageBucket: 'scholarship-d8b94.appspot.com',
  messagingSenderId: '888325806377',
  appId: '1:888325806377:web:cf97894e882c096f13bf38',
  measurementId: 'G-FXBTWHRTYB'
})

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBx8f4QTLt1iKXSAvd2U3GQidxv1lXQbwk',
  authDomain: 'under-18-85f46.firebaseapp.com',
  projectId: 'under-18-85f46',
  storageBucket: 'under-18-85f46.appspot.com',
  messagingSenderId: '822728177425',
  appId: '1:822728177425:web:6ce9ee4bb7175d8087beb0',
};
// Initialize Firebase
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();

import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore' // add this to use Firestore
import { reactReduxFirebase, firebaseReducer, createFirestoreConnect } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'


var config = {
  apiKey: "AIzaSyCCrXyzLZiFIbEfeHzhAFOAjz2pYRqg29M",
  authDomain: "parts-library-playground.firebaseapp.com",
  databaseURL: "https://parts-library-playground.firebaseio.com",
  projectId: "parts-library-playground",
  storageBucket: "parts-library-playground.appspot.com",
  messagingSenderId: "860582264453"
}

firebase.initializeApp(config)

let firedb = firebase.firestore();

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const initialState = {
  store:{
    bulkSelectionMode:false,
    collectionSelected:'All Parts',
    username:'Test User',
    //partsSelected:[],
    //currentPage:1
  }
}

const rrfConfig = {
  userProfile: 'users',
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
)(createStore);

const rootFireReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  store: rootReducer
})

const store = createStoreWithFirebase(rootFireReducer, initialState);

console.log(firedb.collection('parts').doc('4cAn5WllZ4ung9cgmOj8'));

export {store};

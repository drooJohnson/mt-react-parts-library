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

const initialState = {
  store:{
    bulkSelectionMode:false,
    collection:{
      Name:'',
      Parts:undefined,
      id:''
    },
    username:'Test User',
    showModal:true,
    //partsSelected:[],
    //currentPage:1
  }
}

const username = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

function collection (state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_COLLECTION':
      return action.collection
    case 'CLEAR_SELECTION':
      return initialState.store.collection
    default:
      return state
  }
}

function bulkSelectionMode (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function showModal (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const storeReducer = combineReducers({
  bulkSelectionMode, collection, username, showModal
})


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
  store: storeReducer
})

const store = createStoreWithFirebase(rootFireReducer, initialState);

console.log(firedb.collection('parts').doc('4cAn5WllZ4ung9cgmOj8'));

export {store};

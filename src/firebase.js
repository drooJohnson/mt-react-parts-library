import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore' // add this to use Firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import zIndex from './utils/z-index'


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

const initialScrim = {
  display:'false',
  opacity:0,
  color:'dark',
  zIndex:'high',
}

const initialCollection = {
  Name:'',
  Parts:undefined,
  id:''
}

const initialModal = {
  type:null
}

const initialState = {
  store:{
    bulkSelectionMode: false,
    collection: initialCollection,
    username: 'Test User',
    modal: initialModal,
    scrim: initialScrim
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
      return initialCollection
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

function modal (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return Object.assign({}, state, { type: action.modalType })
    case 'HIDE_MODAL':
      return initialModal
    default:
      return state;
  }
}

function scrim (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SCRIM':
      return Object.assign({}, state, action.scrim, {display:'true'})
    case 'HIDE_SCRIM':
      return Object.assign({}, state, {opacity:0,display:'false'})
    default:
      return state;
  }
}

const storeReducer = combineReducers({
  bulkSelectionMode, collection, username, modal, scrim
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

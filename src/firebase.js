import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore' // add this to use Firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

import bulkSelectionModeReducer from './redux/reducers/bulk-selection-mode';
import collectionReducer from './redux/reducers/collection';
import usernameReducer from './redux/reducers/username';
import modalReducer from './redux/reducers/modal';
import scrimReducer from './redux/reducers/scrim';
import libraryLayoutReducer from './redux/reducers/library-layout';


var config = {
  apiKey: "AIzaSyCCrXyzLZiFIbEfeHzhAFOAjz2pYRqg29M",
  authDomain: "parts-library-playground.firebaseapp.com",
  databaseURL: "https://parts-library-playground.firebaseio.com",
  projectId: "parts-library-playground",
  storageBucket: "parts-library-playground.appspot.com",
  messagingSenderId: "860582264453"
}

firebase.initializeApp(config)

firebase.firestore();

const initialState = {
  store:{
    bulkSelectionMode: false,
    collection: {
      Name:'',
      Parts:undefined,
      id:''
    },
    username: 'Test User',
    modal: {type:null},
    scrim: {
      display:'false',
      opacity:0,
      color:'dark',
      zIndex:'high',
    },
    libraryLayout:'list'
  }
}

const storeReducer = combineReducers({
  bulkSelectionMode:bulkSelectionModeReducer,
  collection:collectionReducer,
  username:usernameReducer,
  modal:modalReducer,
  scrim:scrimReducer,
  libraryLayout:libraryLayoutReducer,
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

export {store};

import firebase from 'firebase'
require('firebase/firestore')

var config = {
  apiKey: "AIzaSyCCrXyzLZiFIbEfeHzhAFOAjz2pYRqg29M",
  authDomain: "parts-library-playground.firebaseapp.com",
  databaseURL: "https://parts-library-playground.firebaseio.com",
  projectId: "parts-library-playground",
  storageBucket: "parts-library-playground.appspot.com",
  messagingSenderId: "860582264453"
}

firebase.initializeApp(config)

const db = firebase.firestore();

const partsRef = db.collection('parts');
const collectionsRef = db.collection('collections');

/* Example GETters */
/*
let getParts = () => {
  var partsArr = [];
  partsRef.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data     = doc.data();
            data.key = doc.id;
      partsArr.push(data);
      console.log(data);
    })
    console.log(partsArr);
    return(partsArr);
  })
}

let getCollections = () => {
  var collectionsArr = [];
  collectionsRef.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data     = doc.data();
            data.key = doc.id;
      collectionsArr.push(data);
      console.log(data);
    })
    console.log(collectionsArr);
    return(collectionsArr);
  })
}
*/
export { db, partsRef, collectionsRef };


const admin = require('../node_modules/firebase-admin');
const serviceAccount = require("./service-key.json");
const argv = require('../node_modules/minimist')(process.argv.slice(2));
const dataStr = ( argv.data.endsWith(".json") ? "./" + argv.data : "./" + argv.data + ".json" );
const data = require(dataStr);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://parts-library-playground.firebaseio.com"
});

data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            admin.firestore()
                .collection(key)
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
    }
});

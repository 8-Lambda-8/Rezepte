import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// admin.initializeApp();
// const db = new admin.firestore.Firestore;

const ServerRegion = 'europe-west3';

export const onDeleteUser = functions
    .region(ServerRegion)
    .auth.user().onDelete(async (user) => {
        console.log(user);
    });
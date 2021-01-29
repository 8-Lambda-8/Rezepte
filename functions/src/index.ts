import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();
const db = new admin.firestore.Firestore;

const ServerRegion = 'europe-west3';

export const onCreateUser = functions
    .region(ServerRegion)
    .auth.user().onCreate(async (user) => {

        functions.logger.info("Create DB for " + user.uid + " " + user.email);
        
        // tslint:disable-next-line:no-unsafe-any
        db.collection("users").doc(user.uid).create({
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            permissionClass: 0, //0: no; 1: read; 2: user; 3: write; 4: admin
        }).catch(err => console.log(err));

    });

export const onDeleteUser = functions
    .region(ServerRegion)
    .auth.user().onDelete(async (user) => {
        console.log(user);
    });

export const getRandomRecipe = functions
    .region(ServerRegion)
    .https.onCall(async (data, context) => {

        const snap = await db.collection("recipes").get()
        const random = Math.floor(Math.random() * snap.docs.length);        

        return snap.docs[random].id
        
    });

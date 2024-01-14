import admin from  'firebase-admin'

admin.initializeApp({
    credential: admin.credential.cert('./firebase.json'),
    storageBucket: 'taskade-318da.appspot.com'
});


export const bucket = admin.storage().bucket();
import { admin } from  'firebase-admin'

const serviceAccount = require('./firebase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'taskade-318da.appspot.com'
});


export const bucket = admin.storage().bucket();
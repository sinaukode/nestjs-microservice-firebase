

const config = { apiKey: process.env.API_KEY_FB};


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const fb = firebase.initializeApp(config);
const auth = fb.auth();

export { auth };

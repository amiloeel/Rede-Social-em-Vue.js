import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCrK7S8FrqInQqG_Nwx9d3Yd6X7feabtzU",
    authDomain: "vndergrovnd-40be7.firebaseapp.com",
    projectId: "vndergrovnd-40be7",
    storageBucket: "vndergrovnd-40be7.appspot.com",
    messagingSenderId: "704363308870",
    appId: "1:704363308870:web:60499cb561395a1a2f2747",
    measurementId: "G-G36XPT1XK8"
  };

Firebase.initializeApp(firebaseConfig)
export const firestore = Firebase.firestore()
export const auth = Firebase.auth() 
export const providerGoogle = new Firebase.auth.GoogleAuthProvider()
export const timestamp = Firebase.firestore.FieldValue.serverTimestamp()
export const storage = Firebase.storage()
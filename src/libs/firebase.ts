// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgS4EPfSrWzIFXECU2gq0ig9e1612Ps-k",
    authDomain: "brainster-final-proj-mario-m.firebaseapp.com",
    projectId: "brainster-final-proj-mario-m",
    storageBucket: "brainster-final-proj-mario-m.appspot.com",
    messagingSenderId: "20092416087",
    appId: "1:20092416087:web:ee68617fb680cfac6c7312"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

googleAuthProvider.setCustomParameters({
    prompt: "select_account ",
})

export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleAuthProvider)

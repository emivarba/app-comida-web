// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQEixfaeXok-zUES3jiltOh3Wew-3xTQg",
    authDomain: "app-comidas-69c44.firebaseapp.com",
    databaseURL: "https://app-comidas-69c44-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "app-comidas-69c44",
    storageBucket: "app-comidas-69c44.firebasestorage.app",
    messagingSenderId: "560473294555",
    appId: "1:560473294555:web:f085cd55ba2468bb7a2efe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
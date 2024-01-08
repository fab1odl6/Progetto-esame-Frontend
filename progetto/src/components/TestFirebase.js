// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNXZmeHsadCc6Agt8n2HtalYrbInaja9o",
    authDomain: "progetto-frontend.firebaseapp.com",
    databaseURL: "https://progetto-frontend-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "progetto-frontend",
    storageBucket: "progetto-frontend.appspot.com",
    messagingSenderId: "773514434333",
    appId: "1:773514434333:web:f28568ecb73853fd1233f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebaseConfig };
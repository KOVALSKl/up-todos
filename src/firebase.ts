import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZ8ZIJq6fi6cB4GlF1gGNRihYq2NI8a-A",
    authDomain: "todos-app-39c36.firebaseapp.com",
    projectId: "todos-app-39c36",
    storageBucket: "todos-app-39c36.appspot.com",
    messagingSenderId: "811295391805",
    appId: "1:811295391805:web:dd570aa8de8aa85940ea54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
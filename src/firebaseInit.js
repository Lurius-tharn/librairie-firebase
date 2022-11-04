

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";



const firebaseConfig = {

    apiKey: "AIzaSyBRRQlYziLc8EusWFMxNAtky7r1hdu4S4A",

    authDomain: "library-f89c1.firebaseapp.com",

    projectId: "library-f89c1",

    storageBucket: "library-f89c1.appspot.com",
    databaseURL:"https://library-f89c1.firebaseio.com",


    messagingSenderId: "607474396026",

    appId: "1:607474396026:web:be92d830ceb0d61f5304c3",

    measurementId: "G-V3Z87E2ZRX"

};


// Initialize Firebase

 const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app)


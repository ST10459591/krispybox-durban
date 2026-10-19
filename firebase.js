import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWLgCYIewnTMtlzJ__X2awukGMDIL5Kvc",
  authDomain: "krispybox2.firebaseapp.com",
  projectId: "krispybox2",
  storageBucket: "krispybox2.firebasestorage.app",
  messagingSenderId: "16984870834",
  appId: "1:16984870834:web:a063bf6906d27c99879eab",
  measurementId: "G-4QYJLHWH91"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
  VITE_REACT_FIREBASE_API,
  VITE_REACT_FIREBASE_AUTHDOMAIN,
  VITE_REACT_FIREBASE_PROJECTID,
  VITE_REACT_FIREBASE_STORAGE_BUCKET,
  VITE_REACT_FIREBASE_MESSAGINGSENDERID,
  VITE_REACT_FIREBASE_APPID,
} = import.meta.env;

const fbCreds = {
  apiKey: VITE_REACT_FIREBASE_API,
  appId: VITE_REACT_FIREBASE_APPID,
  authDomain: VITE_REACT_FIREBASE_AUTHDOMAIN,
  messagingSenderId: VITE_REACT_FIREBASE_MESSAGINGSENDERID,
  projectId: VITE_REACT_FIREBASE_PROJECTID,
  storageBucket: VITE_REACT_FIREBASE_STORAGE_BUCKET,
};

const fbApp = initializeApp(fbCreds);

const fbAuth = getAuth(fbApp);
const fbStore = getFirestore(fbApp);

export { fbStore, fbAuth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.React_APP_API_KEY,
  authDomain: process.env.React_APP_AUTH_DOMAIN,
  projectId: process.env.React_APP_PROJECT_ID,
  storageBucket: process.env.React_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.React_APP_MESSAGING_SENDER_ID,
  appId: process.env.React_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
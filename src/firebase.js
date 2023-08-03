// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDut8J9iC7f5ZKiIdQjJkBd9UA5w8xzDpg",
  authDomain: "ai-tutor-2774e.firebaseapp.com",
  projectId: "ai-tutor-2774e",
  storageBucket: "ai-tutor-2774e.appspot.com",
  messagingSenderId: "847155556022",
  appId: "1:847155556022:web:7a05ed6fc1639fd5ba4017",
  measurementId: "G-0N7PEG39PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();  // Initialize auth
export { auth };  // Export auth
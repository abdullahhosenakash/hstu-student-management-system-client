import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_Api_Key,
  //   apiKey: "AIzaSyBcDVW5g9V0FkzUD7ovvrniLVI6K7vs_L0",
  authDomain: process.env.REACT_APP_Auth_Domain,
  projectId: process.env.REACT_APP_Project_Id,
  storageBucket: process.env.REACT_APP_Storage_Bucket,
  messagingSenderId: process.env.REACT_APP_Messaging_Sender_Id,
  appId: process.env.REACT_APP_App_Id,
};
console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);

export default auth;

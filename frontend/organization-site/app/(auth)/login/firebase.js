import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  localStorage.setItem("Notification_permit", permission);
  
  if (permission !== "granted") {
    return null;
  }

  try {
    const fcmToken = await getToken(messaging, {
      vapidKey: process.env.FIREBASE_VAPID_KEY,
    });
    return fcmToken;
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
    return null;
  }
}

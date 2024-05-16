import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

let messaging;

if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  
  const firebase = initializeApp(firebaseConfig);
  messaging = getMessaging(firebase);
} else {
  console.error('Firebase Messaging initialization skipped in non-browser environment.');
}


export const generateToken = async () => {
  if (typeof window !== 'undefined') {
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
  } else {
    console.error('Cannot request permission in non-browser context.');
    return null;
  }
}

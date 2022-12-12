import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
  isSupported,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging-sw.js";
const firebaseApp = initializeApp({
  projectId: "instvgrvm-742ef",
  appId: "1:332944972727:web:11f0078a2c05bc8249a632",
  storageBucket: "instvgrvm-742ef.appspot.com",
  apiKey: "AIzaSyADVlfDb0B0CLjQza8qM4VYuJR8D5Oopjg",
  authDomain: "instvgrvm-742ef.firebaseapp.com",
  messagingSenderId: "332944972727",
  measurementId: "G-RJF5RT8Z8G",
});
const messaging = getMessaging(firebaseApp);
isSupported()
  .then((isSupported) => {
    if (isSupported) {
      onBackgroundMessage(
        messaging,
        ({ notification: { title, body, image } }) => {
          self.registration.showNotification(title, {
            body,
            icon: image || "/assets/icons/icon-72x72.png",
          });
        }
      );
    }
  })
  .catch((error) => {
    console.log(error);
  });

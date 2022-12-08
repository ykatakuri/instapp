import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
  isSupported,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging-sw.js";
const firebaseApp = initializeApp({
  projectId: "instapp-16290",
  appId: "1:130667945369:web:1ff13f7ed0879fa2acc708",
  storageBucket: "instapp-16290.appspot.com",
  apiKey: "AIzaSyB577iKiKJRf_4WIEHQEH5wx7vndIw--wE",
  authDomain: "instapp-16290.firebaseapp.com",
  messagingSenderId: "130667945369",
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

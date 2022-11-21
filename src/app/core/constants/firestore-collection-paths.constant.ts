export interface FirebaseMessage {
  value: string;
  translation: string;
}

export const FIREBASE_MESSAGES: FirebaseMessage[] = [
  {
    value: "auth/user-not-found",
    translation: "L'adresse email n'existe pas.",
  },
  {
    value: "auth/email-already-in-use",
    translation: "Un utilisateur existe déjà avec cette adresse email.",
  },
  {
    value: "auth/wrong-password",
    translation: "Le mot de passe est incorrect.",
  },
];

export const FIREBASE_COLLECTION_PATHS = {
  CHATS: "chat",
  LISTECHAT: "listeChat",
  MSN: "msn",
}

import { Timestamp } from "firebase/firestore"

export interface AppPost {
  date: Timestamp,
  title: string,
  idUser: string,
  picture : string
  description: string
}

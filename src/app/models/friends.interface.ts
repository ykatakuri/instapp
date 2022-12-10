import { DocumentReference } from "firebase/firestore";

export interface Friends {
    id?:string;
    asker: DocumentReference;
    receiver: DocumentReference;
    accepted: Boolean;
}

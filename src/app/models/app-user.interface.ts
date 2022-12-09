import { DocumentReference } from "firebase/firestore";

export interface AppUser {
    id:string;
    firstname: string;
    lastname: string;
    email: string;
    picture:string;
    subs: DocumentReference[];
}


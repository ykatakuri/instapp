import { DocumentReference } from "@angular/fire/firestore";

export interface ListeChat {
  id: string;
  userReferences: DocumentReference[];
}

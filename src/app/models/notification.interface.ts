import { DocumentReference } from "firebase/firestore";

enum StatusEnum {
  Sent = 1,
  Progress = 2,
  Closed = 3
}

export interface AppNotification {
  id?: string;
  refId:DocumentReference;
  userId:DocumentReference;
  text:string;
  refType:string;
  status:StatusEnum;
}

import { Post } from "./post.interface";

export interface User {
  id: string;
  name: string;
  firstname: string;
  mail: string;
  friendsId : string[];
  posts : Post[];
}

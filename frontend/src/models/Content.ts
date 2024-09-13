import { ContentType } from "./ContentType";
import { Topic } from "./Topic";
import { User } from "./User";

export interface Content {
    _id: string;
    title: string;
    type: ContentType; 
    author: User;
    topic: Topic;
    url: string;
  }
  
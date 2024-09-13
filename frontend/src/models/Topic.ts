import { ContentType } from "./ContentType";

export interface Topic {
    _id: Key | null | undefined;
    name: string; 
    allowedContentTypes: ContentType[];
}
  
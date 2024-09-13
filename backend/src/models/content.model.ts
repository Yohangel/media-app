import { Schema, model, Types } from 'mongoose';

interface Content {
  type: Types.ObjectId;
  title: string;
  url: string;
  author: Types.ObjectId;
  topic: Types.ObjectId;
}

const contentSchema = new Schema<Content>({
  type: { type: Schema.Types.ObjectId, ref: 'ContentType', required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
});

const ContentModel = model<Content>('Content', contentSchema);

export { ContentModel, Content };
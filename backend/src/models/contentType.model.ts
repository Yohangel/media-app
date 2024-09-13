import { Schema, model } from 'mongoose';

interface ContentType {
  name: string;
  createdAt: Date;
}

const contentTypeSchema = new Schema<ContentType>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ContentTypeModel = model<ContentType>('ContentType', contentTypeSchema);

export { ContentTypeModel, ContentType };
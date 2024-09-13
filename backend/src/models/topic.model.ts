import { Schema, model, Types } from 'mongoose';

interface Topic {
  name: string;
  allowedContentTypes: Types.ObjectId[];  
  createdAt: Date;
}

const topicSchema = new Schema<Topic>({
  name: { type: String, required: true,  },
  allowedContentTypes: [{ type: Schema.Types.ObjectId, ref: 'ContentType' }],
  createdAt: { type: Date, default: Date.now }
});

const TopicModel = model<Topic>('Topic', topicSchema);

export { TopicModel, Topic };

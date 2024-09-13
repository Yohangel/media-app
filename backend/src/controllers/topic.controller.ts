import { Request, Response } from 'express';
import { TopicModel } from '@/models/topic.model';
import { ContentTypeModel } from '@/models/contentType.model';

export const createTopic = async (req: Request, res: Response) => {
  try {
    const { name, allowedContentTypes } = req.body;

    const existingTopic = await TopicModel.findOne({ name });
    if (existingTopic) {
      return res.status(400).json({ error: 'Topic name must be unique.' });
    }

    const validContentTypes = await ContentTypeModel.find({ _id: { $in: allowedContentTypes } });
    if (validContentTypes.length !== allowedContentTypes.length) {
      return res.status(400).json({ error: 'Invalid content types.' });
    }

    const topic = new TopicModel({ name, allowedContentTypes });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await TopicModel.find().populate('allowedContentTypes');
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const topic = await TopicModel.findById(req.params.id).populate('allowedContentTypes');
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTopic = async (req: Request, res: Response) => {
  try {
    const { name, allowedContentTypes } = req.body;

    const existingTopic = await TopicModel.findOne({ name });
    if (existingTopic) {
      return res.status(400).json({ error: 'Topic name must be unique.' });
    }
    
    const validContentTypes = await ContentTypeModel.find({ _id: { $in: allowedContentTypes } });

    if (validContentTypes.length !== allowedContentTypes.length) {
      return res.status(400).json({ error: 'Invalid content types.' });
    }

    const topic = await TopicModel.findByIdAndUpdate(
      req.params.id,
      { name, allowedContentTypes },
      { new: true }
    );
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTopic = async (req: Request, res: Response) => {
  try {
    const topic = await TopicModel.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.status(204).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

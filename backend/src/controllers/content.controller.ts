import { Request, Response } from 'express';
import { ContentModel } from '@/models/content.model';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/jwt.d';
import { ContentTypeModel } from '@/models/contentType.model';
import { TopicModel } from '@/models/topic.model';

export const createContent = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const authorId = decoded._id;

    let url: string | undefined;

    if (req.file) {
      const fullUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`; 
      url = fullUrl; 
    } else if (req.body.url) {
      url = req.body.url; 
    } else {
      return res.status(400).json({ error: 'No file or URL provided' });
    }
  

    const content = new ContentModel({
      title: req.body.title,
      type: req.body.type,
      url: url,
      author: authorId, 
      topic: req.body.topic,
      createdAt: new Date()
    });

    await content.save();
    res.status(201).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create content' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const authorId = decoded._id;

    const existingContent = await ContentModel.findById(req.params.id);
    if (!existingContent) return res.status(404).json({ error: 'Content not found' });

    let url = existingContent.url;
    if (req.file) {
      const fullUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`; 
      url = fullUrl; 
    } else if (req.body.url) {
      url = req.body.url; 
    } else {
      return res.status(400).json({ error: 'No file or URL provided' });
    }
  

    const updatedContent = await ContentModel.findByIdAndUpdate(
      req.params.id,
      {
        type: req.body.type,
        url: url,
        author: authorId,
        topic: req.body.topic,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedContent) return res.status(404).json({ error: 'Content not found' });

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

export const getAllContent = async (req: Request, res: Response) => {
  try {
    const { type, topic } = req.query;

    const filter: any = {};

    if (type) {
      const typeMatches = await ContentTypeModel.find({ name: new RegExp(type as string, 'i') });
      if (typeMatches.length > 0) {
        filter.type = { $in: typeMatches.map(type => type._id) };
      } else {
        return res.status(404).json({ error: 'No matching type found' });
      }
    }

    if (topic) {
      const topicMatches = await TopicModel.find({ name: new RegExp(topic as string, 'i') });  
      if (topicMatches.length > 0) {
        filter.topic = { $in: topicMatches.map(topic => topic._id) };
      } else {
        return res.status(404).json({ error: 'No matching topic found' });
      }
    }

    const content = await ContentModel.find(filter)
      .populate('author', 'username') 
      .populate('topic', 'name') 
      .populate('type', 'name')
      .sort({ type: 1, topic: 1 });

    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const content = await ContentModel.findById(req.params.id)
    .populate('author', 'username') 
    .populate('topic', 'name') 
    .populate('type', 'name');

    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const content = await ContentModel.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ error: 'Content not found' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
};

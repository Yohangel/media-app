import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from './models/user.model';
import { RoleModel } from './models/role.model';
import { ContentModel } from './models/content.model';
import { TopicModel } from './models/topic.model';
import { ContentTypeModel } from './models/contentType.model';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scalableMediaApp'; 

export const seedDatabase = async () => {
  try {
    // Check if we're not in test mode
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.connect(MONGODB_URI);
    }

    // Clear existing collections
    await Promise.all([
      UserModel.deleteMany({}),
      RoleModel.deleteMany({}),
      ContentModel.deleteMany({}),
      TopicModel.deleteMany({}),
      ContentTypeModel.deleteMany({})
    ]);

    // Create Content Types
    const contentTypes = await ContentTypeModel.insertMany([
      { name: 'Image', createdAt: new Date() },
      { name: 'Video', createdAt: new Date() },
      { name: 'Text', createdAt: new Date() }
    ]);
    // Create Roles
    const roles = await RoleModel.insertMany([
      { 
        name: 'admin', 
        createdAt: new Date() 
      },
      { 
        name: 'editor', 
        createdAt: new Date() 
      },
      { 
        name: 'viewer', 
        createdAt: new Date() 
      }
    ]);

    // Create Topics
    const topics = await TopicModel.insertMany([
      { 
        name: 'Tech', 
        allowedContentTypes: [contentTypes[0]._id, contentTypes[1]._id], 
        createdAt: new Date() 
      },
      { 
        name: 'Lifestyle', 
        allowedContentTypes: [contentTypes[0]._id], 
        createdAt: new Date() 
      },
      { 
        name: 'Sports', 
        allowedContentTypes: [contentTypes[0]._id,contentTypes[1]._id,contentTypes[2]._id], 
        createdAt: new Date() 
      },
      { 
        name: 'News', 
        allowedContentTypes: [contentTypes[2]._id], 
        createdAt: new Date() 
      }
    ]);

    // Create Users with hashed passwords
    const hashedPasswords = await Promise.all([
      bcrypt.hash('admin123', 10),
      bcrypt.hash('editor123', 10),
      bcrypt.hash('viewer123', 10)
    ]);

    await UserModel.insertMany([
      { 
        username: 'admin', 
        email: 'admin@example.com', 
        password: hashedPasswords[0], 
        role: roles[0]._id, 
        createdAt: new Date() 
      },
      { 
        username: 'editor', 
        email: 'editor@example.com', 
        password: hashedPasswords[1], 
        role: roles[1]._id, 
        createdAt: new Date() 
      },
      { 
        username: 'viewer', 
        email: 'viewer@example.com', 
        password: hashedPasswords[2], 
        role: roles[2]._id, 
        createdAt: new Date() 
      }
    ]);

    // Create Content
    const adminUser = await UserModel.findOne({ username: 'admin' });
    const editorUser = await UserModel.findOne({ username: 'editor' });

    await ContentModel.insertMany([
      {
        title: 'Image 1',
        type: contentTypes[0]._id, 
        url: 'https://example.com/image1.jpg', 
        author: adminUser?._id, 
        topic: topics[0]._id, 
        createdAt: new Date() 
      },
      { 
        title: 'Video 1',
        type: contentTypes[1]._id, 
        url: 'https://example.com/video1.mp4', 
        author: editorUser?._id, 
        topic: topics[1]._id, 
        createdAt: new Date() 
      }
    ]);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Close the Mongoose connection after the seeding is done
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.disconnect();
    }
  }
};

// Execute seeding
seedDatabase();

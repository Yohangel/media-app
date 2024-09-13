"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./models/user.model");
const role_model_1 = require("./models/role.model");
const content_model_1 = require("./models/content.model");
const topic_model_1 = require("./models/topic.model");
const contentType_model_1 = require("./models/contentType.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scalableMediaApp';
const seedDatabase = async () => {
    try {
        // Check if we're not in test mode
        if (process.env.NODE_ENV !== 'test') {
            await mongoose_1.default.connect(MONGODB_URI);
        }
        // Clear existing collections
        await Promise.all([
            user_model_1.UserModel.deleteMany({}),
            role_model_1.RoleModel.deleteMany({}),
            content_model_1.ContentModel.deleteMany({}),
            topic_model_1.TopicModel.deleteMany({}),
            contentType_model_1.ContentTypeModel.deleteMany({})
        ]);
        // Create Content Types
        const contentTypes = await contentType_model_1.ContentTypeModel.insertMany([
            { name: 'Image', createdAt: new Date() },
            { name: 'Video', createdAt: new Date() }
        ]);
        // Create Roles
        const roles = await role_model_1.RoleModel.insertMany([
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
        const topics = await topic_model_1.TopicModel.insertMany([
            {
                name: 'Tech',
                allowedContentTypes: [contentTypes[0]._id, contentTypes[1]._id],
                createdAt: new Date()
            },
            {
                name: 'Lifestyle',
                allowedContentTypes: [contentTypes[0]._id],
                createdAt: new Date()
            }
        ]);
        // Create Users with hashed passwords
        const hashedPasswords = await Promise.all([
            bcrypt_1.default.hash('admin123', 10),
            bcrypt_1.default.hash('editor123', 10),
            bcrypt_1.default.hash('viewer123', 10)
        ]);
        await user_model_1.UserModel.insertMany([
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
        const adminUser = await user_model_1.UserModel.findOne({ username: 'admin' });
        const editorUser = await user_model_1.UserModel.findOne({ username: 'editor' });
        await content_model_1.ContentModel.insertMany([
            {
                type: contentTypes[0]._id,
                url: 'https://example.com/image1.jpg',
                author: adminUser?._id,
                topic: topics[0]._id,
                createdAt: new Date()
            },
            {
                type: contentTypes[1]._id,
                url: 'https://example.com/video1.mp4',
                author: editorUser?._id,
                topic: topics[1]._id,
                createdAt: new Date()
            }
        ]);
    }
    catch (error) {
        console.error('Error seeding the database:', error);
    }
    finally {
        // Close the Mongoose connection after the seeding is done
        if (process.env.NODE_ENV !== 'test') {
            await mongoose_1.default.disconnect();
        }
    }
};
exports.seedDatabase = seedDatabase;
// Execute seeding
(0, exports.seedDatabase)();

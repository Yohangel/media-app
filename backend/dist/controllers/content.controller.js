"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getContentById = exports.getAllContent = exports.updateContent = exports.createContent = void 0;
const content_model_1 = require("@/models/content.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createContent = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return res.status(401).json({ error: 'No token provided' });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const authorId = decoded._id;
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const content = new content_model_1.ContentModel({
            type: req.body.type,
            url: req.file.path, // La URL del archivo subido
            author: authorId,
            topic: req.body.topic,
            createdAt: new Date()
        });
        await content.save();
        res.status(201).json(content);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create content' });
    }
};
exports.createContent = createContent;
const updateContent = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return res.status(401).json({ error: 'No token provided' });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const authorId = decoded._id;
        const existingContent = await content_model_1.ContentModel.findById(req.params.id);
        if (!existingContent)
            return res.status(404).json({ error: 'Content not found' });
        let filePath = existingContent.url;
        if (req.file) {
            filePath = req.file.path;
        }
        const updatedContent = await content_model_1.ContentModel.findByIdAndUpdate(req.params.id, {
            type: req.body.type,
            url: filePath,
            author: authorId,
            topic: req.body.topic,
            updatedAt: new Date()
        }, { new: true });
        if (!updatedContent)
            return res.status(404).json({ error: 'Content not found' });
        res.status(200).json(updatedContent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update content' });
    }
};
exports.updateContent = updateContent;
const getAllContent = async (req, res) => {
    try {
        const { type, topic } = req.query;
        const filter = {};
        if (type)
            filter.type = type;
        if (topic)
            filter.topic = topic;
        const content = await content_model_1.ContentModel.find(filter).sort({ type: 1, topic: 1 });
        res.status(200).json(content);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
};
exports.getAllContent = getAllContent;
const getContentById = async (req, res) => {
    try {
        const content = await content_model_1.ContentModel.findById(req.params.id);
        if (!content)
            return res.status(404).json({ error: 'Content not found' });
        res.status(200).json(content);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
};
exports.getContentById = getContentById;
const deleteContent = async (req, res) => {
    try {
        const content = await content_model_1.ContentModel.findByIdAndDelete(req.params.id);
        if (!content)
            return res.status(404).json({ error: 'Content not found' });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete content' });
    }
};
exports.deleteContent = deleteContent;

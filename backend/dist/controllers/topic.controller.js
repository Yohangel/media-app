"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTopic = exports.updateTopic = exports.getTopicById = exports.getTopics = exports.createTopic = void 0;
const topic_model_1 = require("@/models/topic.model");
const contentType_model_1 = require("@/models/contentType.model");
const createTopic = async (req, res) => {
    try {
        const { name, allowedContentTypes } = req.body;
        const existingTopic = await topic_model_1.TopicModel.findOne({ name });
        if (existingTopic) {
            return res.status(400).json({ error: 'Topic name must be unique.' });
        }
        const validContentTypes = await contentType_model_1.ContentTypeModel.find({ _id: { $in: allowedContentTypes } });
        if (validContentTypes.length !== allowedContentTypes.length) {
            return res.status(400).json({ error: 'Invalid content types.' });
        }
        const topic = new topic_model_1.TopicModel({ name, allowedContentTypes });
        await topic.save();
        res.status(201).json(topic);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createTopic = createTopic;
const getTopics = async (req, res) => {
    try {
        const topics = await topic_model_1.TopicModel.find().populate('allowedContentTypes');
        res.status(200).json(topics);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getTopics = getTopics;
const getTopicById = async (req, res) => {
    try {
        const topic = await topic_model_1.TopicModel.findById(req.params.id).populate('allowedContentTypes');
        if (!topic)
            return res.status(404).json({ error: 'Topic not found' });
        res.status(200).json(topic);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getTopicById = getTopicById;
const updateTopic = async (req, res) => {
    try {
        const { name, allowedContentTypes } = req.body;
        const existingTopic = await topic_model_1.TopicModel.findOne({ name });
        if (existingTopic) {
            return res.status(400).json({ error: 'Topic name must be unique.' });
        }
        const validContentTypes = await contentType_model_1.ContentTypeModel.find({ _id: { $in: allowedContentTypes } });
        if (validContentTypes.length !== allowedContentTypes.length) {
            return res.status(400).json({ error: 'Invalid content types.' });
        }
        const topic = await topic_model_1.TopicModel.findByIdAndUpdate(req.params.id, { name, allowedContentTypes }, { new: true });
        if (!topic)
            return res.status(404).json({ error: 'Topic not found' });
        res.status(200).json(topic);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateTopic = updateTopic;
const deleteTopic = async (req, res) => {
    try {
        const topic = await topic_model_1.TopicModel.findByIdAndDelete(req.params.id);
        if (!topic)
            return res.status(404).json({ error: 'Topic not found' });
        res.status(204).json({ message: 'Topic deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteTopic = deleteTopic;

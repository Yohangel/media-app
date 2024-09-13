"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModel = void 0;
// src/models/topic.model.ts
const mongoose_1 = require("mongoose");
const topicSchema = new mongoose_1.Schema({
    name: { type: String, required: true, },
    allowedContentTypes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ContentType' }],
    createdAt: { type: Date, default: Date.now }
});
const TopicModel = (0, mongoose_1.model)('Topic', topicSchema);
exports.TopicModel = TopicModel;

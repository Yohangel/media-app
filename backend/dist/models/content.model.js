"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = require("mongoose");
const contentSchema = new mongoose_1.Schema({
    type: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ContentType', required: true },
    url: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Topic' },
    createdAt: { type: Date, default: Date.now }
});
const ContentModel = (0, mongoose_1.model)('Content', contentSchema);
exports.ContentModel = ContentModel;

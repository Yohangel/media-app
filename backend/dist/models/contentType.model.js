"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTypeModel = void 0;
const mongoose_1 = require("mongoose");
const contentTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const ContentTypeModel = (0, mongoose_1.model)('ContentType', contentTypeSchema);
exports.ContentTypeModel = ContentTypeModel;

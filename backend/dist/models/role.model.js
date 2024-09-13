"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const RoleModel = (0, mongoose_1.model)('Role', roleSchema);
exports.RoleModel = RoleModel;

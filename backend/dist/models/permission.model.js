"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
const mongoose_1 = require("mongoose");
const permissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const PermissionModel = (0, mongoose_1.model)('Permission', permissionSchema);
exports.PermissionModel = PermissionModel;

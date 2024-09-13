"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPermissions = exports.createPermission = void 0;
const permission_model_1 = require("@/models/permission.model");
const createPermission = async (req, res) => {
    try {
        const permission = new permission_model_1.PermissionModel(req.body);
        await permission.save();
        res.status(201).json(permission);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create permission' });
    }
};
exports.createPermission = createPermission;
const getAllPermissions = async (req, res) => {
    try {
        const permissions = await permission_model_1.PermissionModel.find();
        res.status(200).json(permissions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch permissions' });
    }
};
exports.getAllPermissions = getAllPermissions;

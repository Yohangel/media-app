"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoles = exports.createRole = void 0;
const role_model_1 = require("@/models/role.model");
const createRole = async (req, res) => {
    try {
        const role = new role_model_1.RoleModel(req.body);
        await role.save();
        res.status(201).json(role);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create role' });
    }
};
exports.createRole = createRole;
const getAllRoles = async (req, res) => {
    try {
        const roles = await role_model_1.RoleModel.find();
        res.status(200).json(roles);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
};
exports.getAllRoles = getAllRoles;

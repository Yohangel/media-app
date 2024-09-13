"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const user_model_1 = require("@/models/user.model");
const role_model_1 = require("@/models/role.model");
const authorize = (requiredroles) => {
    return async (req, res, next) => {
        try {
            if (!req.user)
                return res.status(401).json({ error: 'Unauthorized' });
            const user = await user_model_1.UserModel.findById(req.user._id).populate('role');
            if (!user)
                return res.status(404).json({ error: 'User not found' });
            const role = await role_model_1.RoleModel.findById(user.role);
            if (!role)
                return res.status(404).json({ error: 'Role not found' });
            const hasPermission = requiredroles.includes(role.name);
            if (!hasPermission)
                return res.status(403).json({ error: 'Forbidden' });
            next();
        }
        catch (error) {
            console.error('Error in authorization middleware:', error);
            res.status(500).json({ error: 'Server error' });
        }
    };
};
exports.authorize = authorize;

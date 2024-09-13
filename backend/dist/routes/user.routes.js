"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("@/controllers/user.controller");
const authorization_middleware_1 = require("@/middlewares/authorization.middleware");
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.registerUser);
router.post('/login', user_controller_1.loginUser);
router.get('/', user_controller_1.getUsers);
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)(['admin']), user_controller_1.updateUser);
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)(['admin']), user_controller_1.deleteUser);
exports.default = router;

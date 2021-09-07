"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.MessageSchema = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// SCHEMA USERS
const UserSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(3),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(7).required()
});
exports.UserSchema = UserSchema;
// SCHEMA MESSAGE
const MessageSchema = joi_1.default.object({
    message: joi_1.default.string().required()
});
exports.MessageSchema = MessageSchema;
// SCHEMA LOGIN
const LoginSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(3),
    password: joi_1.default.string().required().min(7)
});
exports.LoginSchema = LoginSchema;

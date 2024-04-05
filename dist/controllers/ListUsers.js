"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
class ListUsers {
    async get(req, res) {
        try {
            const users = await User_1.default.find();
            return res.json(users);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
exports.ListUsers = ListUsers;

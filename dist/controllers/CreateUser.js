"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
class CreateUser {
    async create(req, res) {
        const { name, email, username, picture, bio } = req.body;
        try {
            const existsUsernameOrEmail = await User_1.default.findOne({
                $or: [{ email }, { username }],
            });
            if (existsUsernameOrEmail) {
                return res
                    .status(400)
                    .json({ message: "Username ou email já existe!" });
            }
            const newUser = await User_1.default.create({
                name,
                email,
                username,
                picture,
                bio,
                isActive: true,
                isVerified: false,
                inactive: false,
                createdAt: new Date(),
            });
            return res.status(201).json(newUser);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.CreateUser = CreateUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const upload_1 = require("../services/upload");
class CreatePost {
    async create(req, res) {
        const { user_id, description } = req.body;
        try {
            const user = await User_1.default.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            const files = req.files;
            const images = await Promise.all(files.map(async (file) => {
                const img = await (0, upload_1.uploadFile)(`posts/${file.originalname}`, file.buffer, file.mimetype);
                return img;
            }));
            const newPost = await Post_1.default.create({
                user_id: user._id,
                description,
                images,
                likes: [],
                comments: [],
            });
            return res.status(201).json(newPost);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.CreatePost = CreatePost;

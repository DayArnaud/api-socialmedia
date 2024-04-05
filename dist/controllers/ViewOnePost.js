"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewOnePost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
class ViewOnePost {
    async show(req, res) {
        const { id } = req.params;
        try {
            const post = await Post_1.default.findById(id);
            if (!post) {
                return res.status(404).json({ message: "Postagem não encontrada." });
            }
            return res.json(post);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.ViewOnePost = ViewOnePost;

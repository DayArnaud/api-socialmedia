"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
class UpdatePost {
    async update(req, res) {
        const { description } = req.body;
        const { id } = req.params;
        try {
            const post = await Post_1.default.findById(id);
            if (!post) {
                return res.status(404).json({ message: "Postagem não encontrado" });
            }
            await Post_1.default.updateOne({ _id: id }, { description });
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.UpdatePost = UpdatePost;

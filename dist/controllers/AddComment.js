"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComment = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../models/User"));
class AddComment {
    async addComment(req, res) {
        const { id } = req.params;
        const { user_id, description } = req.body;
        try {
            const post = await Post_1.default.findById(id);
            if (!post) {
                return res.status(404).json({ message: "Postagem não encontrada." });
            }
            const user = await User_1.default.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            await Post_1.default.updateOne({ _id: id }, {
                $push: {
                    comments: {
                        _id: new mongoose_1.Types.ObjectId(),
                        user_id: user._id,
                        description,
                    },
                },
            });
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.AddComment = AddComment;

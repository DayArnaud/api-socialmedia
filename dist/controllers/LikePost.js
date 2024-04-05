"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
class LikePost {
    async likePost(req, res) {
        const { id } = req.params;
        const { user_id } = req.body;
        try {
            const post = await Post_1.default.findById(id);
            if (!post) {
                return res.status(404).json({ message: "Postagem não existe." });
            }
            const user = await User_1.default.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não existe" });
            }
            const likeExists = post.likes.find((like) => String(like) === user_id);
            if (likeExists) {
                await Post_1.default.updateOne({ _id: id }, {
                    $pull: {
                        likes: user._id,
                    },
                });
                return res.status(204).json();
            }
            await Post_1.default.updateOne({ _id: id }, {
                $push: {
                    likes: user._id,
                },
            });
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.LikePost = LikePost;

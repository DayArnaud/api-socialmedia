import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

export class LikePost {
  async likePost(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req.body;

    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Postagem não existe." });
      }

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não existe" });
      }

      const likeExists = post.likes.find((like) => String(like) === user_id);
      if (likeExists) {
        await Post.updateOne(
          { _id: id },
          {
            $pull: {
              likes: user._id,
            },
          }
        );
        return res.status(204).json();
      }

      await Post.updateOne(
        { _id: id },
        {
          $push: {
            likes: user._id,
          },
        }
      );
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

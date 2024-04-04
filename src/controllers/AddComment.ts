import { Request, Response } from "express";
import Post from "../models/Post";
import { Types } from "mongoose";
import User from "../models/User";

export class AddComment {
  async addComment(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id, description } = req.body;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await Post.updateOne(
        { _id: id },
        {
          $push: {
            comments: {
              _id: new Types.ObjectId(),
              user_id: user._id,
              description,
            },
          },
        }
      );
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

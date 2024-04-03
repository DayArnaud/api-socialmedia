import { Request, Response } from "express";
import Post from "../models/Post";
import { Types } from "mongoose";

export class AddComment {
  async addComment(req: Request, res: Response) {
    const { id } = req.params;
    const { description } = req.body;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      await Post.updateOne(
        { _id: id },
        {
          $push: {
            comments: {
              _id: new Types.ObjectId(),
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

import { Request, Response } from "express";
import Post from "../models/Post";

export class LikePost {
  async likePost(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Postagem não existe." });
      }
      await Post.updateOne(
        { _id: id },
        {
          $inc: {
            likes: 1,
          },
        }
      );
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

export class CreatePost {
  async create(req: Request, res: Response) {
    const { user_id, description, images } = req.body;
    try {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const newPost = await Post.create({
        user_id: user._id,
        description,
        images,
        likes: 0,
        comments: [],
      });

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

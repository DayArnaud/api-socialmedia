import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import { uploadFile } from "../services/upload";

export class CreatePost {
  async create(req: Request, res: Response) {
    const { user_id, description } = req.body;

    try {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      const files = req.files as Express.Multer.File[];
      const images = await Promise.all(
        files.map(async (file) => {
          const img = await uploadFile(
            `posts/${file.originalname}`,
            file.buffer,
            file.mimetype
          );
          return img;
        })
      );

      const newPost = await Post.create({
        user_id: user._id,
        description,
        images,
        likes: [],
        comments: [],
      });

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

import { Request, Response } from "express";
import Post from "../models/Post";

export class UpdatePost {
  async update(req: Request, res: Response) {
    const { description } = req.body;
    const { id } = req.params;
    try {
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Postagem não encontrado" });
      }

      await Post.updateOne({ _id: id }, { description });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

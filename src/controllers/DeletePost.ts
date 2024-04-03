import { Request, Response } from "express";
import Post from "../models/Post";

export class DeletePost {
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      await Post.deleteOne({ _id: id });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

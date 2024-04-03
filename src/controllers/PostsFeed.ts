import { Request, Response } from "express";
import Post from "../models/Post";

export class PostsFeed {
  async get(req: Request, res: Response) {
    try {
      const posts = await Post.find();
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

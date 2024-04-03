import { Request, Response } from "express";
import User from "../models/User";

export class ListUsers {
  async get(req: Request, res: Response) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

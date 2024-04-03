import { Request, Response } from "express";
import User from "../models/User";

export class ViewOneUser {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

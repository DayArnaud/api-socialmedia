import { Request, Response } from "express";
import User from "../models/User";

export class DisableUser {
  async inactive(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await User.updateOne({ _id: id }, { isActive: false });
      res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

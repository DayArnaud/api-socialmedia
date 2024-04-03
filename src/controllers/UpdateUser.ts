import { Request, Response } from "express";
import User from "../models/User";

export class UpdateUser {
  async update(req: Request, res: Response) {
    const { name, email, username, picture, bio } = req.body;
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const existsEmailOrUsername = await User.findOne({
        $or: [
          { email, _id: { $ne: id } },
          { username, _id: { $ne: id } },
        ],
      });

      if (existsEmailOrUsername) {
        return res.status(400).json({
          message: "Email ou Username já existe, favor informar outro.",
        });
      }

      await User.updateOne(
        { _id: id },
        {
          name,
          email,
          username,
          picture,
          bio,
        }
      );
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

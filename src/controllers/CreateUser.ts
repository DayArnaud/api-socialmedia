import { Request, Response } from "express";
import User from "../models/User";

export class CreateUser {
  async create(req: Request, res: Response) {
    const { name, email, username, picture, bio } = req.body;

    try {
      const existsUsernameOrEmail = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existsUsernameOrEmail) {
        return res
          .status(400)
          .json({ message: "Username ou email já existe!" });
      }

      const newUser = await User.create({
        name,
        email,
        username,
        picture,
        bio,
        isActive: true,
        isVerified: false,
        inactive: false,
        createdAt: new Date(),
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

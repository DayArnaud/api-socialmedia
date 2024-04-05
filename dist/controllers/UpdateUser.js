"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
class UpdateUser {
    async update(req, res) {
        const { name, email, username, picture, bio } = req.body;
        const { id } = req.params;
        try {
            const user = await User_1.default.findById(id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            const existsEmailOrUsername = await User_1.default.findOne({
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
            await User_1.default.updateOne({ _id: id }, {
                name,
                email,
                username,
                picture,
                bio,
            });
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
exports.UpdateUser = UpdateUser;

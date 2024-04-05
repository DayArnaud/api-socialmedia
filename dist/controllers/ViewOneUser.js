"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewOneUser = void 0;
const User_1 = __importDefault(require("../models/User"));
class ViewOneUser {
    async show(req, res) {
        const { id } = req.params;
        try {
            const user = await User_1.default.findById(id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
exports.ViewOneUser = ViewOneUser;

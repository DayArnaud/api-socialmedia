"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const dbURI = process.env.DB_URI;
mongoose_1.default
    .connect(dbURI)
    .then(() => {
    console.log("database started");
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.listen(process.env.PORT, () => {
        console.log("Server started");
    });
})
    .catch((error) => {
    console.log(error);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    name: String,
    email: String,
    username: String,
    picture: String,
    bio: String,
    isActive: Boolean,
    isVerified: Boolean,
    inactive: Boolean,
    createdAt: Date,
});
exports.default = (0, mongoose_1.model)("User", User);

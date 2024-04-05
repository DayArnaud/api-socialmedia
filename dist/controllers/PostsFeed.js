"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsFeed = void 0;
const Post_1 = __importDefault(require("../models/Post"));
class PostsFeed {
    async get(req, res) {
        try {
            const posts = await Post_1.default.aggregate([
                {
                    $unwind: {
                        path: "$comments",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "comments.user_id",
                        foreignField: "_id",
                        as: "comments.user",
                    },
                },
                {
                    $unwind: {
                        path: "$comments.user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        comments: {
                            $push: "$comments",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "_id",
                        foreignField: "_id",
                        as: "postDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$postDetails",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $addFields: {
                        "postDetails.comments": "$comments",
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: "$postDetails",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $addFields: {
                        user: {
                            $first: "$user",
                        },
                    },
                },
                {
                    $addFields: {
                        likes: {
                            $cond: {
                                if: { $isArray: "$likes" },
                                then: { $size: "$likes" },
                                else: 0,
                            },
                        },
                    },
                },
            ]);
            return res.json(posts);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.PostsFeed = PostsFeed;

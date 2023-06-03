"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NoticiasApiSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    liked: { type: Number, required: true },
    date: { type: String, required: true },
    url: { type: String, required: true },
    share: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, required: false }
});
NoticiasApiSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 5 });
const newsPostSchema = mongoose_1.default.model("newss", NoticiasApiSchema);
exports.default = newsPostSchema;

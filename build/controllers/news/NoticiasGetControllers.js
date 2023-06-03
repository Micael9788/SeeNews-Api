"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoticiasApiSchemas_1 = __importDefault(require("@/schemas/NoticiasApiSchemas"));
async function noticiasList(req, res) {
    try {
        const { limit, oder, page } = req.query;
        const noticias = await NoticiasApiSchemas_1.default
            .find({})
            .limit(Number(limit) || 10)
            .sort({ createdAt: oder })
            .skip(Number(page) || 1);
        return res.status(200).json({
            success: true,
            status: 200,
            message: "here is the list of news",
            noticias,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: "Error when fetching news",
        });
    }
}
exports.default = noticiasList;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoticiasApiValidation_1 = __importDefault(require("@/validations/NoticiasApiValidation"));
const NoticiasApiSchemas_1 = __importDefault(require("@/schemas/NoticiasApiSchemas"));
async function noticiasPost(req, res) {
    try {
        const { title, description, creator, liked, date, url, share, image } = await NoticiasApiValidation_1.default.parseAsync(req.body);
        const noticia = {
            title,
            description,
            creator,
            liked,
            date,
            url,
            share,
            image
        };
        await NoticiasApiSchemas_1.default.create(noticia);
        return res.status(200).json({
            success: true,
            status: 200,
            message: "successfully",
            noticia,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: "error when posting news",
        });
    }
}
exports.default = noticiasPost;

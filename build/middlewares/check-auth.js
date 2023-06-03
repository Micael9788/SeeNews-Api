"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const GenerateUserToken_1 = require("@/auth/GenerateUserToken");
const UserApiSchema_1 = __importDefault(require("@/schemas/UserApiSchema"));
const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: "you are not authorized to access",
            });
        }
        const token = authorization.replace("Bearer", "").trim();
        const data = (0, GenerateUserToken_1.verifyUserToken)(token);
        const { id } = data;
        const user = await UserApiSchema_1.default.findById(id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found",
            });
        }
        const userId = String(user._id);
        if (userId !== id) {
            return res.status(401).json({
                success: false,
                message: "unauthorized user",
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "failed to authenticate user",
        });
    }
};
exports.authentication = authentication;

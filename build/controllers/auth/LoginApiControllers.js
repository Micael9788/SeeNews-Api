"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const zod_1 = require("zod");
const GenerateUserToken_1 = require("@/auth/GenerateUserToken");
const UserApiSchema_1 = __importDefault(require("@/schemas/UserApiSchema"));
const userValidation = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "email is mandatory",
        invalid_type_error: "email must be a string"
    }).trim().min(5).max(45),
    password: zod_1.z.string({
        required_error: "password is mandatory",
        invalid_type_error: "password must be a string"
    }).trim().min(5).max(14)
});
async function login(req, res) {
    try {
        const { email, password } = await userValidation.parseAsync(req.body);
        const usuario = await UserApiSchema_1.default.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "user does not exist in our database",
            });
        }
        const passInvalid = verifyPassword(password, usuario.password);
        if (!passInvalid) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Your password is incorrect",
            });
        }
        const token = (0, GenerateUserToken_1.generateUserToken)({ id: usuario._id, expiresIn: "30d" });
        if (!token) {
            throw new Error("failed to make access token");
        }
        return res.status(200).json({
            authenticated: true,
            success: true,
            status: 200,
            message: "login successful",
            email: usuario === null || usuario === void 0 ? void 0 : usuario.email,
            token
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "user login failure",
        });
    }
}
exports.default = login;
function verifyPassword(password, original) {
    const parts = original.split(":");
    const salt = parts[0];
    const hash = crypto_1.default.scryptSync(password, salt, 64).toString("hex");
    return hash === parts[1];
}

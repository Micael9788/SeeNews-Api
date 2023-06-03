"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const zod_1 = require("zod");
const UserApiSchema_1 = __importDefault(require("@/schemas/UserApiSchema"));
const userValidation = zod_1.z.object({
    user: zod_1.z.string({
        required_error: "username is mandatory",
        invalid_type_error: "username must be a string"
    }).trim().min(5).max(45),
    email: zod_1.z.string({
        required_error: "email is mandatory",
        invalid_type_error: "email must be a string"
    }).trim().min(5).max(45),
    password: zod_1.z.string({
        required_error: "password is mandatory",
        invalid_type_error: "password must be a string"
    }).trim().min(5).max(14)
});
async function register(req, res) {
    try {
        const { user, email, password } = await userValidation.parseAsync(req.body);
        const userExist = await UserApiSchema_1.default.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'An account already exists for that email address',
            });
        }
        const cryptoPass = hashPassword(password);
        const usuario = {
            user,
            email,
            password: cryptoPass
        };
        await UserApiSchema_1.default.create(usuario);
        return res.status(200).json({
            success: true,
            message: "successfully",
            email: usuario === null || usuario === void 0 ? void 0 : usuario.email
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues.map(issue => issue.message),
            });
        }
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'error when registering user',
        });
    }
}
exports.default = register;
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default.scryptSync(password, salt, 64).toString('hex');
    return salt + ':' + hash;
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = exports.verifyUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUserToken = (token) => {
    if (!process.env.KEY_TOKEN_PUBLIC) {
        throw new Error("KEY_TOKEN_PRIVATE must be set in environment");
    }
    return jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN_PUBLIC);
};
exports.verifyUserToken = verifyUserToken;
const generateUserToken = (data) => {
    if (!process.env.KEY_TOKEN_PRIVATE) {
        throw new Error("KEY_TOKEN_PRIVATE must be set in environment");
    }
    const tokenJwt = jsonwebtoken_1.default.sign({
        id: data.id,
    }, process.env.KEY_TOKEN_PRIVATE, {
        algorithm: "RS256",
        expiresIn: data.expiresIn,
    });
    return tokenJwt;
};
exports.generateUserToken = generateUserToken;

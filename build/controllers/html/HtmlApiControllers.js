"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuporteApiControllers = exports.PrivacidadeApiControllers = exports.DocsApiControllers = void 0;
const path_1 = __importDefault(require("path"));
const DocsApiControllers = (req, res) => {
    try {
        const pathFile = path_1.default.join(__dirname, "..", "..", "html", "docs.html");
        return res.status(200).sendFile(pathFile);
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: "error when getting the docs from the api",
        });
    }
};
exports.DocsApiControllers = DocsApiControllers;
const PrivacidadeApiControllers = (req, res) => {
    try {
        const pathFile = path_1.default.join(__dirname, "..", "..", "html", "privacidade.html");
        return res.status(200).sendFile(pathFile);
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: "error when getting the privacidade from the api",
        });
    }
};
exports.PrivacidadeApiControllers = PrivacidadeApiControllers;
const SuporteApiControllers = (req, res) => {
    try {
        const pathFile = path_1.default.join(__dirname, "..", "..", "html", "suporte.html");
        return res.status(200).sendFile(pathFile);
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            status: 404,
            message: "error when getting the suporte from the api",
        });
    }
};
exports.SuporteApiControllers = SuporteApiControllers;

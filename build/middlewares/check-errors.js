"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const errorHandlerApi = (error, req, res, next) => {
    if (error) {
        const pathFile = path_1.default.join(__dirname, "html", "404.html");
        return res.status(404).sendFile(pathFile);
    }
    next();
};
exports.default = errorHandlerApi;

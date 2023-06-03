"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
const mongooseHandlerApi = async () => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("Você precisa criar MONGO_URL no arquivo .env");
    }
    try {
        await mongoose_1.default.connect(mongoUrl);
    }
    catch (error) {
        throw new Error(`Ocorreu um erro na conexão com o MongoDB: ${error}`);
    }
};
exports.default = mongooseHandlerApi;

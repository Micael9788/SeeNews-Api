"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongo_conect_1 = __importDefault(require("@/database/mongo-conect"));
const check_errors_1 = __importDefault(require("@/middlewares/check-errors"));
const router_1 = __importDefault(require("@/router/router"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
if (process.env.DEBUG) {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(check_errors_1.default);
app.use(router_1.default);
app.use((req, res, next) => {
    const pathFile = path_1.default.join(__dirname, "html", "404.html");
    return res.status(404).sendFile(pathFile);
});
const port = Number(process.env.PORT || 3333);
const startServer = async () => {
    try {
        await (0, mongo_conect_1.default)();
        app.emit("connected");
    }
    catch (error) {
        console.log(error);
    }
};
app.listen(port, startServer);
app.on("connected", () => {
    console.log(`Server running on port ${port}`);
});

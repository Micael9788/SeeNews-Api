"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const newsPostValidation = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    creator: zod_1.z.string(),
    liked: zod_1.z.number(),
    date: zod_1.z.string(),
    url: zod_1.z.string(),
    share: zod_1.z.string(),
    image: zod_1.z.string(),
});
exports.default = newsPostValidation;

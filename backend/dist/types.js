"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = exports.CreateUser = void 0;
const zod_1 = require("zod");
exports.CreateUser = zod_1.z.object({
    email: zod_1.z.email(),
});
exports.Signin = zod_1.z.object({
    email: zod_1.z.email(),
    otp: zod_1.z.string().or(zod_1.z.number().int()),
});

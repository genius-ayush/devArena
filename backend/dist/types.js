"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestSchema = exports.QuestionSchema = exports.Signin = exports.CreateUser = void 0;
const zod_1 = require("zod");
exports.CreateUser = zod_1.z.object({
    email: zod_1.z.email(),
});
exports.Signin = zod_1.z.object({
    email: zod_1.z.email(),
    otp: zod_1.z.string().or(zod_1.z.number().int()),
});
exports.QuestionSchema = zod_1.z.object({
    problemStatement: zod_1.z.string(),
    checkParameter: zod_1.z.string(),
    marks: zod_1.z.number(),
    questionOrder: zod_1.z.number(),
});
exports.ContestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    questionCount: zod_1.z.number(),
    totalMarks: zod_1.z.number(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    questions: zod_1.z.array(exports.QuestionSchema),
});

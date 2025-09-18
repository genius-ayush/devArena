"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewres_1 = require("../middlewres");
const prisma_1 = require("../../generated/prisma");
const types_1 = require("../types");
const prismaClient = new prisma_1.PrismaClient();
const router = (0, express_1.Router)();
//create context
router.post('/', middlewres_1.setterMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const setterId = req.headers["userId"];
    if (typeof (setterId) != 'string') {
        res.send(500).send("invalid setterId");
        return;
    }
    const { success, data } = types_1.ContestSchema.safeParse(req.body);
    if (!success) {
        res.status(411).send("Invalid input");
        return;
    }
    try {
        let response = yield prismaClient.contest.create({
            data: {
                setterId: setterId,
                name: data.name,
                description: data.description,
                questionCount: data.questionCount,
                totalMarks: data.totalMarks,
                startTime: data.startTime,
                endTime: data.endTime,
                questions: {
                    create: data.questions.map((q) => ({
                        problemStatement: q.problemStatement,
                        checkParameter: q.checkParameter,
                        marks: q.marks,
                        questionOrder: q.questionOrder,
                    })),
                },
            }
        });
        res.status(200).send({ message: "contest created successfully", response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json("failed to create contest");
    }
}));
//getcontest
router.get('/', middlewres_1.setterMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const setterId = req.headers["userId"];
    if (typeof (setterId) != 'string') {
        res.send(500).send('invalid setterId');
        return;
    }
    try {
        const response = yield prismaClient.contest.findMany({ where: { setterId } });
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).json("failed to get contests");
    }
}));
//getContest by id 
router.get('/:id', middlewres_1.setterMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const setterId = req.headers['userId'];
    console.log(setterId);
    const contestId = req.params.id;
    if (typeof (setterId) != 'string') {
        res.send(500).send('invalid setterId');
        return;
    }
    try {
        const response = yield prismaClient.contest.findUnique({ where: {
                setterId, id: contestId
            } });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json('failed to get the contest');
    }
}));
// update contestby id 
router.patch('/contest/:id', (req, res) => {
});
exports.default = router;

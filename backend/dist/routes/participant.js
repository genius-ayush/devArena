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
const router = (0, express_1.Router)();
const prismaClient = new prisma_1.PrismaClient();
router.get("/contest/:id", middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers["userId"];
    if (typeof (participantId) != 'string') {
        return res.status(400).send("Unauthorized");
    }
    const contestId = req.params.id;
    try {
        const contest = yield prismaClient.contest.findFirst();
        // const questionStatement = await prismaClient.question.findMany({where:{contestId}, select:{problemStatement:true , marks:true}})
        return res.status(200).send({ contest });
    }
    catch (error) {
        console.error(error);
        return res.status(400).send("unable to fetch data");
    }
}));
router.post('/:contestId/join', middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers['userId'];
    const contestId = req.params.contestId;
    console.log("contestId", contestId);
    if (typeof (participantId) != 'string') {
        return res.status(500).send("invalid partipant id");
    }
    if (!contestId) {
        return res.status(500).json('no contestId found');
    }
    try {
        const participation = yield prismaClient.contestParticipation.upsert({
            where: {
                participantId_contestId: {
                    participantId,
                    contestId,
                },
            },
            update: {},
            create: {
                participantId, contestId, status: 'REGISTERED'
            }
        });
        const contest = yield prismaClient.contest.findFirst({ where: { id: contestId }, select: { name: true } });
        const questions = yield prismaClient.question.findMany({ where: { contestId }, select: { problemStatement: true, marks: true } });
        res.status(200).json({ participation, questions, contest });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error joining the contest"
        });
    }
}));
exports.default = router;

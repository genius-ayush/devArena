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
    console.log(req.body);
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
//getcontest of setters 
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
router.get('/participant', middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers['userId'];
    if (typeof (participantId) != 'string') {
        return res.status(500).send("invalid partipant id");
    }
    try {
        const contests = yield prismaClient.contest.findMany();
        res.status(200).json(contests);
    }
    catch (error) {
        return res.status(500).json(error);
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
        const contest = yield prismaClient.contest.findUnique({ where: {
                setterId, id: contestId
            } });
        const questions = yield prismaClient.question.findMany({ where: {
                contestId
            } });
        res.status(200).json({ contest, questions });
    }
    catch (error) {
        res.status(500).json('failed to get the contest');
    }
}));
// update contestby id 
// router.patch('/contest/:id', setterMiddleware , async(req , res)=>{
//     const setterId = req.headers['userId'] ;
//     const contestId = req.params.id ; 
//     if(typeof(setterId) != 'string'){
//         res.status(500).send('invalid setterId') ; 
//         return; 
//     }
//     const {success , data} = UpdateContestSchema.safeParse(req.body) ; 
//     if(!success){
//         return res.status(500).json('invalid types') ; 
//     }
//     try{
//         const contest = await prismaClient.contest.findUnique({where:{setterId , id:contestId}})
//         if(!contest){
//             res.status(403).send("not authorized to update this contest")
//         }
//         const updatedContest = await prismaClient.contest.update({ where:{
//              id:contestId } , data 
//         })
//         return res.status(200).json('contest updated successfully') ;
//     }catch(error){
//         res.status(500).json(error) ; 
//         return ; 
//     }
// })
router.post('/:contestId/join', middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers['userId'];
    const contestId = req.params.contestId;
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
        res.status(200).json(participation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error joining the contest"
        });
    }
}));
router.patch('/contest/:contestId/start', middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers['userId'];
    const contestId = req.params.contestId;
    if (typeof (participantId) != 'string') {
        return res.status(500).json('invalid participationid type');
    }
    const participantion = yield prismaClient.contestParticipation.update({
        where: {
            participantId_contestId: {
                participantId,
                contestId,
            },
        },
        data: {
            startedAt: Date.now().toString(),
            status: 'IN_PROGRESS'
        }
    });
    res.status(200).json(participantion);
}));
router.post('/contest/:contestId/:questionId/submit', middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers['userId'];
    const { contestId, questionId } = req.params;
    const answer = req.body;
    if (typeof (participantId) != 'string') {
        return res.status(500).send("invalid participationid");
    }
    const participation = yield prismaClient.contestParticipation.findUnique({
        where: {
            id: participantId
        }
    });
    if (!participation) {
        return res.status(400).json({ error: 'not registered' });
    }
    const question = yield prismaClient.question.findUnique({
        where: {
            id: questionId
        }
    });
    if (!question) {
        return res.status(404).json('cannot get any questions');
    }
    const isCorrect = question.checkParameter.trim() === answer.trim();
    const submission = yield prismaClient.submission.create({
        data: {
            participantId,
            contestId,
            questionId,
            contestParticipationId: participantId,
            answer,
            score: isCorrect ? question.marks : 0,
            isCorrect,
        }
    });
    yield prismaClient.contestParticipation.update({
        where: { id: participantId },
        data: {
            totalScore: { increment: submission.score }
        }
    });
}));
exports.default = router;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const totp_generator_1 = require("totp-generator");
const types_1 = require("../types");
const base32 = __importStar(require("hi-base32"));
const email_1 = require("../utils/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../generated/prisma");
const middlewres_1 = require("../middlewres");
const router = (0, express_1.Router)();
const otpCache = new Map();
const prismaClient = new prisma_1.PrismaClient();
router.post('/send_otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, data } = types_1.CreateUser.safeParse(req.body);
        if (!success) {
            res.status(411).json('invalid input');
            return;
        }
        const { otp, expires } = yield totp_generator_1.TOTP.generate(base32.encode(data.email + process.env.JWT_SECRET));
        (0, email_1.sendEmail)(data.email, otp);
        otpCache.set(data.email, otp);
        res.send({ otp, expires });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error",
        });
    }
}));
router.post('/signin_setter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.Signin.safeParse(req.body);
    if (!success) {
        res.status(411).json('invalid input');
        return;
    }
    if (otpCache.has(data.email)) {
        if (otpCache.get(data.email) == data.otp) {
            const setter = yield prismaClient.setter.findUnique({
                where: {
                    email: data.email,
                }
            });
            if (setter) {
                const token = jsonwebtoken_1.default.sign({ userId: setter.id }, process.env.JWT_SECRET);
                return res.status(200).json(token);
            }
            else {
                const newSetter = yield prismaClient.setter.create({
                    data: {
                        email: data.email
                    }
                });
                const token = jsonwebtoken_1.default.sign({ userId: newSetter.id }, process.env.JWT_SECRET);
                return res.status(200).json(token);
            }
        }
        else {
            res.status(411).json('invlid input');
        }
    }
    else {
        res.status(411).json('invalid input');
        return;
    }
}));
router.post('/signin_participant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.Signin.safeParse(req.body);
    if (!success) {
        res.status(411).json('invalid input');
        return;
    }
    if (otpCache.has(data.email)) {
        if (otpCache.get(data.email) == data.otp) {
            const participant = yield prismaClient.participant.findUnique({
                where: {
                    email: data.email,
                }
            });
            if (participant) {
                const token = jsonwebtoken_1.default.sign({ userId: participant.id }, process.env.JWT_SECRET);
                return res.status(200).json(token);
            }
            else {
                const participant = yield prismaClient.participant.create({
                    data: {
                        email: data.email
                    }
                });
                const token = jsonwebtoken_1.default.sign({ userId: participant.id }, process.env.JWT_SECRET);
                return res.status(200).json(token);
            }
        }
        else {
            res.status(411).json('invlid input');
        }
    }
    else {
        res.status(411).json('invalid input');
        return;
    }
}));
router.get('/setterMe', middlewres_1.setterMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const setterId = req.headers["userId"];
    if (typeof setterId !== "string") {
        return res.status(400).json({ message: "Invalid setter Id" });
    }
    try {
        const setter = yield prismaClient.setter.findUnique({
            where: {
                id: setterId
            }
        });
        if (setter) {
            return res.status(200).json({
                setter
            });
        }
        else {
            return res.status(403).json({
                message: 'no seter found'
            });
        }
    }
    catch (error) {
        res.status(403).json(error);
    }
}));
router.get('/participantMe', middlewres_1.participantMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participantId = req.headers["userId"];
    if (typeof participantId !== "string") {
        return res.status(400).json({ message: "Invalid participant Id" });
    }
    try {
        const participant = yield prismaClient.participant.findUnique({ where: {
                id: participantId
            } });
        return res.status(200).json({ participant });
    }
    catch (error) {
        return res.status(403).json({
            message: "invalid setterId"
        });
    }
}));
exports.default = router;

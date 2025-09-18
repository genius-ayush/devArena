"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantMiddleware = exports.setterMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setterMiddleware = (req, res, next) => {
    var _a;
    const authtoken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!authtoken) {
        res.send(403).send({
            message: "Invalid auth token",
            success: false
        });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(authtoken, "S3CRET", (err, payload) => {
            if (err) {
                return res.status(403);
            }
            if (!payload) {
                res.status(403);
                return;
            }
            if (typeof (payload) == 'string') {
                res.status(403);
                return;
            }
            req.headers['userId'] = payload.userId;
            next();
        });
    }
    catch (error) {
        res.status(403).send({
            message: "Invalid auth token",
            success: false
        });
    }
};
exports.setterMiddleware = setterMiddleware;
const participantMiddleware = (req, res, next) => {
    var _a;
    const authtoken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!authtoken) {
        res.status(403).send({
            message: "token now found",
            success: false
        });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(authtoken, process.env.JWT_SECRET_PARTICIPANT, (error, payload) => {
            if (error) {
                res.status(403);
                return;
            }
            if (!payload) {
                res.status(403);
                return;
            }
            if (typeof (payload) == 'string') {
                res.status(403);
                return;
            }
            req.headers['userId'] = payload.userId;
            next();
        });
    }
    catch (e) {
        console.error(e);
        res.status(403).send({
            message: "Invalid tokne",
            success: false,
        });
    }
};
exports.participantMiddleware = participantMiddleware;

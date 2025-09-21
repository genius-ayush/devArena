"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const contest_1 = __importDefault(require("./routes/contest"));
const participate_1 = __importDefault(require("./routes/participate"));
const result_1 = __importDefault(require("./routes/result"));
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/auth', auth_1.default);
app.use('/contest', contest_1.default);
app.use('/participaton', participate_1.default);
app.use('result', result_1.default);
app.listen(port, () => {
    console.log(`Application running at ${port}`);
});

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
exports.sendEmail = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = `
  <html>
  <body>
      <h1>Your sign-in OTP for Devarena</h1>
      <p>Your one-time password is: <strong>${otp}</strong></p>
      <p>This code is valid for 5 minutes. Do not share it with anyone.</p>
  </body>
  </html>
`;
    const { data, error } = yield resend.emails.send({
        from: "Devarena <onboarding@resend.dev>",
        to: [email],
        subject: "Your signin otp for Devarena",
        html: emailHtml,
    });
    if (error) {
        console.error("error sending email");
        return;
    }
});
exports.sendEmail = sendEmail;

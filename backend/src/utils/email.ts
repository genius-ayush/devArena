import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail = async (email: string, otp: string) => {

  const emailHtml = `
  <html>
  <body>
      <h1>Your sign-in OTP for Devarena</h1>
      <p>Your one-time password is: <strong>${otp}</strong></p>
      <p>This code is valid for 5 minutes. Do not share it with anyone.</p>
  </body>
  </html>
`;

  const { data, error } = await resend.emails.send({
    from: "Devarena <onboarding@resend.dev>",
    to: [email],
    subject: "Your signin otp for Devarena",
    html: emailHtml,
  });

  if (error) {
    console.error("error sending email");
    return
  }


}
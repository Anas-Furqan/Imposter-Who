import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL;

if (!resendKey || !resendFrom) {
  throw new Error("Missing Resend environment variables");
}

const resend = new Resend(resendKey);

const buildHtml = (title: string, code: string, expiry: string) => {
  return `
    <div style="background:#0D0D1A;color:#F5F0FF;padding:32px;font-family:Arial,sans-serif;">
      <div style="text-align:center;">
        <div style="font-size:28px;font-weight:bold;">🕵️ IMPOSTER WHO?</div>
        <h2 style="margin-top:16px;">${title}</h2>
        <p style="margin:16px 0;">Your verification code is:</p>
        <div style="font-size:28px;letter-spacing:0.3em;color:#FF3B5C;font-weight:bold;">${code}</div>
        <p style="margin-top:16px;color:#8B8BAD;">${expiry}</p>
      </div>
    </div>
  `;
};

export const sendVerificationEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: resendFrom,
    to: email,
    subject: "Verify your Imposter WHO? account",
    html: buildHtml("Verify your account", code, "This code expires in 24 hours"),
  });
};

export const sendResetEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: resendFrom,
    to: email,
    subject: "Reset your Imposter WHO? password",
    html: buildHtml("Password reset", code, "This code expires in 1 hour"),
  });
};

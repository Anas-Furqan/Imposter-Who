import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "../utils/supabase";
import { addHours, generateCode } from "../utils/tokens";
import { sendResetEmail, sendVerificationEmail } from "../utils/email";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const resendSchema = z.object({
  email: z.string().email(),
});

const forgotSchema = z.object({
  email: z.string().email(),
});

const resetSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  password: z.string().min(8),
});

const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const register = async (req: any, res: any) => {
  try {
    const { email, username, password } = registerSchema.parse(req.body);

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const { data: usernameCheck, error: usernameError } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (usernameError) throw usernameError;
    if (usernameCheck) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const code = generateCode();
    const expiry = addHours(24);

    const { error } = await supabase.from("users").insert({
      email,
      username,
      password: hashed,
      is_email_verified: false,
      email_verify_token: code,
      email_verify_expiry: expiry.toISOString(),
    });

    if (error) throw error;

    await sendVerificationEmail(email, code);

    return res.json({ message: "Verification email sent" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const verifyEmail = async (req: any, res: any) => {
  try {
    const { email, code } = verifySchema.parse(req.body);

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email_verify_token !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }

    if (!user.email_verify_expiry || new Date(user.email_verify_expiry) < new Date()) {
      return res.status(400).json({ message: "Code expired" });
    }

    const { error } = await supabase
      .from("users")
      .update({
        is_email_verified: true,
        email_verify_token: null,
        email_verify_expiry: null,
      })
      .eq("id", user.id);

    if (error) throw error;

    const accessToken = signAccessToken({ sub: user.id });
    const refreshToken = signRefreshToken({ sub: user.id });
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await supabase
      .from("users")
      .update({ refresh_token: refreshHash })
      .eq("id", user.id);

    return res.json({ accessToken, refreshToken });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.is_email_verified) {
      const code = generateCode();
      const expiry = addHours(24);

      await supabase
        .from("users")
        .update({ email_verify_token: code, email_verify_expiry: expiry.toISOString() })
        .eq("id", user.id);

      await sendVerificationEmail(email, code);

      return res.status(403).json({ message: "Please verify your email first" });
    }

    const accessToken = signAccessToken({ sub: user.id });
    const refreshToken = signRefreshToken({ sub: user.id });
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await supabase
      .from("users")
      .update({ refresh_token: refreshHash })
      .eq("id", user.id);

    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        xp: user.xp,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const refresh = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken) {
      return res.status(400).json({ message: "Missing refresh token" });
    }

    const payload = verifyRefreshToken(refreshToken);
    const userId = payload.sub as string;

    const { data: user, error } = await supabase
      .from("users")
      .select("id, refresh_token")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    if (!user || !user.refresh_token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const matches = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!matches) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newAccess = signAccessToken({ sub: userId });
    const newRefresh = signRefreshToken({ sub: userId });
    const refreshHash = await bcrypt.hash(newRefresh, 10);

    await supabase
      .from("users")
      .update({ refresh_token: refreshHash })
      .eq("id", userId);

    return res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (error: any) {
    return res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

export const logout = async (req: any, res: any) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await supabase.from("users").update({ refresh_token: null }).eq("id", userId);
    return res.json({ message: "Logged out" });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

export const resendVerification = async (req: any, res: any) => {
  try {
    const { email } = resendSchema.parse(req.body);
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const code = generateCode();
    const expiry = addHours(24);

    await supabase
      .from("users")
      .update({ email_verify_token: code, email_verify_expiry: expiry.toISOString() })
      .eq("id", user.id);

    await sendVerificationEmail(email, code);

    return res.json({ message: "Verification email sent" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const forgotPassword = async (req: any, res: any) => {
  try {
    const { email } = forgotSchema.parse(req.body);
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const code = generateCode();
    const expiry = addHours(1);

    await supabase
      .from("users")
      .update({ password_reset_token: code, password_reset_expiry: expiry.toISOString() })
      .eq("id", user.id);

    await sendResetEmail(email, code);

    return res.json({ message: "Password reset email sent" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const resetPassword = async (req: any, res: any) => {
  try {
    const { email, code, password } = resetSchema.parse(req.body);
    const user = await getUserByEmail(email);

    if (!user || user.password_reset_token !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }

    if (!user.password_reset_expiry || new Date(user.password_reset_expiry) < new Date()) {
      return res.status(400).json({ message: "Code expired" });
    }

    const hashed = await bcrypt.hash(password, 12);

    await supabase
      .from("users")
      .update({
        password: hashed,
        password_reset_token: null,
        password_reset_expiry: null,
      })
      .eq("id", user.id);

    return res.json({ message: "Password updated" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

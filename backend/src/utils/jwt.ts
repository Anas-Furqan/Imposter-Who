import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret || !refreshSecret) {
  throw new Error("Missing JWT secrets");
}

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, accessSecret, { expiresIn: "15m" });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret) as jwt.JwtPayload;
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret) as jwt.JwtPayload;
};

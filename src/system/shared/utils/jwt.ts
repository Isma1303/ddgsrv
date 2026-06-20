import jwt from "jsonwebtoken";
import { configuration } from "../../configuration";
import { TokenPayload } from "../interfaces/jwt.interface";

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, configuration.jwt.secret, {
    expiresIn: "8h",
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, configuration.jwt.secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

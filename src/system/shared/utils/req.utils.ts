import { Request } from "express";
import { TokenPayload } from "../interfaces/jwt.interface";
import { verifyToken } from "./jwt";

export const getUserToken = async (req: Request): Promise<TokenPayload> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new Error("Token no encontrado");
    }

    const decoded = verifyToken(token) as TokenPayload | null;
    if (!decoded) {
      throw new Error("Token inválido o firma incorrecta");
    }

    if (!decoded.user_id || !decoded.role_id) {
      throw new Error("Token sin datos requeridos");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (!decoded.exp || decoded.exp < currentTime) {
      throw new Error("Token expirado");
    }

    return {
      user_id: decoded.user_id,
      role_id: decoded.role_id,
      role_cd: decoded.role_cd,
      department_id: decoded.department_id,
      is_leader: decoded.is_leader,
      iat: decoded.iat,
      exp: decoded.exp,
    };
  } catch (error) {
    throw error;
  }
};

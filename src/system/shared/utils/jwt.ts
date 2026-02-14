import jwt from "jsonwebtoken";
import { configuration } from "../../configuration";

export const generateToken = (payload: any): string => {
    return jwt.sign(payload, configuration.jwt.secret, {
        expiresIn: "8h"
    });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, configuration.jwt.secret);
    } catch (error) {
        return null;
    }
};

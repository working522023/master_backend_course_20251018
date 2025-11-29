import jwt, { Algorithm, VerifyOptions } from "jsonwebtoken";
import { JwtPayload } from "../interfaces";
import { env } from "../../core";

export class JWTService {
  static generateToken(payload: JwtPayload): string {
    const secret = env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    return jwt.sign(payload, secret, { expiresIn: "1day" });
  }

  static verifyToken(token: string): JwtPayload {
    try {
      const secret = env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not defined");

      const decoded = jwt.verify(token, secret, {
        algorithms: ["RS256"] as Algorithm[],
      } as VerifyOptions);

      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "id" in decoded &&
        "name" in decoded &&
        "email" in decoded &&
        "role" in decoded
      ) {
        return decoded as JwtPayload;
      } else {
        throw new Error("Invalid Token Payload");
      }
    } catch (err) {
      throw new Error("Invalid Token");
    }
  }
}

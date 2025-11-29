import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource, env, UnauthorizedException } from "../core";
import { User } from "../modules";
import { GraphQLContext, JwtPayload } from "../common";

export const createContext = async (req: Request, res: Response): Promise<GraphQLContext> => {
  const context: GraphQLContext = { req, res };

  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) throw new UnauthorizedException("No token provided");

    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: payload.id } });
    if (user?.status === "active") {
      context.user = user;
    }else{
      console.log("Invalid credential");
    }
  } catch (err) {
    console.log(err);
  }

  return context;
};

import { Request, Response, NextFunction } from "express";

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = {
        username: "james.rd@gmail.com",
        password: "strPassword",
      };
      res
        .status(200)
        .json({
          status: 200,
          message: "Register successfully.",
          data: user
        });
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = {
        username: "james.rd@gmail.com",
        password: "strPassword",
      };
      res
        .status(200)
        .json({
          status: 200,
          message: "Login successfully.",
          data: user
        });
    } catch (error) {
      console.log(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res
        .status(200)
        .json({
          status: 200,
          message: "Logout successfully.",
        });
    } catch (error) {
      console.log(error);
    }
  };
}

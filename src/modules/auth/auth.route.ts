import { AuthController } from "./auth.controller";
import { AuthRoute } from "../../common";
// import { authMiddleware } from "../../core";

export const authRoutes: AuthRoute[] = [
  {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register",
  },
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
  }
];
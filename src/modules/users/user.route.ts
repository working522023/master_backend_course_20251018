import { UserRoleEnum, UserRoute } from "../../common";
import { authMiddleware } from "../../core/middlewares";
import { UserController } from "./user.controller";

export const userRoutes: UserRoute[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "getUsers",
    middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  },
  // {
  //   method: "get",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "getUser",
  //   middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  // },
  // {
  //   method: "post",
  //   route: "/users",
  //   controller: UserController,
  //   action: "createUser",
  //   middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  // },
  // {
  //   method: "put",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "updateUser",
  //   middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  // },
  // {
  //   method: "delete",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "deleteUser",
  //   middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  // },
];

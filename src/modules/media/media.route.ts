import { MediaRoute, UserRoleEnum } from "../../common";
import { authMiddleware, upload } from "../../core/middlewares";
import { MediaController } from "./media.controller";

export const mediaRoutes: MediaRoute[] = [
  {
    method: "get",
    route: "/media",
    controller: MediaController,
    action: "getAllMedia",
    middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  },
  {
    method: "get",
    route: "/media/:id",
    controller: MediaController,
    action: "getOneMedia",
    middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  },
  {
    method: "post",
    route: "/media",
    controller: MediaController,
    action: "createMedia",
    middlewares: [
      authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER]),
      upload.single("file"),
    ],
  },
  {
    method: "put",
    route: "/media/:id",
    controller: MediaController,
    action: "updateMedia",
    middlewares: [
      authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER]),
      upload.single("file"),
    ],
  },
  {
    method: "delete",
    route: "/media/:id",
    controller: MediaController,
    action: "deleteMedia",
    middlewares: [authMiddleware([UserRoleEnum.ADMIN, UserRoleEnum.USER])],
  },
];

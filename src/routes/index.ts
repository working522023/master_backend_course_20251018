import { Application, NextFunction, Request, Response } from "express";
import {
  authRoutes,
  mediaRoutes,
  userRoutes,
} from "../modules";
import { MainRoute } from "../common";

const allRoutes: MainRoute[] = [
  ...authRoutes,
  ...userRoutes,
  ...mediaRoutes
];

export const initializeRoutes = (app: Application): void => {
  allRoutes.forEach((route) => {
    const controllerInstance = new route.controller();

    const middlewares = route.middlewares || [];
    app[route.method](
      `/api/v1${route.route}`,
      ...middlewares,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await controllerInstance[route.action](req, res, next);

          if (result !== undefined && !res.headersSent) {
            res.json(result);
          }
        } catch (error) {
          next(error);
        }
      }
    );
  });
};
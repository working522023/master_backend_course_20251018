import express from "express";
import { userRoutes, productRoutes, authRoutes } from "../modules";
import { MainRoute } from "../common";

const allRoutes: MainRoute[] = [...userRoutes, ...productRoutes, ...authRoutes];

const router = express.Router();
allRoutes.forEach((route) => {
  const controller = new route.controller();
  const handler = controller[route.action].bind(controller);

  const fullRoute = `/api/v1${route.route}`;

  if (route.middlewares && route.middlewares.length > 0) {
    router[route.method](fullRoute, ...route.middlewares, handler);
  } else {
    router[route.method](fullRoute, handler);
  }
});

export default router;

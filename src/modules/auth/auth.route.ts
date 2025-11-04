import { AuthRoute } from "../../common";
import { AuthController } from "./auth.controller";

export const authRoutes: AuthRoute[] = [
    {
        method: 'post',
        route: '/auth/register',
        controller: AuthController,
        action: 'register',
    },
    {
        method: 'post',
        route: '/auth/login',
        controller: AuthController,
        action: 'login',
    },
    {
        method: 'post',
        route: '/auth/logout',
        controller: AuthController,
        action: 'logout',
    },
];

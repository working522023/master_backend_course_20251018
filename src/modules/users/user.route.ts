import { UserRoute } from '../../common';
import { UserController } from './user.controller';

export const userRoutes: UserRoute[] = [
    {
        method: 'get',
        route: '/users',
        controller: UserController,
        action: 'getUsers',
    },
    {
        method: 'get',
        route: '/users/bank',
        controller: UserController,
        action: 'getBankById',
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: 'createUser',
    },
    {
        method: "put",
        route: "/users/:id",
        controller: UserController,
        action: 'updateUser',
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: 'deleteUser',
    },
];

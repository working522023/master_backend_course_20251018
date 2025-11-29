import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { handleErrors, UserRequest } from '../../common';

export class UserController {
  private userService = new UserService();

  
  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */


  /**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = (req.query.sortBy as string) || 'createdAt';
      const sortOrder = (req.query.sortOrder as 'ASC' | 'DESC') || 'DESC';
      const search = req.query.search as string | undefined;

      const result = await this.userService.findAll(page, limit, search, sortBy as any, sortOrder);
      res.json({
        success: true,
        status: 200,
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      handleErrors(error, next, 'UserController.getUsers');
    }
  }

  
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get single user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User details
 */
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.findOne(req.params.id);
      res.json({ success: true, status: 200, data: user });
    } catch (error) {
      handleErrors(error, next, 'UserController.getUser');
    }
  }

  /**
   * POST /users
   * Create new user
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateUserDto = req.body;
      const user = await this.userService.create(dto);
      res.status(201).json({ success: true, status: 201, data: user });
    } catch (error) {
      handleErrors(error, next, 'UserController.createUser');
    }
  }

  /**
   * PUT /users/:id
   * Update user by ID
   */
  async updateUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const dto: UpdateUserDto = req.body;
      const user = await this.userService.update(req.params.id, dto);
      res.json({ success: true, status: 200, data: user });
    } catch (error) {
      handleErrors(error, next, 'UserController.updateUser');
    }
  }

  /**
   * DELETE /users/:id
   * Delete user by ID
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.delete(req.params.id);
      res.json({ success: true, status: 200, ...result });
    } catch (error) {
      handleErrors(error, next, 'UserController.deleteUser');
    }
  }
}

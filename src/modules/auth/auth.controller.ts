import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.dto";

export class AuthController {
  private readonly service = new AuthService();

  /**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */


  /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */

  async login(req: Request, res: Response, next: NextFunction) {
      try {
        const dto: LoginDto = req.body;
        const result = await this.service.login(dto);
  
        res.status(200).json({
          status: 200,
          message: "Login successful.",
          token: result.token,
        });
      } catch (error) {
        console.log(error);
      }
    }


    /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: RegisterDto = req.body;
      const created =  await this.service.register(dto);
      res.status(201).json({
        status: 201,
        message: "User registered successfully.",
        data: created,
      });
    } catch (error) {
      console.log(error);
    }
  }

}

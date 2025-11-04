import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService = new UserService;
  
  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user =  await this.userService.findAll();
        res.status(200).json({status: 200, message: "Fetch user successfully.", data: user});
    } catch (error) {
      console.log(error);
    }
  };

  geUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.IsString;
        const user = await this.userService.findById(userId);
        res.status(200).json({status: 200, message: "Fetch user by ID successfully.", data: user });
    } catch (error) {
      console.log(error);
    }
  };

  // Create User
  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const createUserDto = req.body;
        const created = await this.userService.createUser(createUserDto);
        res.status(201).json({ status: 201, msg: "Create user successful.", data: created});
    } catch (error) {
      console.log(error);
    }
  };


  // Update User
    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params;
            const userData = req.body;
            res.status(200).json({ status: 200, msg: "Updated user successful.", data: {userId, userData}});
        } catch (error) {
        console.log(error);
        }
    };


  // Delete User
  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params;
            res.status(200).json({ status: 200, msg: "Deleted user successful." });
        } catch (error) {
        console.log(error);
        }
    };

}
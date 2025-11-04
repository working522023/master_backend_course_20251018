import { Request, Response, NextFunction } from "express";

export class ProductController {
  getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const productData = {
          id: 1,
          name: "Coffee"
        }
        res.status(200).json({status: 200, message: "Fetch product successfully.", data: productData});
    } catch (error) {
      console.log(error);
    }
  };
}
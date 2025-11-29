import { Request, Response, NextFunction } from 'express';
import { handleErrors, UploadedFile, UserRequest } from '../../common';
import { MediaService } from './media.service';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';

export class MediaController {
  private mediaService = new MediaService();

  /**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management APIs
 */

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Get all media
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of all media
 */

  async getAllMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.mediaService.getAllMedia();
      res.json({ status: 201, data: users });
    } catch (error) {
      handleErrors(error, next, 'MediaController.getAllMedia');
    }
  }


  /**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Get a single media by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Media ID
 *     responses:
 *       200:
 *         description: Media object
 *       404:
 *         description: Media not found
 */

  async getOneMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.mediaService.getOneMedia(req.params.id);
      res.json({ success: true, data: user });
    } catch (error) {
      handleErrors(error, next, 'MediaController.getOneMedia');
    }
  }


  /**
 * @swagger
 * /media:
 *   post:
 *     summary: Upload new media
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 description: Title of the media
 *     responses:
 *       201:
 *         description: Media created successfully
 *       400:
 *         description: File is required
 */

  async createMedia(req: Request & { file?: UploadedFile }, res: Response, next: NextFunction) {
    try {
      const dto: CreateMediaDto = req.body;
      const file = req.file;
      const user = await this.mediaService.createMedia(dto, file);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      handleErrors(error, next, 'MediaController.createMedia');
    }
  }

  /**
 * @swagger
 * /media/{id}:
 *   put:
 *     summary: Update media info or replace file
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 description: New title
 *     responses:
 *       200:
 *         description: Media updated successfully
 */

  async updateMedia(req: Request & { file?: UploadedFile }, res: Response, next: NextFunction) {
  try {
    const dto: UpdateMediaDto = req.body;
    const file = req.file;

    const user = await this.mediaService.updateMedia(req.params.id, dto, file);
    res.json({ success: true, data: user });
  } catch (error) {
    handleErrors(error, next, 'MediaController.updateMedia');
  }
}

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete a media
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media deleted successfully
 */

async deleteMedia(req: Request, res: Response, next: NextFunction) {
  try {
    await this.mediaService.deleteMedia(req.params.id);
    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    handleErrors(error, next, 'MediaController.deleteMedia');
  }
}
}

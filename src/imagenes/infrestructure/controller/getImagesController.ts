import { Request, Response } from 'express';
import { ImageApplication } from '../../application/usecase/imageApplication';
import { MysqlImageRepository } from '../dataAccess/mysqlRepository';

const mysqlImageRepository = new MysqlImageRepository();
const imageAppService = new ImageApplication(mysqlImageRepository);

export class GetAllImagesController {
    static async getAllImages(req: Request, res: Response): Promise<any> {
        try {
            const images = await imageAppService.getAllImages();

            res.status(200).json({
                message: 'Se obtuvieron correctamente todas las imágenes',
                data: images,
            });
        } catch (error) {
            console.log('Hubo un error al obtener las imágenes', error);
            res.status(500).json({
                error: 'Hubo un error al obtener las imágenes',
            });
        }
    }
}

import { Request, Response } from 'express';
import { ImageApplication } from '../../application/usecase/imageApplication';
import { MysqlImageRepository } from '../dataAccess/mysqlRepository';
import { Image } from '../../dominio/entities/imageEntity';

const mysqlImageRepository = new MysqlImageRepository();
const imageAppService = new ImageApplication(mysqlImageRepository);

export class UpdateImageController {
    static async updateImage(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const { date, url } = req.body;
            const updatedImage: Image = { date, url };

            await imageAppService.updateImage(id, updatedImage);

            res.status(200).json({
                message: 'Imagen actualizada correctamente',
                data: updatedImage,
            });
        } catch (error) {
            console.log('Error al actualizar la imagen', error);
            res.status(500).json({
                error: 'Hubo un error al actualizar la imagen',
            });
        }
    }
}

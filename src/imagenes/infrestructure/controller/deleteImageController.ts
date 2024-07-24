import { Request, Response } from "express";
import { ImageApplication } from '../../application/usecase/imageApplication';
import { MysqlImageRepository } from '../dataAccess/mysqlRepository'; 

const mysqlImageRepository = new MysqlImageRepository();
const imageAppService = new ImageApplication(mysqlImageRepository);

export class DeleteImageController {
    static async deleteImage(req: Request, res: Response): Promise<void> {
        try {
            const imageId: number = parseInt(req.params.id);
            await imageAppService.deleteImage(imageId);

            res.status(200).json({
                message: 'Se eliminó correctamente la imagen',
                data: imageId
            });
        } catch (error) {
            console.log('Hubo un error al eliminar la imagen', error);
            res.status(500).json({
                error: 'Hubo un error al eliminar la imagen'
            });
        }
    }
}

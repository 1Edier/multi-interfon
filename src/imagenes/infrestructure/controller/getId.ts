import { Request, Response } from 'express';
import { ImageApplication } from '../../application/usecase/imageApplication';
import { MysqlImageRepository } from '../dataAccess/mysqlRepository';

const mysqlImageRepository = new MysqlImageRepository();
const imageAppService = new ImageApplication(mysqlImageRepository);

export class GetImagesByDateController {
    static async getImagesByDate(req: Request, res: Response): Promise<any> {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Se deben proporcionar las fechas de inicio y fin' });
        }

        try {
            const images = await imageAppService.getImagesByDate(new Date(startDate as string), new Date(endDate as string));

            res.status(200).json({
                message: 'Se obtuvieron correctamente las imágenes',
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

// createImage.controller.ts
import { Request, Response } from "express";
import { ImageApplication } from '../../application/usecase/imageApplication';
import { MysqlImageRepository } from '../dataAccess/mysqlRepository';
import { Image } from '../../dominio/entities/imageEntity';
import cloudinary from '../../../cloudinaryConfig/cloudinaryConfig'; // Importa la configuración de Cloudinary

const mysqlImageRepository = new MysqlImageRepository();
const imageAppService = new ImageApplication(mysqlImageRepository);

export class CreateImageController {
    static async createImage(req: Request, res: Response): Promise<any> {
        try {
            const { file } = req; // Obtén el archivo de la solicitud

            if (!file) {
                return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
            }

            // Subir la imagen a Cloudinary
            const result = await cloudinary.v2.uploader.upload(file.path);

            // Crear el objeto de imagen con la URL de Cloudinary
            const newImage: Image = { 
                id: 0, 
                date: new Date(), 
                url: result.secure_url // Obtén la URL segura proporcionada por Cloudinary
            };

            const createdImage = await imageAppService.createImage(newImage);

            res.status(201).json({
                message: 'La imagen se creó exitosamente',
                data: createdImage
            });
        } catch (error) {
            console.log('Hubo un error al crear la imagen', error);
            res.status(500).json({
                error: 'Hubo un error al crear la imagen'
            });
        }
    }
}

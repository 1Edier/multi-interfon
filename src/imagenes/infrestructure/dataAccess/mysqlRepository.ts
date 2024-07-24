import { Image } from "../../dominio/entities/imageEntity";
import { ImageRepository } from "../../dominio/repository/imageRepository";
import { query } from '../../../database/db.config';

export class MysqlImageRepository implements ImageRepository {
    async createImage(image: Image): Promise<Image> {
        const sql = 'INSERT INTO images (date, url) VALUES (?, ?)';
        const params = [image.date, image.url];

        try {
            const result: any = await query(sql, params);
            const insertId = result[0].insertId;
            if (!insertId) {
                throw new Error('No se pudo obtener el ID de la imagen insertada');
            }
            return { ...image, id: insertId }; // Retornar la imagen con el ID generado
        } catch (error) {
            console.log('Error al crear la imagen', error);
            throw new Error('Error al crear la imagen: ' + error);
        }
    }

    async getAllImages(): Promise<Image[]> {
        const sql = 'SELECT id, date, url FROM images';

        try {
            const [result]: any = await query(sql, []);
            const images: Image[] = result.map((imageData: any) => {
                return {
                    id: imageData.id,
                    date: imageData.date,
                    url: imageData.url,
                };
            });
            return images;
        } catch (error) {
            console.log('Error al obtener las imágenes', error);
            throw new Error('Error al obtener las imágenes' + error);
        }
    }

    async getImageById(id: number): Promise<Image | null> {
        const sql = 'SELECT id, date, url FROM images WHERE id = ?';
        const params = [id];

        try {
            const [result]: any = await query(sql, params);

            if (result.length > 0) {
                const imageData = result[0];
                const image: Image = {
                    id: imageData.id,
                    date: imageData.date,
                    url: imageData.url,
                };
                return image;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error al obtener la imagen por ID', error);
            throw new Error('Error al obtener la imagen por ID' + error);
        }
    }

    async updateImage(id: number, image: Image): Promise<any> {
        const sql = 'UPDATE images SET date = ?, url = ? WHERE id = ?';
        const params = [image.date, image.url, id];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al actualizar la imagen', error);
            throw new Error('Error al actualizar la imagen' + error);
        }
    }

    async deleteImage(id: number): Promise<any> {
        const sql = 'DELETE FROM images WHERE id = ?';
        const params = [id];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al eliminar la imagen', error);
            throw new Error('Error al eliminar la imagen' + error);
        }
    }

    async getImagesByDate(startDate: Date, endDate: Date): Promise<Image[]> {
        const sql = 'SELECT id, date, url FROM images WHERE date BETWEEN ? AND ?';
        const params = [startDate.toISOString().slice(0, 19).replace('T', ' '), endDate.toISOString().slice(0, 19).replace('T', ' ')];

        try {
            const [result]: any = await query(sql, params);
            const images: Image[] = result.map((imageData: any) => {
                return {
                    id: imageData.id,
                    date: imageData.date,
                    url: imageData.url,
                };
            });
            return images;
        } catch (error) {
            console.log('Error al obtener las imágenes por fecha', error);
            throw new Error('Error al obtener las imágenes por fecha' + error);
        }
    }
}

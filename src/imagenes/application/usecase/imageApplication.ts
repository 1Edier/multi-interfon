import { Image } from '../../dominio/entities/imageEntity';
import { ImageRepository } from '../../dominio/repository/imageRepository';

export class ImageApplication {
    constructor(private imageRepository: ImageRepository) {}

    async createImage(image: Image): Promise<any> {
        return await this.imageRepository.createImage(image);
    }

    async getAllImages(): Promise<Image[]> {
        return await this.imageRepository.getAllImages();
    }

    async getImagesByDate(startDate: Date, endDate: Date): Promise<Image[]> {
        return await this.imageRepository.getImagesByDate(startDate, endDate);
    }

    async updateImage(id: number, image: Image): Promise<any> {
        return await this.imageRepository.updateImage(id, image);
    }

    async deleteImage(id: number): Promise<any> {
        return await this.imageRepository.deleteImage(id);
    }
}

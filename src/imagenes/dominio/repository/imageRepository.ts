// image.repository.ts
import { Image } from "../entities/imageEntity";

export interface ImageRepository {
    getAllImages(): Promise<Image[]>;
    createImage(image: Image): Promise<any>;
    deleteImage(imageId: number): Promise<any>;
    updateImage(imageId: number, newData: Partial<Image>): Promise<any>;
    getImagesByDate(startDate: Date, endDate: Date): Promise<Image[]>; 
}
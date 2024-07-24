// image.router.ts
import express from 'express';
import multer from 'multer';
import { CreateImageController } from '../controller/createimageController';
import { DeleteImageController } from '../controller/deleteImageController';
import { UpdateImageController } from '../controller/editImageController';
import { GetAllImagesController } from '../controller/getImagesController';
import { GetImagesByDateController } from '../controller/getId';

const upload = multer({ dest: 'uploads/' }); // Configura multer para manejar la carga de archivos

const router = express.Router();

router.post('/', upload.single('image'), CreateImageController.createImage); // Asegúrate de que 'image' coincida
router.delete('/:id', DeleteImageController.deleteImage);
router.put('/:id', UpdateImageController.updateImage);
router.get('/', GetAllImagesController.getAllImages);
router.get('/fecha', GetImagesByDateController.getImagesByDate);

export default router;

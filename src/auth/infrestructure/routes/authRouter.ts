import express from 'express';
import { AuthController } from '../controller/authUser';

export const router = express.Router();

router.post('/', AuthController.login);

export default router;

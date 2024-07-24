import express from 'express';
import { UserController } from '../controller/userController';
import { DeleteController } from '../controller/deleteUserController';

export const router = express.Router();

router.post('/', UserController.createUser);
router.delete('/:id', DeleteController.deleteUser);

export default router;

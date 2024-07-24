import { Request, Response } from "express";
import { UserApplication } from '../../application/usecases/userApplication';
import { MysqlRepository } from '../dataAccess/MysqlRepository';
import { EncryptService } from "../helpers/encryptHelpers";
import { User } from "../../dominio/entities/user";

const mysqlRepository = new MysqlRepository();
const userAppService = new UserApplication(mysqlRepository);
const encryptPassword = new EncryptService();

export class UserController {
    static async createUser(req: Request, res: Response): Promise<any> {
        try {
            const { correo, password, rol } = req.body;
            const hashedPassword = encryptPassword.endecodePassword(password);
            const newUser = new User(0, correo, hashedPassword, rol);

            await userAppService.createUser(newUser);

            res.status(201).json({
                message: 'El usuario se creó exitosamente',
                data: newUser
            });
        } catch (error) {
            console.log('Hubo un error al crear el usuario', error)
            res.status(500).json({
                error: 'Hubo un error al crear el usuario'
            });
        }
    }
}
import { Request, Response } from "express";
import { UserApplication } from "../../application/usecases/userApplication";
import { MysqlRepository } from '../dataAccess/MysqlRepository'; 
const mysqlRepository = new MysqlRepository();
const userAppService = new UserApplication(mysqlRepository);

export class DeleteController {
    static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId: number = parseInt(req.params.id);
            await userAppService.deleteUser(userId);
     
            res.status(200).json({
                message: 'Se eliminó correctamente al usuario',
                data: userId
            });
        } catch (error) {
            console.log('Hubo un error al eliminar el usuario', error);
            res.status(500).json({
                error: 'Hubo un error al eliminar el usuario'
            });
        }
    }
}
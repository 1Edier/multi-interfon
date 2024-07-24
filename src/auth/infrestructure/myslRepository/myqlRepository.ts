import { query } from "../../../database/db.config";
import { AuthUser } from "../../dominio/repository/authUser";

export class MysqlRepository implements AuthUser {
    getUserByEmail = async (correo: string): Promise<any> => {
        const sql = 'SELECT password, rol FROM users WHERE correo = ?';

        const params: any[] = [correo];
        
        try {
            const result: any = await query(sql, params);
            
            if (!result) {
                return null; 
            }
            
            return result; 
        } catch (error) {
            console.log('Hubo un error al buscar el usuario', error);
            throw error;
        }
    }
}

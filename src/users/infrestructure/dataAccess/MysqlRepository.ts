import { query } from '../../../database/db.config';
import { User } from '../../dominio/entities/user';
import { UserRepository } from '../../dominio/repository/UserRepository';

export class MysqlRepository implements UserRepository {
    createUser = async (user: User): Promise<any> => {
        const sql = 'INSERT INTO users (correo, password, rol) VALUES (?, ?, ?)';
        const params = [user.correo, user.password, user.rol];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al crear el usuario en MySQL', error);
            throw new Error('Error al crear el usuario en MySQL' + error);
        }
    }

    deleteUser = async (userId: number): Promise<any> => {
        const sql = 'DELETE FROM users WHERE id = ?';
        const params = [userId];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.log('Error al eliminar el usuario', error);
            throw new Error('Hubo un error al eliminar el usuario' + error);
        }
    }
}
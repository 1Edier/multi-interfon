import bcrypt from 'bcrypt';
import { EcryptService } from '../../application/services/encryptService';

export class EncryptService implements EcryptService {
     
  endecodePassword(password: string): string {
      const pass = bcrypt.hashSync(password, 10);
      return pass;
  }
}
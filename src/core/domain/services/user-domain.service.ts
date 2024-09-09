import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserDomainService {
  createUser(
    name: string,
    email: string,
    username: string,
    password: string, // Aquí ya recibimos la contraseña hasheada
  ): User {
    return User.create(name, email, username, password);
  }
}

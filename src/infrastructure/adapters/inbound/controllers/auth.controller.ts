import { AuthApplicationService } from '@/core/application/services';
import { LoginDto } from '@/infrastructure/dtos/tenant/auth/login.dto';
import {
  Controller,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthApplicationService) {}

  @Post('login')
  @HttpCode(200) // Retornamos código 200 en caso de éxito
  @ApiOperation({ summary: 'User login' }) // Descripción en Swagger
  @ApiBody({ type: LoginDto }) // Documentamos el cuerpo de la petición
  @ApiResponse({ status: 200, description: 'Login successful' }) // Respuesta exitosa
  @ApiResponse({ status: 401, description: 'Invalid credentials' }) // Credenciales inválidas
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    console.log("from authcontroller:", user);
    return this.authService.login(user);
  }
}

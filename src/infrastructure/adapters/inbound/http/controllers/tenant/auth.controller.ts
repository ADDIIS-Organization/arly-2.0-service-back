import { Controller, Post, Body, HttpCode, Inject } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { IAuthApplicationPort } from '@/core/application/ports/inbound/auth-application.port';
import { LoginDto } from '@/infrastructure/dtos/tenant/auth/login.dto';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthApplicationPort')
    private readonly authApplicationService: IAuthApplicationPort,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authApplicationService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.authApplicationService.login(user, loginDto.tenantId);
  }
}

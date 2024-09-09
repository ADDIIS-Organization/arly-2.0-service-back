import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class RoleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // Excepcion must be logged
    console.log('Exception Name:', exception.name);
    console.log('Exception:', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Manejar UnauthorizedException (credenciales inválidas)
    if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message || 'Unauthorized';
    }
    // Manejar EntityNotFoundError
    else if (exception.name === 'EntityNotFoundError') {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }
    // Manejar QueryFailedError
    else if (exception.name === 'QueryFailedError') {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}

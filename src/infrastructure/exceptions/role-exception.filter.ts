import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';


@Catch()
export class RoleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception.name === 'EntityNotFoundError') {
      status = HttpStatus.NOT_FOUND;
      message = 'Role not found';
    } else if (exception.name === 'QueryFailedError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid role data';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (request.session && request.session.user) {
      /**
       * check redirect
       */
      response.redirect('/dashboard');
    } else if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      response.redirect('/login');
    } else {
      response.redirect('/login');
    }
  }
}

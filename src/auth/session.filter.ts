import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { SessionUnauthorizedException } from './sessionUnauthorized.exception';

@Catch()
export class SessionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //response.redirect('/');
    //throw new SessionUnauthorizedException();
  }
}
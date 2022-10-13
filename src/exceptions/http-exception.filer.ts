import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/*
  @Catch(HttpException)은
  http통신의 예외를 캐치하겠다는 뜻입니다. 
  만약 모든 예외를 캐치하고 싶다면
  
  @Catch()로 적용하시면 됩니다.
*/
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exeption filter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    console.log(exception.name);
    console.log(exception.message);
    console.log(exception);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}

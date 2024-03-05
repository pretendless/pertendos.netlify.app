import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { TimingInterceptor, LoggedInInterceptor } from './common.interceptor';

@ApiTags("Common")
@Controller()
@UseInterceptors(TimingInterceptor, LoggedInInterceptor)
export class CommonController {
  @Get('/')
  @ApiExcludeEndpoint()
  @Render('index.pug')
  root() {
    return;
  }
}

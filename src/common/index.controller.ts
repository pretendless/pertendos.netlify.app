import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { TimingInterceptor, LoggedInInterceptor } from './common.interceptor';

@ApiTags("Common")
@Controller()
@UseInterceptors(TimingInterceptor, LoggedInInterceptor)
export class IndexController {
  @Get('/index')
  @ApiExcludeEndpoint()
  @Render('index.pug')
  root() {
    return;
  }
}

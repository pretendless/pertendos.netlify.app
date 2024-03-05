import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { LoggedInInterceptor, TimingInterceptor } from './common.interceptor';

@ApiTags("Common")
@Controller()
@UseInterceptors(TimingInterceptor, LoggedInInterceptor)
export class AboutController {
  @Get('/about')
  @ApiExcludeEndpoint()
  @Render('about.pug')
  root() {
    return;
  }
}

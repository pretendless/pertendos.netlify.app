import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('feedback')
export class FeedbackController {
    @Get()
    @ApiExcludeEndpoint()
    @Render('feedback.pug')
    getFeed() {
      return;
    }
    
}
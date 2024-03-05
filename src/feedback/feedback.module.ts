import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { FeedbackGateway } from './feedback.gateway';
import { FeedbackController } from './feedback.controller';

@Module({
    imports: [UsersModule],
    controllers: [FeedbackController],
    providers: [FeedbackGateway]
})
export class FeedbackModule { }

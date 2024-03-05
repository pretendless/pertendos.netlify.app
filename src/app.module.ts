import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import * as path from 'path';
import { I18nModule } from 'nestjs-i18n';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    CommonModule,
    OrderModule,
    ProductModule,
    PrismaModule,
    UsersModule,
    HttpModule,
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://try.supertokens.com",
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: "pertendios-project2",
        apiDomain: "http://localhost:2288",
        websiteDomain: "http://localhost:2288",
        apiBasePath: "/auth",
        websiteBasePath: "/index"
      },
    }),
    FeedbackModule,
  ]
})
export class AppModule {}
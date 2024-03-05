import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { ContactsController } from './contacts.controller';
import { IndexController } from './index.controller';
import { CommonController } from './common.controller';
import { ShopController } from './shop.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    HttpModule, 
    UsersModule,
    ProductModule
  ],
  controllers: [
    CommonController,
    AboutController,
    ContactsController,
    IndexController,
    ShopController
  ],
  providers: [
    PrismaService,
    ProductService
  ]
})
export class CommonModule {}

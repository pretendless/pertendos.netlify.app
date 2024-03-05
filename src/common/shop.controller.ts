import { Get, Controller, Render, UseInterceptors, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';
import { json } from 'stream/consumers';
import { plainToClass } from "class-transformer";
import { TimingInterceptor, LoggedInInterceptor } from './common.interceptor';
import { query } from 'express';

@ApiTags("Common")
@Controller()
@UseInterceptors(TimingInterceptor, LoggedInInterceptor)
export class ShopController {
  constructor(private readonly productService: ProductService) {}

  @Get('/shop')
  @ApiExcludeEndpoint()
  @Render('shop.pug')
  async findAll(@Query() query: {page: number}) {
    const products:JSON = <JSON><unknown>{
      "products": await this.productService.findAll(),
      "page": query.page ? query.page : 1
    }
    return products;
  }
}
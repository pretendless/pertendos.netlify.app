import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Render,
  UseInterceptors,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/query.dto';
import { ApiCookieAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInInterceptor, TimingInterceptor } from 'src/common/common.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionFilter } from 'src/auth/session.filter';

@ApiTags('Product')
@Controller('product')
@UseInterceptors(TimingInterceptor, LoggedInInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiCookieAuth()
  @ApiOperation({summary: "Создать Продукт"})
  @ApiResponse({ status: 200, description: 'Продукт был успешно создан.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({summary: "Получить Все Продукты"})
  @ApiResponse({ status: 200, description: 'Все продукты.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('create')
  @Render('product-create.pug')
  @ApiCookieAuth()
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiResponse({ status: 200, description: 'Форма создания продукта.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  getCreationForm() {
    return;
  }

  @Post('create')
  @ApiCookieAuth()
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiResponse({ status: 201, description: 'Продукт был успешно создан.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  createByForm(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @Render('product.pug')
  @ApiExcludeEndpoint()
  @ApiResponse({ status: 200, description: 'Полученный продукт.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  findOne(@Param('id') id: string, @Query() query: ProductQueryDto) {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiCookieAuth()
  @ApiOperation({summary: "Изменить Продукт по ID"})
  @ApiResponse({ status: 200, description: 'Продукт был успешно изменен.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(Number.parseInt(id), updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiCookieAuth()
  @ApiOperation({summary: "Удалить Продукт по ID"})
  @ApiResponse({ status: 200, description: 'Продукт был успешно удален.'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  remove(@Param('id') id: string) {
    return this.productService.remove(Number.parseInt(id));
  }
}

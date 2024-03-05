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
  import { OrderService } from './order.service';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderDto } from './dto/update-order.dto';
  import { OrderQueryDto } from './dto/query.dto';
  import { ApiCookieAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { ProductService } from 'src/product/product.service';
  import { LoggedInInterceptor, TimingInterceptor } from 'src/common/common.interceptor';
  import { AuthGuard } from 'src/auth/auth.guard';
  import { SessionFilter } from 'src/auth/session.filter';
  
  @ApiTags('Order')
  @Controller('order')
  @UseInterceptors(TimingInterceptor, LoggedInInterceptor)
  export class OrderController {
    constructor(private readonly orderService: OrderService, private readonly productService: ProductService
      ) {}
  
    @Post()
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    @UseFilters(SessionFilter)
    @ApiOperation({summary: "Создать Заказ"})  
    @ApiResponse({ status: 201, description: 'Заказ был успешно создан.'})
    @ApiResponse({ status: 403, description: 'Отказано.' })
    create(@Body() createOrderDto: CreateOrderDto, @Query() query: OrderQueryDto) {
        return this.orderService.create(Number.parseInt(query.products), createOrderDto);
    }
    
    @Get()
    @ApiCookieAuth()
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard)
    @UseFilters(SessionFilter)
    @Render('order.pug')
    @ApiResponse({ status: 201, description: 'Форма заказа успешно создана'})
    @ApiResponse({ status: 403, description: 'Отказано.' })
    findProduct(@Query() query: OrderQueryDto) {
      return this.productService.findOne(Number.parseInt(query.products));
    }

    @Get('AllOrders')
    @ApiCookieAuth()
    @ApiOperation({summary: "Получить Все Заказы"})
    @ApiResponse({ status: 200, description: 'Все заказы.'})
    @ApiResponse({ status: 403, description: 'Отказано.' })
    findAll(@Query() query: OrderQueryDto) {
      return this.orderService.findAll();
    }
  
    @Get(':id')
    @ApiCookieAuth()
    @ApiOperation({summary: "Получить Заказ по ID"})
    @ApiResponse({ status: 200, description: 'Информация Запрошенного Заказа Получена.'})
    @ApiResponse({ status: 403, description: 'Отказано.' })
    findOne(@Param('id') id: string, @Query() query: OrderQueryDto) {
      return this.orderService.findOne(Number.parseInt(id));
    }

    @Patch(':id')
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    @UseFilters(SessionFilter)
    @ApiOperation({summary: "Изменить Заказ по ID"})
    @ApiResponse({ status: 200, description: 'Заказ был успешно изменен.'})
    @ApiResponse({ status: 403, description: 'Отказано.' })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
      return this.orderService.update(Number.parseInt(id), updateOrderDto);
    }
  
    @Delete(':id')
    @ApiCookieAuth()
    @UseGuards(AuthGuard)
    @UseFilters(SessionFilter)
    @ApiOperation({summary: "Удалить Заказ по ID"})
    @ApiResponse({ status: 200, description: 'Заказ был успешно удален.'})
    @ApiResponse({ status: 403, description: 'Отказано.' })
    remove(@Param('id') id: string) {
      return this.orderService.remove(Number.parseInt(id));
    }
  }
  
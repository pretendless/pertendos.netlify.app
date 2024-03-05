import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { from, map, throwError, throwIfEmpty } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { isEmpty } from 'src/utils';
import { PrismaError } from 'src/utils/prismaError';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderNotFoundException } from './fckThisHeroku';


@Injectable()
export class OrderService {
  private logger = new Logger(OrderService.name);

  constructor(private prismaService: PrismaService, private readonly productService: ProductService) {}

  async create(productId: number, createOrderDto: CreateOrderDto) {
    createOrderDto.productId = String(productId);
    const result = await this.prismaService.order.create({
      data: createOrderDto,
    });
    this.logger.log(`Order has been created : ${JSON.stringify(result)}`);
    return result;
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  async findOne(id: number) {
    const result = await this.prismaService.order.findUnique({
      where: { id },
    });
    if(result == null)
      throw new OrderNotFoundException(String(id));
    return result;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const result = await this.prismaService.order.update({
        data: updateOrderDto,
        where: { id },
      });
      this.logger.warn(`Order has been updated : ${JSON.stringify(result)}`);
      return result;
    }
    catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new OrderNotFoundException(String(id));
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prismaService.order.delete({ where: { id } });
      this.logger.warn(`Order has been deleted : ${JSON.stringify(result)}`);
      return result;
    }
    catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new OrderNotFoundException(String(id));
      }
      throw error;
    }
  }
}
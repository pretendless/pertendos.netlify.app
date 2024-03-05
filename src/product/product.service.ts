import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { from, throwIfEmpty } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductNotFoundException } from './exceptions/productNotFound.exception';

@Injectable()
export class ProductService {
  private logger = new Logger(ProductService.name);

  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const result = await this.prismaService.product.create({
      data: createProductDto,
    });
    this.logger.log(`Product has been created : ${JSON.stringify(result)}`);
    return result;
  }


  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const result = await this.prismaService.product.findUnique({
      where: { id },
    });
    if(result == null)
      throw new ProductNotFoundException(String(id));
    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {  
      const result = await this.prismaService.product.update({
        data: updateProductDto,
        where: { id },
      });
      this.logger.warn(`Product has been updated : ${JSON.stringify(result)}`);
      return result;
    }
    catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProductNotFoundException(String(id));
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prismaService.product.delete({ where: { id } });
      this.logger.warn(`Product has been deleted : ${JSON.stringify(result)}`);
      return result;
    }
    catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProductNotFoundException(String(id));
      }
      throw error;
    }
  }
}

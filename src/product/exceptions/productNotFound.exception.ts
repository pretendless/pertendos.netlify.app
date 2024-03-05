import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(productId: string) {
    super(`Product with id ${productId} not found`);
  }
}
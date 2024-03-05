import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
  constructor(orderId: string) {
    super(`Order with id ${orderId} not found`);
  }
}
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto {
  @ApiPropertyOptional()
  id?: string;
  @ApiPropertyOptional()
  username?: string;
  @ApiPropertyOptional()
  firstName?: string;
  @ApiPropertyOptional()
  lastName?: string;
  @ApiPropertyOptional()
  email?: string;
  @ApiPropertyOptional()
  orders: Order[];
}
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Product } from "@prisma/client";

export class UpdateOrderDto {
  @ApiPropertyOptional()
  customerFirstName?: string;
  
  @ApiPropertyOptional()
  customerLastName?: string;
  
  @ApiPropertyOptional()
  productsPrice?: string;
  
  @ApiPropertyOptional()
  productsQuantity?: string;
  
  @ApiPropertyOptional()
  orderCountry?: string;
  
  @ApiPropertyOptional()
  orderCity?: string;
  
  @ApiPropertyOptional()
  orderAddress?: string;
  
  @ApiPropertyOptional()
  orderZipCode?: string;
  
  @ApiPropertyOptional()
  orderPayment?: string;
  
  @ApiPropertyOptional()
  orderEmail?: string;
  
  @ApiPropertyOptional()
  createdAt?: Date;
  
  @ApiPropertyOptional()
  orderStatus?: string;
 
  @ApiPropertyOptional()
  productId?: string;
}

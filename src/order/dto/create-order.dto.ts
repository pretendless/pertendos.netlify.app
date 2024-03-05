import { ApiPropertyOptional } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { IsEmail, IsNumber, IsPositive, IsString } from "class-validator";

/*

{"id":9,
"customerId":null,
"customerFirstName":"1212",
"customerLastName":"jkj",
"productId":"2",
"productsPrice":null,
"productsQuantity":"3",
"orderCountry":"Россия (RUS)",
"orderCity":"132",
"orderAddress":"1221",
"orderZipCode":"ывыв",
"orderPayment":"on",
"orderEmail":null,
"createdAt":"2022-05-20T10:08:18.327Z",
"orderStatus":null,
"isLoggedIn":true,
"currentUserName":"pretendless3",
"duration":794.9611999988556}

*/

export class CreateOrderDto {
  @ApiPropertyOptional()
  //@IsString()
  customerFirstName?: string;

  @ApiPropertyOptional()
  //@IsString()
  customerLastName?: string;
  
  @ApiPropertyOptional()
  productsPrice?: string;
  
  @ApiPropertyOptional()
  //@IsNumber()
  productsQuantity?: string;
  
  @ApiPropertyOptional()
  //@IsString()
  orderCountry?: string;
  
  @ApiPropertyOptional()
  //@IsString()
  orderCity?: string;
  
  @ApiPropertyOptional()
  //@IsString()
  orderAddress?: string;
  
  @ApiPropertyOptional()
  //@IsString()
  orderZipCode?: string;
  
  @ApiPropertyOptional()
  //@IsString()
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
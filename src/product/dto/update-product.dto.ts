import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProductDto {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  price?: number;
  @ApiPropertyOptional()
  description?: string;
}
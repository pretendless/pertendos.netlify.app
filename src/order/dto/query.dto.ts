import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class OrderQueryDto {
  @ApiPropertyOptional()
  customer?: boolean;
  @ApiPropertyOptional()
  products?: string;
}
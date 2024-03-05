import { ApiProperty } from "@nestjs/swagger";

export class ConnectOrderDto {
  @ApiProperty()
  id: string;
}
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @ApiHideProperty()
  password: string;
  
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;
}

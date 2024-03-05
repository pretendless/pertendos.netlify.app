import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/utils/prismaError';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { AuthModule } from 'src/auth/auth.module';
import { SupertokensService } from 'src/auth/supertokens/supertokens.service';
import * as EPService from 'supertokens-node/lib/build/recipe/emailpassword';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private prismaService: PrismaService, private httpService: HttpService) { }


  signup(email: string, password: string) : any {
    return firstValueFrom(this.httpService.post('https://pertendos-project2.herokuapp.com/auth/signup', {
      formFields: [
          {
              id: "email",
              value: email
          },
          {
              id: "password",
              value: password
          }
      ]
    }));
  }

  signin(email: string, password: string) : any {
    return firstValueFrom(this.httpService.post('https://pertendos-project2.herokuapp.com/auth/signin', {
        formFields: [
            {
                id: "email",
                value: email
            },
            {
                id: "password",
                value: password
            }
        ]
    }));
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.prismaService.user.create({ data: createUserDto });
    this.logger.log(`User has been created : ${JSON.stringify(result)}`)
    return result
  }

  findAll(query: Prisma.UserInclude) {
    return this.prismaService.user.findMany({ include: query });
  }

  async findOne(id: string) {
    const result = await this.prismaService.user.findUnique({ where: { id } });
    if(result == null) throw new UserNotFoundException(String(id));
    return result;
  }

  getUserByEmail(email: string) {
    const result = this.prismaService.user.findUnique({ where: { email } });
    if(result == null) throw new UserNotFoundException(String(email));
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.prismaService.user.update({
        data: updateUserDto,
        where: { id },
      });
      this.logger.warn(`User has been updated : ${JSON.stringify(result)}`)
      return result
    }
    catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new UserNotFoundException(String(id));
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prismaService.user.delete({ where: { id } });
      this.logger.warn(`User has been deleted : ${JSON.stringify(result)}`)
      return result
    }
    catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new UserNotFoundException(String(id));
      }
      throw error;
    }
  }
}

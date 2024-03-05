import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Session,
  Res,
  UseInterceptors,
  UseFilters
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/query.dto';
import * as bcrypt from 'bcrypt';
import { isEmpty } from '../utils';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInInterceptor, TimingInterceptor } from 'src/common/common.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionFilter } from 'src/auth/session.filter';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(TimingInterceptor, LoggedInInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({summary: "Создание Пользователя"})
  @ApiResponse({ status: 201, description: 'Пользователь создан'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/logout')
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Закончить Сессию Пользователя"})
  async logout(@Session() session: SessionContainer, @Res() res) {
    if (session) {
      console.log(`User Disconnected ${session.getHandle()} apparently`)
      await session.revokeSession(session.getHandle());
    }
    res.status(302).redirect('/');
  }

  @Post('/signin')
  @ApiOperation({summary: "Начать Сессию Пользователя"})
  @ApiResponse({ status: 200, description: 'Вход успешно выполнен'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  async signinPost(@Body() createUserDto: CreateUserDto, @Res() res) {
    try { 
      const { data: { status }, headers } = await this.usersService.signin(createUserDto.email, createUserDto.password);
      if (status !== 'OK') throw new Error(status);
      res.set('set-cookie', headers['set-cookie'])
        .status(302)
        .redirect('/');
    } catch(e) {
      res.status(302).redirect('signin');
    }
  }

  @Post('/signup')
  @ApiOperation({summary: "Зарегестрировать Пользователя на SuperTokens"})
  @ApiResponse({ status: 200, description: 'Пользователь зарегестрирован'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  async signupPost(@Body() createUserDto: CreateUserDto, @Res() res) {
    try { 
      const signupResponse = await this.usersService.signup(createUserDto.email, createUserDto.password);
      const signinResponse = signupResponse.data.status === 'OK' 
        ? null
        : await this.usersService.signin(createUserDto.email, createUserDto.password);
      const { data, headers } = signinResponse ? signinResponse : signupResponse;
      if (data.status !== 'OK') {
        throw new Error(JSON.stringify(data));
      }
      createUserDto.id = data.user.id;
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      await this.usersService.create(createUserDto); 
      res.set('set-cookie', headers['set-cookie'])
        .status(302)
        .redirect('/');
    } catch(e) {
      console.log(`${e.message}. ${e.response?.data?.message}.`);
      res.status(302).redirect('signup');
    }
  }

  @ApiCookieAuth()
  @Get()
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiOperation({summary: "Получить Всех Пользователей"})
  @ApiResponse({ status: 200, description: 'Список Всех Пользователей'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(isEmpty(query) ? null : query);
  }

  @ApiCookieAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiOperation({summary: "Получить Пользователя по ID"})
  @ApiResponse({ status: 200, description: 'Пользователь по ID получен'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiCookieAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiOperation({summary: "Изменить Данные Пользователя по ID"})
  @ApiResponse({ status: 200, description: 'Пользователь по ID изменен'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiCookieAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseFilters(SessionFilter)
  @ApiOperation({summary: "Удалить Пользователя по ID"})
  @ApiResponse({ status: 200, description: 'Пользователь по ID удален'})
  @ApiResponse({ status: 403, description: 'Отказано.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

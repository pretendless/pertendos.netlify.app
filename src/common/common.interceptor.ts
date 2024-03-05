import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Res,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getSession } from 'supertokens-node/recipe/session';
import { UsersService } from 'src/users/users.service';

export interface Res<T> {
  data: T;
}

@Injectable()
export class TimingInterceptor<T> implements NestInterceptor<T, Res<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Res<T>> {
    const startStamp = performance.now();
    return next.handle().pipe(
      map((data) => {
        const res = performance.now() - startStamp;
        return {
          ...data,
          duration: res,
        };
      }),
    );
  }
}

@Injectable()
export class LoggedInInterceptor<T> implements NestInterceptor<T, Res<T>> {
  constructor(private readonly usersService: UsersService) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Res<T>>> {
    const [req] = await context.getArgs();
    let session;
    try {session = await getSession(req, Res);}
    catch(e){}
    const isLoggedIn = Boolean(session);
    const user = isLoggedIn ? await this.usersService.findOne(session.getUserId()) : null;
    const userName = isLoggedIn ? user.username : "Log in ->";

    return next.handle().pipe(
      map((data) => {
        return {
            ...data,
            isLoggedIn: isLoggedIn,
            currentUserName: userName,
            //currentUserEmail: user.email
        }
      }),
    );
  }
}

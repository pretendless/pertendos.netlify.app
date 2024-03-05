import { createParamDecorator, ExecutionContext, Res } from '@nestjs/common';
import { getSession } from 'supertokens-node/recipe/session';

export const Session = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => { 
    const [req] = await ctx.getArgs();
    let session;
    try {session = await getSession(req, Res);}
    catch(e){}
    return session;
  },
);
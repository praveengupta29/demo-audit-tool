import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { JwtPayload } from './jwt-payload.interface';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();

    const { user } = request;

    if (user.id) {
      return request.user;
    }
    throw new BadRequestException('Invalid User');
  },
);

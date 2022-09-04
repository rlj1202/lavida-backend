import { SetMetadata } from '@nestjs/common';

export const Jwtauth = (...args: string[]) => SetMetadata('jwtauth', args);

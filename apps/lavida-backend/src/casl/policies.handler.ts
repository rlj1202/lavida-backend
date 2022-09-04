import { ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { AppAbility } from './casl-ability.factory';

interface IPolicyHandler {
  handle(
    ability: AppAbility,
    request: Request,
    moduleRef: ModuleRef,
  ): Promise<boolean>;
}

type PolicyHandlerCallback = (
  ability: AppAbility,
  request: Request,
  moduleRef: ModuleRef,
) => Promise<boolean>;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

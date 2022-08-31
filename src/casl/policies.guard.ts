import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { POLICIES_KEY } from './policies.constants';
import { PolicyHandler } from './policies.handler';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.getAllAndMerge<PolicyHandler[]>(POLICIES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    const request: Request = context.switchToHttp().getRequest();

    const user = context.switchToHttp().getRequest().user as User;
    const ability = this.caslAbilityFactory.createForUser(user);

    const results = await Promise.all(
      policyHandlers.map((handler) =>
        this.execPolicyHandler(handler, ability, request, this.moduleRef),
      ),
    );

    const allowed = results.every((value) => value);

    return allowed;
  }

  private async execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    request: Request,
    moduleRef: ModuleRef,
  ): Promise<boolean> {
    if (typeof handler === 'function') {
      return await handler(ability, request, moduleRef);
    }

    return await handler.handle(ability, request, moduleRef);
  }
}

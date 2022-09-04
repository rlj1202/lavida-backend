import { Type } from '@nestjs/common';
import { Request } from 'express';
import { Subjects } from './casl-ability.factory';
import { Action } from './casl.enum';
import CheckPolicies from './policies.decorator';

/**
 * For easy use of CheckPolicies decorator.
 * @see {CheckPolicies}
 * @experimental
 */
const UseAbility = <T extends Subjects, S extends Type<any>>(
  action: Action,
  subject: T,
  service?: S,
  provider?: (
    request: Request,
    serviceInstance: InstanceType<S>,
  ) => Promise<T extends { prototype: infer R } ? R : T>,
) =>
  CheckPolicies(async (ability, request, moduleRef) =>
    ability.can(
      action,
      provider ? await provider(request, moduleRef.get(service)) : subject,
    ),
  );

export default UseAbility;

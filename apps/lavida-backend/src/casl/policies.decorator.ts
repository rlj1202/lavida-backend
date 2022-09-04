import { SetMetadata } from '@nestjs/common';
import { POLICIES_KEY } from './policies.constants';

import { PolicyHandler } from './policies.handler';

/**
 * Define rules for authorization
 * @see {PolicyHandler}
 */
const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(POLICIES_KEY, handlers);

export default CheckPolicies;

import { SetMetadata } from '@nestjs/common';
import { POLICIES_KEY } from './policies.constants';

import { PolicyHandler } from './policies.handler';

const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(POLICIES_KEY, handlers);

export default CheckPolicies;

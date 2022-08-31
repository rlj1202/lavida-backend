import { Type } from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { Subjects } from './casl-ability.factory';
import { Action } from './casl.enum';
import CheckPolicies from './policies.decorator';

/** @experimental */
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

class TestClass {
  @UseAbility(Action.Create, Comment, CommentsService, (req, service) =>
    service.findById(parseInt(req.params.id)),
  )
  async asdf() {}
}

export default UseAbility;

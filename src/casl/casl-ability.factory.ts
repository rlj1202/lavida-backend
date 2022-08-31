import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/entities/article.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { Submission } from 'src/submissions/entities/submission.entity';
import { User } from 'src/users/entities/user.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { Action } from './casl.enum';

export type Subjects =
  | InferSubjects<
      | typeof Article
      | typeof User
      | typeof Comment
      | typeof Board
      | typeof Workbook
      | typeof Problem
      | typeof Submission
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor() {}

  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin()) {
      can(Action.Manage, 'all');
    }

    can(Action.Read, 'all');
    can(Action.Create, [Article, Comment, Workbook]);
    can([Action.Update, Action.Delete], Article, { author: { id: user.id } });
    can([Action.Update, Action.Delete], Comment, { author: { id: user.id } });
    can([Action.Update, Action.Delete], User, { id: user.id });

    cannot(Action.Delete, Submission);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

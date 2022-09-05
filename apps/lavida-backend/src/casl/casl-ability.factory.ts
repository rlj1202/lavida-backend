import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Article } from '../../src/articles/entities/article.entity';
import { Board } from '../../src/boards/entities/board.entity';
import { Comment } from '../../src/comments/entities/comment.entity';
import { Contest } from '../../src/contests/entities/contest.entity';
import { Problem } from '../../src/problems/entities/problem.entity';
import { Role } from '../../src/roles/entities/role.entity';
import { Submission } from '../../src/submissions/entities/submission.entity';
import { User } from '../../src/users/entities/user.entity';
import { Workbook } from '../../src/workbooks/entities/workbook.entity';
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
      | typeof Role
      | typeof Contest
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

    // Articles
    can(Action.Read, Article);
    can(Action.Create, Article);
    cannot(Action.Create, Article, { board: { slug: 'notice' } });
    can([Action.Update, Action.Delete], Article, { author: { id: user.id } });

    // Boards
    can(Action.Read, Board);

    // Comments
    can(Action.Read, Comment);
    can(Action.Create, Comment);
    can([Action.Update, Action.Delete], Comment, { author: { id: user.id } });

    // Users
    can(Action.Read, User);
    can(Action.Create, User);
    can([Action.Update, Action.Delete], User, { id: user.id });

    // Workbooks
    can(Action.Read, Workbook);
    can(Action.Create, Workbook);
    can([Action.Update, Action.Delete], Workbook, { user: { id: user.id } });

    // Submissions
    can(Action.Read, Submission);
    can(Action.Create, Submission);
    cannot(Action.Delete, Submission);

    // Problems
    can(Action.Read, Problem);

    // Roles
    can(Action.Read, Role);

    // Contests
    can(Action.Read, Contest);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

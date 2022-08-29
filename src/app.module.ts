import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ProblemsModule } from './problems/problems.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { WorkbooksModule } from './workbooks/workbooks.module';
import { ArticlesModule } from './articles/articles.module';
import { Problem } from './problems/entities/problem.entity';
import { Submission } from './submissions/entities/submission.entity';
import { Workbook } from './workbooks/entities/workbook.entity';
import { RouterModule } from '@nestjs/core';
import { Article } from './articles/entities/article.entity';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Problem,
          Submission,
          Workbook,
          Article,
          // __dirname + '/**/*.entity.ts',
        ],
        synchronize: true,
      }),
    }),
    RouterModule.register([
      {
        path: 'api',
        children: [
          AuthModule,
          UsersModule,
          ProblemsModule,
          SubmissionsModule,
          WorkbooksModule,
          ArticlesModule,
        ],
      },
    ]),
    AuthModule,
    UsersModule,
    ProblemsModule,
    SubmissionsModule,
    WorkbooksModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

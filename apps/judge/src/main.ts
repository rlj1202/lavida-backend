import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { JudgeModule } from './judge.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    JudgeModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();

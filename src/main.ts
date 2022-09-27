import { NestFactory } from '@nestjs/core';
// import @nestjs-addons/in-memory-db to root module
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create({
    imports: [InMemoryDBModule.forRoot()],
    module: AuthModule,
  });
  await app.listen(3000);
}
bootstrap();

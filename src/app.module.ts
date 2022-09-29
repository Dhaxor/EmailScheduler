import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailScheduleModule } from './emailSchedule/emailSchedule.module';
import { MailerModule } from '@nestjs-modules/mailer/dist';
import { ScheduleModule } from '@nestjs/schedule';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT as unknown as number,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    InMemoryDBModule.forRoot(),
    EmailScheduleModule,
  ],
})
export class AppModule {}

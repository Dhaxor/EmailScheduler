import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EmailScheduleController } from './emailSchedule.controller';
import { EmailScheduleService } from './emailSchedule.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [EmailScheduleController],
  providers: [EmailScheduleService],
})
export class EmailScheduleModule {}

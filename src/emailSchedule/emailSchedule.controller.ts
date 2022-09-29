import { Controller, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailScheduleService } from './emailSchedule.service';

@Controller('mailer')
export class EmailScheduleController {
  constructor(private readonly emailScheduleService: EmailScheduleService) {}

  // @Cron('1 * * * * *')
  @Post('/schedule')
  async scheduleEmail() {
    return this.emailScheduleService.scheduleEmail();
  }
}

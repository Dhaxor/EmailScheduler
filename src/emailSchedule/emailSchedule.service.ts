import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { AuthService } from 'src/auth/auth.service';
// import EmailScheduleDto from './dto/emailSchedule.dto';

@Injectable()
export class EmailScheduleService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private mailService: MailerService,
    @Inject(AuthService) private authService: AuthService,
  ) {}
  private alreadyDone = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  async scheduleEmail() {
    // list 10 hard coded messages in an array
    const messages = [
      'This is testing 1',
      'This is testing 2',
      'This is testing 3',
      'This is testing 4',
      'This is testing 5',
      'This is testing 6',
      'This is testing 7',
      'This is testing 8',
      'This is testing 9',
      'This is testing 10',
    ];

    // get random messages from the hardcode array
    const randomValueFromArray = (myArray) => {
      if (this.alreadyDone.length === 0) {
        return;
      }
      const randomValueIndex = Math.floor(
        Math.random() * this.alreadyDone.length,
      );
      const indexOfItemInMyArray = this.alreadyDone[randomValueIndex];

      this.alreadyDone.splice(randomValueIndex, 1);

      return myArray[indexOfItemInMyArray];
    };

    // get all emails from the database
    const result = await this.authService.getAll();
    const emails = result.map((user) => user.email);
    // send mail every one minute
    const job = new CronJob('1 * * * * *', async () => {
      const message = randomValueFromArray(messages);
      if (this.alreadyDone.length > 0) {
        console.log(message);
        await this.mailService.sendMail({
          to: emails,
          from: 'emperorduke@gmail.com',
          subject: 'Testing Nest MailerModule ✔',
          text: message,
          html: `<b>${message}</b>`,
        });
      } else {
        console.log('No more messages');
        job.stop();
      }
    });
    job.start();
    this.schedulerRegistry.addCronJob('test', job);
  }
}

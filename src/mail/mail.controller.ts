import { Body, Controller, Post } from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post('send-email')
  async sendEmail(@Body('email') email) {
    console.log(email);
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      from: 'oleksandr.kazachkov@onix-systems.com',
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };

    return await this.sendgridService.send(mail);
  }
}

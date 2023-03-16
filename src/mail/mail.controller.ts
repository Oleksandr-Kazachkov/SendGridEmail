/* eslint-disable @typescript-eslint/no-var-requires */
import { Body, Controller, Post } from '@nestjs/common';
import * as path from 'node:path';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post('send-email')
  async sendEmail(@Body('email') email, @Body('username') username) {
    const handlebars = require('express-handlebars').create({
      defaultLayout: path.join(__dirname, './templates/index.hbs'),
      helpers: {
        username: username,
      },
    });

    const template = await handlebars.render(
      handlebars.defaultLayout,
      handlebars.helpers,
    );

    const mail = {
      to: email,
      from: 'oleksandr.kazachkov@onix-systems.com',
      subject: 'User',
      html: template,
    };
    try {
      await this.sendgridService.send(mail);
    } catch (err) {
      console.dir(err, { depth: null });
    }
  }

  @Post('send-deafult-layout')
  async sendDeafultLayout(@Body('email') email) {
    try {
      await this.sendgridService.sendUserConfirmation(email);
    } catch (err) {
      console.dir(err, { depth: null });
    }
  }
}

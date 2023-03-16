/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendgridService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }

  async sendUserConfirmation(email: string) {
    const msg = {
      to: email,
      from: 'oleksandr.kazachkov@onix-systems.com',
      templateId: 'd-4a6463eed3414f578bb2b5469ede8990',
      subject: 'Welcome to Nice App! Confirm your Email',
      dynamic_template_data: {
        code: 'code',
      },
    };

    const {
      classes: { Mail },
    } = require('@sendgrid/helpers');
    const mail = Mail.create(msg);
    const body = mail.toJSON();
    console.log('this is the body: ', body);
    return await SendGrid.send(msg);
  }
}

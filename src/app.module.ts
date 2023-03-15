import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MailController],
  providers: [AppService, SendgridService],
})
export class AppModule {}

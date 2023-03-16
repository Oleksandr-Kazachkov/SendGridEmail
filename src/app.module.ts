import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: 'smtps://oleksandr.kazachkov@onix-systems.com',
      defaults: {
        from: 'oleksandr.kazachkov@onix-systems.com',
      },
      template: {
        dir: join(__dirname, 'templates'),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController, MailController],
  providers: [AppService, SendgridService],
})
export class AppModule {}

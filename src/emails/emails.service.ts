import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBatchEmail<T>(createEmailDto: CreateEmailDto<T>) {
    for (const section of Object.keys(createEmailDto.sectionsEmails)) {
      console.log('RECPIEINTS: ', createEmailDto.sectionsEmails[section]);

      try {
        await this.mailerService.sendMail({
          to: createEmailDto.sectionsEmails[section],
          subject: createEmailDto.subject,
          template: createEmailDto.template,
          context: { ...createEmailDto.context, section: section },
        });
      } catch (e) {
        throw new BadRequestException(`Failed to send an email for ${section}`);
      }
    }
  }
}

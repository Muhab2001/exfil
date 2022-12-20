import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail<T>(createEmailDto: CreateEmailDto<T>) {
    try {
      await this.mailerService.sendMail({
        to: createEmailDto.email,
        subject: createEmailDto.subject,
        template: createEmailDto.template,
        context: { ...createEmailDto.context },
      });
    } catch (e) {
      throw new BadRequestException(
        `Failed to send an email for ${createEmailDto.email}`,
      );
    }
  }
}

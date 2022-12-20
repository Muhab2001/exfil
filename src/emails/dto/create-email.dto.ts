type EmailContent = { [key: string]: string };

export class CreateEmailDto<EmailContent> {
  email: string;
  subject: string;
  template: string;
  context?: EmailContent;
}

export class CreateEmailDto<EmailContent> {
  sectionsEmails: { [section: number]: string[] };
  subject: string;
  template: string;
  context: EmailContent;
}

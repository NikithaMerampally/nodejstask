import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';


// Initialize the SES client
const sesClient = new SESClient({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: 'AKIAXL6CT7NEMLHAFW6V',
      secretAccessKey: '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',
    },
  });

interface EmailParams {
  toAddresses: string[];
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  fromAddress: string;
}


export const sendEmail = async (params: EmailParams): Promise<void> => {
  const { toAddresses, subject, bodyHtml, bodyText, fromAddress } = params;

  const emailParams = {
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: bodyHtml,
        },
        ...(bodyText && {
          Text: {
            Charset: 'UTF-8',
            Data: bodyText,
          },
        }),
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: fromAddress,
  };

  try {
    const command = new SendEmailCommand(emailParams);
    const response = await sesClient.send(command);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Example usage:
// sendEmail({
//   toAddresses: ['recipient@example.com'],
//   subject: 'Test Email',
//   bodyHtml: '<h1>Hello from SES!</h1>',
//   fromAddress: 'your-verified-email@example.com',
// });

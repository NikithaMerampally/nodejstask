import { SendEmailCommand } from '@aws-sdk/client-ses';
import { PublishCommand } from '@aws-sdk/client-sns';
import { SESClient } from '@aws-sdk/client-ses';
import { SNSClient } from '@aws-sdk/client-sns';
require('dotenv').config();

// Initialize the SES client
const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });


  const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
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
          Data: '<html>This Email is from AWS SES Service</html>',
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
    const snsMessage = `📧 Email sent to: ${toAddresses.join(', ')}\nSubject: ${subject}`;
    
      const phoneNumber  = '+917286976250'
      const snsCommand = new PublishCommand({
        Message: snsMessage,
        PhoneNumber: phoneNumber, 
      });
  

    const snsResponse = await snsClient.send(snsCommand);
    console.log('🔔 SNS notification sent:', snsResponse);
     
  } catch (error) {
    console.error('❌ Error in sendEmail:', error);
    throw error;
  }
};


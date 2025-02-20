"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
require('dotenv').config();
// Initialize the SES client
const sesClient = new client_ses_1.SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
const sendEmail = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { toAddresses, subject, bodyHtml, bodyText, fromAddress } = params;
    const emailParams = {
        Destination: {
            ToAddresses: toAddresses,
        },
        Message: {
            Body: Object.assign({ Html: {
                    Charset: 'UTF-8',
                    Data: bodyHtml,
                } }, (bodyText && {
                Text: {
                    Charset: 'UTF-8',
                    Data: bodyText,
                },
            })),
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: fromAddress,
    };
    try {
        const command = new client_ses_1.SendEmailCommand(emailParams);
        const response = yield sesClient.send(command);
        console.log('Email sent successfully:', response);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
// Example usage:
// sendEmail({
//   toAddresses: ['recipient@example.com'],
//   subject: 'Test Email',
//   bodyHtml: '<h1>Hello from SES!</h1>',
//   fromAddress: 'your-verified-email@example.com',
// });

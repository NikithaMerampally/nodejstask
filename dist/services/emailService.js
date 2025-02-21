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
const client_sns_1 = require("@aws-sdk/client-sns");
const client_ses_2 = require("@aws-sdk/client-ses");
const client_sns_2 = require("@aws-sdk/client-sns");
require('dotenv').config();
// Initialize the SES client
const sesClient = new client_ses_2.SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
const snsClient = new client_sns_2.SNSClient({
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
                    Data: '<html>This Email is from AWS SES Service</html>',
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
        const snsMessage = `📧 Email sent to: ${toAddresses.join(', ')}\nSubject: ${subject}`;
        const phoneNumber = '+917286976250';
        const snsCommand = new client_sns_1.PublishCommand({
            Message: snsMessage,
            PhoneNumber: phoneNumber,
        });
        const snsResponse = yield snsClient.send(snsCommand);
        console.log('🔔 SNS notification sent:', snsResponse);
    }
    catch (error) {
        console.error('❌ Error in sendEmail:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;

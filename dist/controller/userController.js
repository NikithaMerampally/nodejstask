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
exports.sendEmailSes = exports.getUserInfo = exports.craeteUser = void 0;
const userService_1 = require("../services/userService");
const emailService_1 = require("../services/emailService");
const craeteUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const userCreated = yield (0, userService_1.createUser)(body);
            if (userCreated)
                return res.status(200).send({ message: "User created successfully" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
};
exports.craeteUser = craeteUser;
const getUserInfo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let email = req.body.email;
            if (!email)
                return res.status(400).send({ message: "emailId is missing" });
            const userData = yield (0, userService_1.getUsersByEmail)(req.body.email);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    });
};
exports.getUserInfo = getUserInfo;
const sendEmailSes = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, emailService_1.sendEmail)({
                toAddresses: ["merampallyshashikala@gmail.com"],
                subject: 'Test Email',
                bodyHtml: '<h1>Hello from SES!</h1>',
                fromAddress: 'merampallynikitha@gmail.com',
            }).then(data => {
                return res.status(200).send({ message: "Email sent successfully" });
            }).catch(error => {
                console.log(error);
                return res.status(400).send({ message: "unable to send Email" });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(200).send({ message: "Unable to send sms" });
        }
    });
};
exports.sendEmailSes = sendEmailSes;

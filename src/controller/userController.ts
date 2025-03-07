import { createUser, getUsersByEmail, } from '../services/userService'
import { sendEmail } from "../services/emailService"
import { error } from 'console'
export const craeteUser = async function (req, res) {
    try {
        const body = req.body
        const userCreated = await createUser(body)
        if (userCreated) return res.status(200).send({ message: "User created successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async function (req, res) {
    try {
        let email = req.body.email
        if (!email) return res.status(400).send({ message: "emailId is missing" })
        const userData = await getUsersByEmail(req.body.email)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const sendEmailSes = async function (req, res) {
    try {
        sendEmail({
            toAddresses: ["merampallyshashikala@gmail.com"],
            subject: 'Test Email',
            bodyHtml: '<h1>Hello from SES!</h1>',
            fromAddress: 'merampallynikitha@gmail.com',
        }).then(data => {
            return res.status(200).send({ message: "Email sent successfully" })
        }).catch(error => {
            console.log(error)
            return res.status(400).send({ message: "unable to send Email" })
        });

    } catch (error) {
        console.log(error)
        return res.status(200).send({ message: "Unable to send sms" })
    }
}

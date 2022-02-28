import NodeMailer from "nodemailer"
import { env } from "process"

const TransportConf = {
    host: env["EMAIL_HOST"],
    port: parseInt(env["EMAIL_PORT"] ?? "587"),
    secure: env["EMAIL_SECURE"] == "true" ? true : false,
    auth: {
        user: env["EMAIL_AUTH_USER"] == "undefined" ? "undefined" : env["EMAIL_AUTH_USER"],
        pass: env["EMAIL_AUTH_PASSWORD"] == "undefined" ? "undefined" : env["EMAIL_AUTH_PASSWORD"],
    },
}

const mailAccount = NodeMailer.createTransport(TransportConf)

const sendMail = async (to: string, title: string, messageHtml: string) => {
    const info = await mailAccount.sendMail({
        from: env.EMAIL_ADMIN_ADDRESS,
        to: to,
        subject: title,
        html: messageHtml,
    })

    console.log(`Message send: ${info.messageId}`)
}

export default sendMail

import { Request, Response } from "express";
import nodemailer from 'nodemailer'

export const sendEmail = async (req: Request, res: Response) => {
    // Passo 1: Configurar o transporter

    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "3ac6911f6b557d",
            pass: "2ca5b9c61756c7"
        }
    })

    // Passo 2: Configurar a menssagem
    let message = {
        from: req.body.from,
        to: 'teste@gmail.com',
        replyTo: req.body.from,
        subject: req.body.subject,
        html: req.body.email,
        text: req.body.email
    }

    // Passo 3: Enviar a menssagem
    let info = await transport.sendMail(message)

    console.log("INFO", info)


    res.json({ sucess: true })
}
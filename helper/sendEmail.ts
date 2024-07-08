import nodemailer from 'nodemailer';
import React from 'react';


interface SendEmailProps {
    to: string;
    subject?: string;
    text?: string;
    template: React.ComponentType
    templateProps?: object
}

async function sendEmail({ to, subject, text, template, templateProps } : SendEmailProps) {

    const { renderToString } = await import('react-dom/server');

    const reactElement = React.createElement<{ templateProps?: object }>(template, templateProps);
    const html = renderToString(reactElement);

    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER, 
            pass: process.env.NODEMAILER_PASS 
        }
    });

    await transporter.sendMail({
        from: '"Chess" <chess-test@outlook.com>', 
        to: to, 
        subject: 'Olá', 
        text: 'Olá, este é um email de teste.', 
        html: html 
    });
}

export { sendEmail };
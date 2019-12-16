import * as nodemailer from 'nodemailer';
import { Email } from '../../../types/Email';

const gmailEmail = 'denisonstrike3@gmail.com';
const gmailPassword = 'strike3_2018';

export const sendEmailHandler = async(emailData: Email) => {
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const recipients = emailData.recipients;
  const subject = emailData.subject;
  const emailBody = emailData.body;

  recipients.push(gmailEmail);

  const mailOption = {
    from: { name: 'Strike 3', address: gmailEmail },
    to: recipients,
    subject,
    html: `<p style="white-space: pre-wrap">${ emailBody }</p><p><a href="https://denisonstrike3.com">www.denisonstrike3.com</a></p>`,
  };

  await mailTransport.sendMail(mailOption);

  console.log('Email Sent');
};

const nodemailer = require('nodemailer');

const gmailEmail = 'denisonstrike3@gmail.com';
const gmailPassword = 'strike3_2018';

exports.handler = async emailData => {
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const recipients = ['ryanrasmussen05@gmail.com']; // emailData.recipients;
  const subject = 'Cron Test'; // emailData.subject;
  const emailBody = 'This is the cron test email'; // emailData.body;

  recipients.push(gmailEmail);

  const mailOption = {
    from: { name: 'Strike 3', address: gmailEmail },
    to: recipients,
    subject,
    html: `<p style="white-space: pre-wrap">${ emailBody }</p><p><a href="https://denisonstrike3.com">www.denisonstrike3.com</a></p>`,
  };

  await mailTransport.sendMail(mailOption);

  console.log('Reminder Email Sent');
};

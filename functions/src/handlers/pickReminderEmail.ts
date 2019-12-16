import * as nodemailer from 'nodemailer';
import { getGameData } from '../helpers/getGameData';

const gmailEmail = 'denisonstrike3@gmail.com';
const gmailPassword = 'strike3_2018';

const getEmailsForMissingPicks = async(database: any): Promise<Array<string>> => {
  const emails = [];

  const gameData = await getGameData({}, database, true, true);
  const currentWeek = gameData.week;
  const isTieBreakerWeek = gameData.tieBreakers && !!gameData.tieBreakers[currentWeek];

  for (const player of gameData.players) {
    const playerPick = player.picks[currentWeek - 1];
    const isPlayerEliminated = playerPick.status === 'eliminated';
    const isMissingPick = (playerPick.status === 'open' && !playerPick.team) || (isTieBreakerWeek && !playerPick.tieBreakerAwayTeamPoints);
    if (isMissingPick && !isPlayerEliminated) {
      emails.push(player.email);
    }
  }

  return emails;
};

export const sendReminderEmailHandler = async(database: any) => {
  const subject = 'Strike 3 Reminder';

  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const recipients = await getEmailsForMissingPicks(database);
  recipients.push(gmailEmail);

  if (!recipients.includes('ryanrasmussen05@gmail.com')) {
    recipients.push('ryanrasmussen05@gmail.com');
  }

  const mailOption = {
    from: { name: 'Strike 3', address: gmailEmail },
    to: recipients,
    subject,
    html: `
      <p>You are receiving this email because you haven't yet made your pick this week</p>
      <p>You have until Sunday at noon (Central Time) to get in your pick, or it will be counted as a strike.  NO EXCEPTIONS</p>
      <p>
        <a href="https://denisonstrike3.com">www.denisonstrike3.com</a>
      </p>`,
  };

  await mailTransport.sendMail(mailOption);

  console.log('Reminder Email Sent');
};

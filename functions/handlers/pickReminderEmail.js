const nodemailer = require('nodemailer');
const getGameData = require('../helpers/getGameData').getGameData;

const gmailEmail = 'denisonstrike3@gmail.com';
const gmailPassword = 'strike3_2018';

const getEmailsForMissingPicks = async database => {
  const emails = [];

  const gameData = await getGameData({}, database, true, true);
  const currentWeek = gameData.week;
  const isTieBreakerWeek = gameData.tieBreakers && !!gameData.tieBreakers[currentWeek];

  for (const player of gameData.players) {
    const playerPick = player.picks[currentWeek - 1];
    const isMissingPick = (playerPick.status === 'open' && !playerPick.team) || (isTieBreakerWeek && !playerPick.tieBreakerAwayTeamPoints);
    if (isMissingPick) {
      emails.push(player.email);
    }
  }

  return emails;
};

exports.handler = async database => {
  const subject = 'Strike 3 Reminder';

  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const emails = await getEmailsForMissingPicks(database);

  const recipients = []; // TODO add users missing pick
  recipients.push(gmailEmail);
  recipients.push('ryanrasmussen05@gmail.com');

  const mailOption = {
    from: { name: 'Strike 3', address: gmailEmail },
    to: recipients,
    subject,
    html: `
      <p>You are receiving this email because you haven't yet made your pick this week</p>
      <p>You have until Sunday at noon (Central Time) to get in your pick, or it will be counted as a strike.  NO EXCEPTIONS</p>
      <p>
        ${ emails }
      </p>
      <p>
        <a href="https://denisonstrike3.com">www.denisonstrike3.com</a>
      </p>`,
  };

  await mailTransport.sendMail(mailOption);

  console.log('Reminder Email Sent');
};

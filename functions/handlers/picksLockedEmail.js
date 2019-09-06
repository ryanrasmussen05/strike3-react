const nodemailer = require('nodemailer');
const getGameData = require('../helpers/getGameData').getGameData;

const gmailEmail = 'denisonstrike3@gmail.com';
const gmailPassword = 'strike3_2018';

// TODO this will need tie breaker added
const getPicksTableString = async database => {
  const gameData = await getGameData({}, database, true, true);
  const currentWeek = gameData.week;

  let tableString = `
    <table style="border: 1px solid black; border-collapse: collapse">
    <tbody>
    <tr>
    <th style="border: 1px solid black; padding: 5px 8px">Rank</th>
    <th style="border: 1px solid black; padding: 5px 8px">Name</th>
    <th style="border: 1px solid black; padding: 5px 8px">Pick</th>
    </tr>`;

  for (const player of gameData.players) {
    const playerPick = player.picks[currentWeek - 1];

    let pickText;
    if (playerPick.status === 'eliminated') {
      pickText = 'OUT';
    } else {
      pickText = playerPick.team ? playerPick.team : 'No Pick';
    }

    tableString = `
      ${tableString}
      <tr>
      <td style="border: 1px solid black; text-align: center; padding: 2px 8px">${player.rank}</td>
      <td style="border: 1px solid black; padding: 2px 8px">${player.name}</td>
      <td style="border: 1px solid black; text-align: center; padding: 2px 8px">${pickText}</td>
      </tr>`;
  }

  tableString = `${tableString}</tbody></table>`;

  return tableString;
};

const getPlayerEmails = async database => {
  const gameData = await getGameData({}, database, true, true);
  return gameData.players.map(player => player.email);
};

const getCurrentWeek = async database => {
  const gameData = await getGameData({}, database, true, true);
  return gameData.week;
};

exports.handler = async database => {
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const tableString = await getPicksTableString(database);
  const currentWeek = await getCurrentWeek(database);
  const recipients = await getPlayerEmails(database);
  recipients.push(gmailEmail);

  const subject = `Strike 3  - Week ${currentWeek} Picks`;

  const mailOption = {
    from: { name: 'Strike 3', address: gmailEmail },
    to: recipients,
    subject,
    html: `
      <p>Week ${currentWeek} is now locked. See all picks below. Good Luck!</p>
      <p>${tableString}</p>
      <p>
        <a href="https://denisonstrike3.com">www.denisonstrike3.com</a>
      </p>`,
  };

  await mailTransport.sendMail(mailOption);

  console.log('Lock Email Sent');
};

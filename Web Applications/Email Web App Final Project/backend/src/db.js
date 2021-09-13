/* eslint-disable max-len */
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// exports.selectMailbox = async (useremail, mailbox) => {
//   // eslint-disable-next-line max-len
//   const select = 'SELECT id, useremail, mailbox, mail FROM mail WHERE useremail ~* $1 AND mailbox ~* $2';
//   const query = {
//     text: select,
//     values: [useremail, mailbox],
//   };
//   const {rows} = await pool.query(query);
//   const allMail = [];
//   let i = 0;
//   for (const row of rows) {
//     allMail.push({name: row.mailbox, mail: row.mail});
//     allMail[i].mail.id = row.id;
//     i++;
//   }
//   return allMail;
// };

exports.selectMailbox = async (useremail, mailbox) => {
  // eslint-disable-next-line max-len
  let select = 'SELECT id, useremail, mailbox, mail FROM mail WHERE useremail ~* $1';
  if (mailbox) {
    select += ` AND mailbox ~* $2`;
  }
  const query = {
    text: select,
    values: [useremail, mailbox ? `${mailbox}` : []],
  };
  const {rows} = await pool.query(query);
  const allMail = [];
  let i = 0;
  for (const row of rows) {
    allMail.push({name: row.mailbox, mail: row.mail});
    allMail[i].mail.id = row.id;
    i++;
  }
  return allMail;
};

exports.selectEmail = async (id) => {
  const select = `SELECT id, mail FROM mail WHERE id = $1`;
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  if (rows.length == 1) {
    rows[0].mail.id = rows[0].id;
  }
  // If rows.length is equal to 1, return rows[0].mail else return undefined
  return rows.length == 1 ? rows[0].mail : undefined;
};

// For POST to save in from-user's sent mailbox
exports.insertEmailSent = async (useremail, mail) => {
  const i = `INSERT INTO mail(useremail,mailbox,mail) VALUES ($1,'sent',$2) RETURNING *`;
  const query = {
    text: i,
    values: [useremail, mail],
  };
  const {rows} = await pool.query(query);
  if (rows.length == 1) {
    rows[0].mail.id = rows[0].id;
    rows[0].useremail = useremail;
  }
  return rows.length == 1 ? rows[0].mail : undefined;
};

// For POST to save in to-user's inbox mailbox
exports.insertEmailInbox = async (useremail, mail) => {
  // eslint-disable-next-line max-len
  const i = `INSERT INTO mail(useremail,mailbox,mail) VALUES ($1,'inbox',$2) RETURNING *`;
  const query = {
    text: i,
    values: [useremail, mail],
  };
  const {rows} = await pool.query(query);
  if (rows.length == 1) {
    rows[0].mail.id = rows[0].id;
    rows[0].useremail = useremail;
  }
  return rows.length == 1 ? rows[0].mail : undefined;
};

exports.updateEmailMailbox = async (mailbox, id) => {
  const select = `UPDATE mail SET mailbox = $1 WHERE id = $2`;
  const query = {
    text: select,
    values: [mailbox, id],
  };
  const t = await pool.query(query);
  return t;
};

exports.updateMail = async (mail, id) => {
  const select = `UPDATE mail SET mail = $1 WHERE id = $2`;
  // eslint-disable-next-line max-len
  // const select = `UPDATE mail SET mail = jsonb_set(mail, '{mail,star}', 'true') WHERE id = $1`;
  const query = {
    text: select,
    values: [mail, id],
  };
  const t = await pool.query(query);
  return t;
};

exports.lookupEmail = async (id, mailbox) => {
  const select = `SELECT id, mailbox FROM mail WHERE id = $1 AND mailbox = $2`;
  const query = {
    text: select,
    values: [id, mailbox],
  };
  const {rows} = await pool.query(query);
  // If rows.length is equal to 1, return rows[0].mail else return undefined
  return rows.length == 0 ? false : true;
};

exports.selectUsers = async (useremail) => {
  let select = 'SELECT useremail, username, userpassword, avatarurl, showavatar FROM emailuser';
  if (useremail) {
    select += ` WHERE useremail ~* $1`;
  }
  const query = {
    text: select,
    values: [useremail ? `${useremail}` : []],
  };
  const {rows} = await pool.query(query);
  const allUsers = [];
  for (const row of rows) {
    allUsers.push({useremail: row.useremail, username: row.username, userpassword: row.userpassword, avatarurl: row.avatarurl, showavatar: row.showavatar});
  }
  return allUsers;
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);

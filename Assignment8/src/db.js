const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectAllMail = async (mailbox) => {
  let select = 'SELECT id, mailbox, mail FROM mail';
  if (mailbox) {
    select += ` WHERE mailbox ~* $1`;
  }
  const query = {
    text: select,
    values: mailbox ? [`${mailbox}`] : [],
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

exports.insertEmailSent = async (mail) => {
  const insert = `INSERT INTO mail(mailbox, mail) VALUES ('sent', $1)`;
  const query = {
    text: insert,
    values: [mail],
  };
  const {rows} = await pool.query(query);
  if (rows.length == 1) {
    rows[0].mail.id = rows[0].id;
  }
  return rows.length == 1 ? rows[0].mail : undefined;
};

exports.updateEmail = async (mailbox, id) => {
  const select = `UPDATE mail SET mailbox = $1 WHERE id = $2`;
  const query = {
    text: select,
    values: [mailbox, id],
  };
  // const {rows} = await pool.query(query);
  const t = await pool.query(query);
  return t;
};

exports.lookupEmail= async (id, mailbox) => {
  const select = `SELECT id, mailbox FROM mail WHERE id = $1 AND mailbox = $2`;
  const query = {
    text: select,
    values: [id, mailbox],
  };
  const {rows} = await pool.query(query);
  // If rows.length is equal to 1, return rows[0].mail else return undefined
  return rows.length == 0 ? false : true;
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);

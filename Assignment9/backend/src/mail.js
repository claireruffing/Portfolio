/* eslint-disable max-len */
// const {push} = require('docker-compose');
const db = require('./db');

// Got the regular expression for a valid uuid from
// https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
// eslint-disable-next-line max-len
const idExample = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$';

exports.getMailbox = async (req, res) => {
  const mailboxMap = new Map();
  const mailboxes = [];
  if (req.query.mailbox) {
    // If the name of the inbox is passed in, return only the
    // emails in that mailbox.
    const m = await db.selectMailbox(req.query.useremail, req.query.mailbox);
    if (m.length == 0) {// mailbox not found
      res.status(404).send();
    } else {
      // Removing the content from emails in this mailbox
      m.forEach(function(email) {
        // delete email.mail['content'];
        // delete email.name;
        mailboxes.push(email.mail);
      });
      res.status(200).json([{
        useremail: req.query.useremail,
        name: req.query.mailbox, mail: mailboxes,
      }]);
    }
  } else { // get all emails from all mailboxes
    const allMail = await db.selectMailbox(req.query.useremail, []);
    allMail.forEach((e) => {
      if (!mailboxMap.has(e.name)) { // mailbox does not exist in map
        mailboxMap.set(e.name, []);
      }
      const temp = mailboxMap.get(e.name);
      // Pushing the mail at row e from db onto the temp array
      temp.push(e.mail);
      // Resetting the map to have the array of mail at that name
      mailboxMap.set(e.name, temp);
    });
    mailboxMap.forEach((value, key) => {
      mailboxes.push({useremail: req.query.useremail, name: key, mail: value});
    });
    res.status(200).json(mailboxes);
  }
};

exports.getById = async (req, res) => {
  if (req.params.id.match(idExample)) {
    const email = await db.selectEmail(req.params.id);
    if (email) {
      res.status(200).json(email);
    } else {
      res.status(404).send();
    }
  }
};

exports.post = async (req, res) => {
  if (req.body) {
    req.body['from-name'] = 'Claire Ruffing';
    req.body['from-email'] = 'claireruffing@mail.com';
    // Converting received date to todays date
    const currDate = new Date();
    // Got the .split('.')[0] + 'Z' part from
    // https://stackoverflow.com/questions/34053715/how-to-output-date-in-javascript-in-iso-8601-without-milliseconds-and-with-z/34053886
    req.body.received = currDate.toISOString().split('.')[0] + 'Z';
    req.body.sent = req.body.received;
    // req.useremail = req.body['to-email'];
    await db.insertEmailInbox(req.body['to-email'], req.body);
    // req.useremail = req.body['from-email'];
    const email = await db.insertEmailSent(req.body['from-email'], req.body);
    res.status(201).json(email);
  } else {
    res.status(400).send();
  }
};

exports.put = async (req, res) => {
  if (req.params.id && req.params.id.match(idExample)) {
    if (req.query.mailbox) {
      if (req.query.mailbox == 'sent') {
        const b = await db.lookupEmail(req.params.id, req.query.mailbox);
        if (b == false) { // If the mailbox is sent and the id is not in sent
          res.status(409).send();
        } else { // If the email is in sent and the id is in sent
          res.status(204).send();
        }
      } else {
        // eslint-disable-next-line max-len
        const email = await db.updateEmailMailbox(req.query.mailbox, req.params.id);
        if (email.rowCount == 1) {
          res.status(204).send();
        } else { // email not found
          res.status(404).send();
        }
      }
    } else {
      const email = await db.updateMail(req.body, req.params.id);
      if (email.rowCount == 1) {
        res.status(204).send();
      } else { // email not found
        res.status(404).send();
      }
    }
  }
};

exports.getUsers = async (req, res) => {
  if (req.query.user) {
    // If the name of the inbox is passed in, return only the
    // emails in that mailbox.
    const user = await db.selectUsers(req.query.user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send();
    }
  } else { // get all emails from all mailboxes
    const allUsers = await db.selectUsers([]);
    res.status(200).json(allUsers);
  }
};

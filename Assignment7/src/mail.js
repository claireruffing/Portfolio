const inbox = require('../data/inbox.json');
const sent = require('../data/sent.json');
const trash = require('../data/trash.json');

const mailboxMap = new Map();
mailboxMap.set('inbox', inbox);
mailboxMap.set('sent', sent);
mailboxMap.set('trash', trash);

// Got the regular expression for a valid uuid from
// https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
// eslint-disable-next-line max-len
const idExample = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$';


exports.getAll = async (req, res) => {
  const inboxCopy = JSON.parse(JSON.stringify(inbox));
  const sentCopy = JSON.parse(JSON.stringify(sent));
  const trashCopy = JSON.parse(JSON.stringify(trash));
  // Removing the content from getting all emails
  // email is each individual email in Inbox
  inboxCopy.forEach(function(email) {
    delete email['content'];
  });
  sentCopy.forEach(function(email) {
    delete email['content'];
  });
  trashCopy.forEach(function(email) {
    delete email['content'];
  });
  // If the name of the inbox is passed in
  if (req.query.mailbox) {
    if (req.query.mailbox.match('inbox')) {
      res.status(200).json([{name: 'inbox', mail: inboxCopy}]);
    } else if (req.query.mailbox.match('sent')) {
      res.status(200).json([{name: 'sent', mail: sentCopy}]);
    } else if (req.query.mailbox.match('trash')) {
      res.status(200).json([{name: 'trash', mail: trashCopy}]);
    }
  } else { // To get all of the emails with no mailbox passed
    res.status(200).json([{name: 'inbox', mail: inboxCopy},
      {name: 'sent', mail: sentCopy}, {name: 'trash', mail: trashCopy}]);
  }
};


exports.getById = async (req, res) => {
  if (req.params.id.match(idExample)) {
    const emailInbox = inbox.find((emailInbox) =>
      emailInbox.id == req.params.id);
    const emailSent = sent.find((emailSent) =>
      emailSent.id == req.params.id);
    const emailTrash = trash.find((emailTrash) =>
      emailTrash.id == req.params.id);
    if (emailInbox) {
      res.status(200).json(emailInbox);
    } else if (emailSent) {
      res.status(200).json(emailSent);
    } else if (emailTrash) {
      res.status(200).json(emailTrash);
    } else {
      res.status(404).send();
    }
  }
};

exports.post = async (req, res) => {
  req.body.id = uuidv4();
  req.body['from-name'] = 'CSE183 Student';
  req.body['from-email'] = 'cse183-student@ucsc.edu';
  // Converting received date to todays date
  const currDate = new Date();
  // Got the .split('.')[0] + 'Z' part from
  // https://stackoverflow.com/questions/34053715/how-to-output-date-in-javascript-in-iso-8601-without-milliseconds-and-with-z/34053886
  req.body.received = currDate.toISOString().split('.')[0] + 'Z';

  if (req.body) {
    if (req.body.id.match(idExample)) {
      sent.push(req.body);
      res.status(201).send(req.body);
    }
  } else {
    res.status(400).send();
  }
};

exports.put = async (req, res) => {
  let email = null;
  let indexEmail = null;
  if (req.query.mailbox) {
    if (req.params.id.match(idExample)) {
      const emailI = inbox.find((emailI) =>
        emailI.id == req.params.id);
      const emailS = sent.find((emailS) =>
        emailS.id == req.params.id);
      const emailT = trash.find((emailT) =>
        emailT.id == req.params.id);
      if (emailI != undefined ) {
        email = emailI;
        indexEmail = inbox.findIndex((emailI) =>
          emailI.id == req.params.id);
        console.log(indexEmail);
        inbox.splice(indexEmail, 1);
      } else if (emailS != undefined ) {
        email = emailS;
        indexEmail = sent.findIndex((emailS) =>
          emailS.id == req.params.id);
        sent.splice(indexEmail, 1);
      } else if (emailT != undefined ) {
        email = emailT;
        indexEmail = trash.findIndex((emailT) =>
          emailT.id == req.params.id);
        trash.splice(indexEmail, 1);
      } else {
        res.status(404).send();
        return;
      }
      switch (req.query.mailbox) {
        case 'inbox':
          inbox.push(email);
          res.status(204).send();
          break;
        case 'sent':
          const sentEmail = sent.find((emailS) =>
            emailS.id == req.params.id);
          if (sentEmail == undefined) {
            sent.push(email);
            res.status(204).send();
          } else {
            res.status(409).send();
          }
          break;
        case 'trash':
          trash.push(email);
          res.status(204).send();
          break;
        default:
          mailboxMap.set(req.query.mailbox, newEmail);
          break;
      }
    }
  }
};

// Got this random uuid generator from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
// eslint-disable-next-line require-jsdoc
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

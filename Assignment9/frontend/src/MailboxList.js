/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';
import DraftsIcon from '@material-ui/icons/Drafts';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {makeStyles} from '@material-ui/core/styles';

import SharedContext from './SharedContext';
import {Divider} from '@material-ui/core';

// const useStyles = makeStyles(() => ({
//   counts: {
//     ['text-align']: (props) => props['text-align'],
//   },
// }));

const useStyles = makeStyles({
  counts: {
    ['text-align']: 'end',
    ['padding-left']: '60px',
  },
});

function getIcon(mailboxName) {
  const lowercase = mailboxName.toLowerCase();
  let icon;
  switch (lowercase) {
    case 'inbox':
      icon = <MailIcon />;
      break;
    case 'starred':
      icon = <StarIcon />;
      break;
    case 'sent':
      icon = <SendIcon />;
      break;
    case 'drafts':
      icon = <DraftsIcon />;
      break;
    case 'trash':
      icon = <DeleteIcon />;
      break;
    default:
      icon = <ArrowForwardIcon />;
      break;
  };
  return icon;
};

/**
 * @return {object} JSX
 */
function MailboxList() {
  const {mailbox, selectMailbox} = React.useContext(SharedContext);
  const [mailboxListItems, setMailboxListItems] = React.useState([]);
  const classes = useStyles();

  // Component did mount
  useEffect(() => {
    fetchEmails(setMailboxListItems);
  }, []);


  const fetchEmails = (setMailboxListItems) => {
    const useremail = encodeURIComponent('claireruffing@mail.com');
    // eslint-disable-next-line max-len
    fetch('http://localhost:3010/v0/mail?useremail=' + useremail, {
      method: 'get',
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
          const listItems = [];
          json.forEach(function(mailbox) {
            listItems.push({name: mailbox.name, icon: getIcon(mailbox.name), count: mailbox.mail.length});
          });
          listItems.push({name: 'New Mailbox', icon: <AddIcon />});
          listItems.push({name: 'Settings', icon: <SettingsIcon />});
          setMailboxListItems(listItems);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div>
      <Toolbar><b>Claire Ruffing Mail</b>
      </Toolbar>
      <Divider />
      <List>
        {mailboxListItems.map((box) => (
          <ListItem button
            key={box.name}
            disabled={mailbox == box.name}
            onClick={() => selectMailbox(box.name)}
          >
            <ListItemIcon>
              {box.icon}
            </ListItemIcon>
            <ListItemText primary={box.name} />
            <ListItemText className={classes.counts} secondary={box.count} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MailboxList;

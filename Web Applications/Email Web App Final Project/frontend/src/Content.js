/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
// import Grid from '@material-ui/core/Grid';
// import avatar from './claire.jpg';

import SharedContext from './SharedContext';


const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 4,
    padding: theme.spacing(6),
  },
  mailboxName: {
    margin: theme.spacing(1),
  },
  root: {
    // margin: theme.spacing(4),
    padding: theme.spacing(-50),
    display: 'inline-grid',
  },
  read: {
    fontWeight: 'normal',
  },
  unread: {
    fontWeight: 'bold',
  },
  a: {
    textDecoration: 'none',
  },
  avatar: {
    margin: 10,
  },
}));

const fetchEmails = (setEmails, mailbox) => {
  const useremail = encodeURIComponent('claireruffing@mail.com');
  const mbox = encodeURIComponent(mailbox);
  // eslint-disable-next-line max-len
  fetch('http://localhost:3010/v0/mail?useremail=' + useremail + '&mailbox=' + mbox, {
    method: 'get',
  })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
      // setError('');
        setEmails(json[0].mail);
      })
      .catch((error) => {
        console.log(error);
        setEmails([]);
      // setError(`${error.status} - ${error.statusText}`);
      });
};

const updateEmail = (mail) => {
  (fetch('http://localhost:3010/v0/mail/' + mail.id, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset = utf-8',
    },
    body: JSON.stringify(mail),
  }))
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
      // setError('');
      })
      .catch((error) => {
        console.log(error);
      // setError(`${error.status} - ${error.statusText}`);
      });
};

// const fetchUsers = (setUsers) => {
//   // const useremail = encodeURIComponent('claireruffing@mail.com');
//   // eslint-disable-next-line max-len
//   fetch('http://localhost:3010/v0/emailuser', {
//     method: 'get',
//   })
//       .then((response) => {
//         if (!response.ok) {
//           throw response;
//         }
//         return response.json();
//       })
//       .then((json) => {
//       // setError('');
//         setUsers(json);
//       })
//       .catch((error) => {
//         console.log(error);
//         setUsers([]);
//       // setError(`${error.status} - ${error.statusText}`);
//       });
// };

/**
 * @return {object} JSX
 */
function Content() {
  const [emails, setEmails] = React.useState([]);
  const [userUpdate, setUserUpdate] = React.useState([false]);
  const [users, setUsers] = React.useState([]);

  const classes = useStyles();

  const {mailbox, setEmailID} =
    React.useContext(SharedContext);

  sortDates(emails);
  // Called an email row is clicked. Set state for selected email.
  const handleEmailClick = (email) => {
    email.read = true;
    setEmailID(email.id);
    // Update read property
    updateEmail(email);
    setUserUpdate(!userUpdate);
  };

  const handleStarIconClick = (email) => {
    email.star = !email.star;
    // Update star property
    updateEmail(email);
    setUserUpdate(!userUpdate);
  };

  // Component did mount
  React.useEffect(() => {
    fetchUsers(setUsers);
    fetchEmails(setEmails, mailbox);
  }, [mailbox]);

  // Component did mount
  // React.useEffect(() => {
  //   fetchUsers(setUsers);
  // }, []);

  const chooseAvatar = (email) => {
    // fetchUsers(setUsers);
    const person = users.find((user) => email == user.useremail);
    return person.avatarurl;
  };

  const fetchUsers = (setUsers) => {
    // const useremail = encodeURIComponent('claireruffing@mail.com');
    // eslint-disable-next-line max-len
    fetch('http://localhost:3010/v0/emailuser', {
      method: 'get',
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
        // setError('');
          setUsers(json);
        })
        .catch((error) => {
          console.log(error);
          setUsers([]);
        });
  };

  return (
    <div>
      <Toolbar />
      <Hidden className={classes.mailboxName} smDown implementation="css">
        <h3>Desktop {mailbox}</h3>
      </Hidden>
      <Hidden className={classes.mailboxName} mdUp implementation="css">
        <h3>{mailbox}</h3>
      </Hidden>
      <div className={classes.demo}>
        <List>
          {/* {generate( */}
          {emails.map((email) => (
            <ListItem key={email.id}>
              {/* {users.map((user) => ( */}
              <ListItemAvatar>
                {/* <Grid container justify="center" alignItems="center"> */}
                {/* <Avatar className={classes.avatar}>{email['from-name'].substring(0, 1)}</Avatar> */}
                <Avatar src={chooseAvatar(email['from-email'])} alt={email['from-name']}></Avatar>
                {/* </Grid> */}
              </ListItemAvatar>
              {/* ))}, */}
              <Link to="/MailViewer" className={classes.a}>
                <ListItemText
                  classes={{primary: email.read ? classes.read : classes.unread, secondary: email.read ? classes.read : classes.unread}}
                  primary={email['from-name']}
                  secondary={
                    <div>
                      <div>{email.subject}</div>
                      <div className={classes.read}>{email.content.substring(0, 50)}...</div>
                    </div>
                  }
                  onClick={() => handleEmailClick(email)}
                  // to="/MailViewer"
                >
                  {/* <MailViewer onClick={handleClickOpen}></MailViewer> */}
                </ListItemText>
              </Link>
              <ListItemSecondaryAction className={classes.root}>
                {transposeDate(email.received)}
                <IconButton edge="end" onClick={() => handleStarIconClick(email)}>
                  {email.star ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))},
        </List>
      </div>
      <Divider />
    </div>
  );
}

/**
 * The column for the date, time, or year
 * @param {date} date of the month
 * @return {int} the day of the month, year, or time it is.
 */
function transposeDate(date) {
  const emailDate = new Date(date);
  const currDate = new Date();
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const emailMonth = months[emailDate.getMonth()];
  const emailDay = emailDate.getUTCDate();
  const emailYear = emailDate.getFullYear();
  const currYear = currDate.getFullYear();
  const currMonth = months[currDate.getMonth()];
  const currDay = currDate.getDate();
  // Returns the year if email is from over a year ago
  if ((currDay - emailDay) == 1) {
    return ('Yesterday');
  } else if ((currMonth == emailMonth) && (currDay == emailDay) &&
    (currYear == emailYear)) {
    // Returns the time if the date is the current day
    const minutes = emailDate.getUTCMinutes();
    const hours = emailDate.getUTCHours();
    if (hours < 12 && minutes < 10) {
      return (hours + ':' + '0' + minutes + ' AM');
    } else if (hours < 12 && minutes > 9) {
      return (hours + ':' + minutes + ' AM');
    } else if (hours >= 12 && minutes < 10) {
      return (hours + ':' + '0' + minutes + ' PM');
    } else {
      return (hours + ':' + minutes + ' PM');
    }
  } else {
    // Returns the month and day if email is from this year
    return (emailMonth + ' ' + emailDay);
  }
}

/**
 * Returns the sorted received dates in the email
 */
function sortDates(emails) {
  emails.sort(function(a, b) {
    return new Date(b.received) - new Date(a.received);
  });
}

export default Content;

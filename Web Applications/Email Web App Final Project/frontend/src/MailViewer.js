/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import {useHistory} from 'react-router-dom';

import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
  theDate: {
    // margin: theme.spacing(4),
    padding: theme.spacing(-50),
    display: 'inline-grid',
  },
  // Credit to https://stackoverflow.com/questions/64899617/im-having-trouble-overriding-material-ui-root-style-for-dialogactions
  spacing: {
    'justifyContent': 'space-between',
    '&:nth-child(1)': (props) => props.justifyContent,
  },

}));

const fetchEmail = (id, setEmail) => {
  (fetch('http://localhost:3010/v0/mail/' + id, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset = utf-8',
    },
  }))
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setEmail(json);
      // setError('');
      })
      .catch((error) => {
        console.log(error);
      // setError(`${error.status} - ${error.statusText}`);
      });
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

const moveEmail = (mail, mailbox) => {
  const mbox = encodeURIComponent(mailbox);
  // const id = encodeURIComponent(mail.id);
  (fetch('http://localhost:3010/v0/mail/' + mail.id + '?mailbox=' + mbox, {
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

/**
 * @return {object} JSX
 */
export default function MailViewer() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const [users, setUsers] = React.useState([]);

  const [userUpdate, setUserUpdate] = React.useState([false]);
  const {emailID, mailbox} = React.useContext(SharedContext);

  // console.log('I am here rn emails ' + emails);

  const props = {display: 'block', justifyContent: 'flex-start'};
  const classes = useStyles(props);

  const handleClose = () => {
    setOpen(false);
  };

  const handleStarIconClick = (email) => {
    email.star = !email.star;
    // Update star property
    updateEmail(email);
    setUserUpdate(!userUpdate);
  };

  const handleBackClick = () => {
    history.push('/');
  };

  const handleMailIconClick = (email) => {
    email.read = false;
    // Update read property
    updateEmail(email);
    setUserUpdate(!userUpdate);
    history.push('/');
  };

  const handleTrashClick = (email) => {
    // Update star property
    console.log('This is the id of the email ' + email.id);
    console.log(email);
    moveEmail(email, 'Trash');
    setUserUpdate(!userUpdate);
    history.push('/');
  };

  // Component did mount
  React.useEffect(() => {
    fetchEmail(emailID, setEmail);
    fetchUsers(setUsers);
  }, [emailID]);

  const chooseAvatar = (email) => {
    // fetchUsers(setUsers);
    const person = users.find((user) => email == user.useremail);
    return person.avatarurl;
  };

  return (
    <div>
      <div className={classes.spacing}>
        <ArrowBackIosIcon button onClick={() => handleBackClick()} align="left">
        </ArrowBackIosIcon>
        <MailOutlineIcon align="right" button onClick={() => handleMailIconClick(email)} />
        <MoveToInboxIcon align="right" />
        <DeleteIcon align="right" button onClick={() => handleTrashClick(email)} />
      </div>
      <div className={classes.demo}>
        <List>
          <ListItemText>{email.subject}</ListItemText>
          <ListItemText>{mailbox}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => handleStarIconClick(email)}>
              {email.star ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </List>
      </div>
      <div className={classes.demo}>
        <List>
          <ListItem>
            <ListItemAvatar>
              {/* <Avatar src={chooseAvatar(email['from-email'])} alt={email['from-name']}></Avatar> */}
              <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
            </ListItemAvatar>
            <ListItemText
              primary={email['from-name']}
              secondary={email['from-email']}
            >
            </ListItemText>
            <ListItemSecondaryAction className={classes.theDate}>
              {transposeDate(email.received)}
              {/* <IconButton edge="end" onClick={() => handleStarIconClick(email)}>
              {email.star ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
            </IconButton> */}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItemText>{email.content}</ListItemText>
        </List>
      </div>
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
  const emailDay = emailDate.getDate();
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
    const minutes = emailDate.getMinutes();
    const hours = emailDate.getHours();
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

/* eslint-disable max-len */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {useHistory} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import MenuList from '@material-ui/core/MenuList';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  topbuttons: {
    margin: theme.spacing(1),
  },
  dropdown: {
    display: (props) => props.display,
  },
  // Credit to https://stackoverflow.com/questions/64899617/im-having-trouble-overriding-material-ui-root-style-for-dialogactions
  dialogActions: {
    'justifyContent': 'space-between',
    '&:nth-child(1)': (props) => props.justifyContent,
  },
  // Got the following from https://stackoverflow.com/questions/57914368/how-can-i-remove-the-underline-of-textfield-from-material-ui
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
}));

const fetchAllUsers = (setUsers) => {
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
      // setError(`${error.status} - ${error.statusText}`);
      });
};


/**
 * @return {object} JSX
 */
export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState({['to-name']: '', ['to-email']: '', subject: '', content: ''});
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const props = {display: 'block', justifyContent: 'flex-start'};
  const classes = useStyles(props);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendIconClick = (event) => {
    console.log(selectedUser);
    // Create the new email.
    const {value, id} = event.target;
    const e = email;
    e[id] = value;
    e['to-email'] = selectedUser;
    setEmail(e);
    createEmail(email);
  };

  const handleInputChange = (event) => {
    const {value, id} = event.target;
    const e = email;
    e[id] = value;
    setEmail(e);
  };

  const [selectedUser, setSelectedUser] = React.useState('');
  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleContactsClick = () => {
    fetchAllUsers(setUsers);
  };

  const createEmail = (mail) => {
    (fetch('http://localhost:3010/v0/mail/', {
      method: 'post',
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
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open responsive dialog
      </Button> */}
      <MailOutlineIcon onClick={handleClickOpen}></MailOutlineIcon>
      <Dialog
        fullScreen={fullScreen}
        position="absolute"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions className={classes.dialogActions}>
          <ArrowBackIosIcon button onClick={handleClose} align="left">
          </ArrowBackIosIcon>
          <ArrowForwardIcon button onClick={handleSendIconClick} />
        </DialogActions>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel id="to-email">To</InputLabel>
              <Select
                label="to-email"
                id="To"
                value={selectedUser ? selectedUser : ''}
                onChange={handleChange}
                onOpen={() => handleContactsClick()}
              >
                {/* <MenuList>
                  {users.map((user) => (
                    <MenuItem key={user.useremail} value={user.useremail}>
                      <ListItemAvatar>
                        <Avatar src={user.avatarurl} alt={user.username}></Avatar>
                      </ListItemAvatar>
                      <Typography variant="inherit">{user.username}</Typography>
                    </MenuItem>
                  ))}
                </MenuList> */}
                {users.map((user) => (
                  <MenuItem key={user.useremail} value={user.useremail}>{user.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField id="subject"
              label="Subject"
              onChange={handleInputChange} />
            <TextField
              id="content"
              multiline
              placeholder="Compose email"
              disableUnderline={true}
              onChange={handleInputChange}
              InputProps={{classes}}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

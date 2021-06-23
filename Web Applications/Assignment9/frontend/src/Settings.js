/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/ListItemAvatar';
import {useHistory} from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';

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

const fetchUser = (email, setUser) => {
  const useremail = encodeURIComponent(email);
  // eslint-disable-next-line max-len
  fetch('http://localhost:3010/v0/emailuser?user=' + useremail, {
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
        setUser(json[0]);
      })
      .catch((error) => {
        console.log(error);
        setUser([]);
      });
};

/**
 * @return {object} JSX
 */
export default function MailViewer() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const [user, setUser] = React.useState([]);
  const [open, setOpen] = React.useState(false);


  const props = {display: 'block', justifyContent: 'flex-start'};
  const classes = useStyles(props);

  //   const handleBackClick = () => {
  //     history.push('/');
  //   };

  const handleClickOpen = () => {
    fetchUser('claireruffing@mail.com', setUser);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Component did mount
  //   React.useEffect(() => {
  //     fetchUser('claireruffing@mail.com', setUser);
  //   }, []);

  //   const chooseAvatar = (email) => {
  //     // fetchUsers(setUsers);
  //     const person = user.find((u) => email == u.useremail);
  //     return person.avatarurl;
  //   };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open responsive dialog
      </Button> */}
      <AccountCircleRoundedIcon onClick={handleClickOpen}></AccountCircleRoundedIcon>
      <Dialog
        fullScreen={fullScreen}
        position="absolute"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogActions className={classes.spacing}>
          <ArrowBackIosIcon button onClick={handleClose} align="left">
          </ArrowBackIosIcon>
          <SaveIcon align="right" />
        </DialogActions>
        <DialogContent>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user.avatarurl} alt={user.useremail}></Avatar>
                  {/* <AccountCircleRoundedIcon></AccountCircleRoundedIcon> */}
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                  secondary={
                    <div>
                      <div>{user.useremail}</div>
                    </div>
                  }
                >
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );


//   return (
//     <div>
//       <div className={classes.spacing}>
//         <ArrowBackIosIcon button onClick={() => handleBackClick()} align="left">
//         </ArrowBackIosIcon>
//         <SaveIcon align="right" />
//       </div>
//       <div className={classes.demo}>
//         <List>
//           <ListItem>
//             <ListItemAvatar>
//               {/* <Avatar src={chooseAvatar(email['from-email'])} alt={email['from-name']}></Avatar> */}
//               <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
//             </ListItemAvatar>
//             <ListItemText
//               primary={user.username}
//               secondary={
//                 <div>
//                   <div>{user.useremail}</div>
//                 </div>
//               }
//             >
//             </ListItemText>
//           </ListItem>
//         </List>
//       </div>
//     </div>
//   );
}


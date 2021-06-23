import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import emails from './data/emails.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';

/**
 * At the link https://material-ui.com/components/drawers/ in the section
 * named Responsive Drawer I used the source code from there to create
 * the drawer style and Headers, so the area that says
 * "CSE183 Assignment 6 - Inbox" and the drawer on the side that has
 * the Inbox and Trash icons.
*/

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  popup: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    margin: '65px 0 0 0',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeStyle: {
    margin: '0 0 0 auto',
  },
  tableContainer: {
    height: '300px',
  },
  emailContent: {
    padding: '20px 0 0 0',
  },
}));

/**
 * @return {object} Returns the entire responsive drawer
 * @param {string} props parameter
 */
function ResponsiveDrawer(props) {
  const {window} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState('Inbox');
  const [subject, setSubject] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [emailAddr, setEmailAddr] = React.useState('');
  const [received, setReceived] = React.useState('');
  const [content, setContent] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // Have the dates initially sorted
  sortDates();
  // filteredEmails should be an array of just Inbox emails.
  // When the Trash button is clicked, the funciton ResponsiveDrawer re-renders
  // and we go through the code again filtering through Trash emails
  const filteredEmails = emails.filter((email) =>
    (email.trash ? 'Trash' : 'Inbox') === filterValue);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Called an email row is clicked. Set state for selected email.
  const handleEmailClick = (emailId) => {
    // Find the selected email
    const selectedEmail = emails.filter((email) =>
      (email.id == emailId));

    // Set the email state
    setSubject(selectedEmail[0].subject);
    setFrom(selectedEmail[0].from);
    setEmailAddr(selectedEmail[0].email);
    setReceived(selectedEmail[0].received);
    setContent(selectedEmail[0].content);
  };

  // On click of Inbox or Trash set the filterValue state
  // and reset the selectedEmailId state to empty.
  const handleTextClick = (text) => {
    setFilterValue(text);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        {['Inbox', 'Trash'].map((text, index) => (
          <ListItem button='true' key={text}
            onClick={() => handleTextClick(text)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> :
              <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () =>
    window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CSE183 Web Applications - {filterValue}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {filteredEmails.map((email) => (
                <TableRow key={email.id}
                  onClick={() => handleEmailClick(email.id)}>
                  <TableCell align="right">{email.from}</TableCell>
                  <TableCell align="right">{email.subject}</TableCell>
                  <TableCell align="right">{transposeDate(email.received)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.emailContent}>
          <AppBar position="relative" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                {subject}
              </Typography>
              <IconButton autoFocus open={open} color="inherit"
                className={classes.closeStyle}
                onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Paper>
            <Typography>From: {from} ({emailAddr})</Typography>
            <Typography>To: App User (user@app.com)</Typography>
            <Typography>Subject: {subject}</Typography>
            <Typography>Received: {formatReceivedDate(received)}</Typography>
            <br></br>
            <Typography>{content}</Typography>
          </Paper>
        </div>
      </main>
    </div>
  );
}

/**
 * The column for the date, time, or year
 * @param {date} date of the email
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
  if ((currYear - emailYear) > 1) {
    return (emailYear);
  } else if ((currMonth == emailMonth) && (currDay == emailDay) &&
    (currYear == emailYear)) {
    // Returns the time if the date is the current day
    // Used StackOverflow to pad a single digit hour and minute with a zero
    // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/42389398
    const hours = ('0' + emailDate.getUTCHours()).slice(-2);
    const minutes = ('0' + emailDate.getUTCMinutes()).slice(-2);
    return (hours + ':' + minutes);
  } else {
    // Returns the month and day if email is from this year
    return (emailMonth + ' ' + emailDay);
  }
}

/**
 * Format the email by received date.
 * @param {date} date of the email
 * @return {int} fomatted date
 */
function formatReceivedDate(date) {
  if (date == '') {
    return;
  }
  const emailDate = new Date(date);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const emailMonth = months[emailDate.getMonth()];
  const emailDay = emailDate.getDate();
  const emailYear = emailDate.getFullYear();
  // Used StackOverflow to pad a single digit hour and minute with a zero
  // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/42389398
  const emailHours = ('0' + emailDate.getUTCHours()).slice(-2);
  const emailMins = ('0' + emailDate.getUTCMinutes()).slice(-2);

  return emailMonth + ' ' + emailDay + ', ' + emailYear + ' @ ' +
    emailHours + ':' + emailMins;
}

/**
 * Returns the sorted received dates in the email
 */
function sortDates() {
  emails.sort(function(a, b) {
    return new Date(b.received) - new Date(a.received);
  });
}

ResponsiveDrawer.propTypes = {
  /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

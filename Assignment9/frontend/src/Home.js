/* eslint-disable max-len */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SharedContext from './SharedContext';
import TitleBar from './TitleBar';
import Content from './Content';
import MailboxDrawer from './MailboxDrawer';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/**
 * @return {object} JSX
 */
function Home() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const {emailID, setEmailID, mailbox, setMailbox} = React.useContext(SharedContext);

  window.addEventListener('resize', () => {
    setDrawerOpen(false);
  });

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <SharedContext.Provider value={{
        mailbox, setMailbox,
        drawerOpen, setDrawerOpen,
        toggleDrawerOpen, emailID, setEmailID,
      }}
      >
        <TitleBar />
        <MailboxDrawer />
        <Content />
      </SharedContext.Provider>
    </div>
  );
}

export default Home;

/* eslint-disable max-len */
import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import SharedContext from './SharedContext';
import ComposeEmail from './Compose';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   zIndex: theme.zIndex.drawer +300,
  // },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rightAlign: {
    marginLeft: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // eslint-disable-next-line quote-props
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

/**
 * @return {oject} JSX
 */
function TitleBar() {
  // const {mailbox, toggleDrawerOpen} = React.useContext(SharedContext);
  const {toggleDrawerOpen} = React.useContext(SharedContext);
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawerOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" noWrap>
          CSE183 Simplest - {mailbox}
        </Typography> */}
        {/* <div className={classes.rightAlign}> */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
          />
        </div>
        <ComposeEmail></ComposeEmail>
        <Settings></Settings>
      </Toolbar>
    </AppBar>
  );
}

export default TitleBar;

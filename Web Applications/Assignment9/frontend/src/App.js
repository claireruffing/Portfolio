/* eslint-disable max-len */
import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';

import SharedContext from './SharedContext';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MailViewer from './MailViewer';

/**
 * CREDIT: I used Professor Harrisons base code from his basic solution
 * to Assignment 6 for the basis of this assignment.
 *
 */

/**
 * @return {object} JSX
 */
function App() {
  const [emailID, setEmailID] = React.useState([]);
  const [mailbox, setMailbox] = React.useState('Inbox');

  // Component did mount
  // React.useEffect(() => {
  //   fetchEmail(emailID, setEmailID); // , setError);
  // }, [emailID]);

  return (
    <Router>
      <SharedContext.Provider value={{emailID, setEmailID, mailbox, setMailbox}}>
        <Switch>
          <Route path="/MailViewer">
            <MailViewer></MailViewer>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </SharedContext.Provider>
    </Router>
  );
}

export default App;

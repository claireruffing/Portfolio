import React from 'react';
// import Desktop1 from './Desktop1';
import DesktopComponent from './DesktopComponent';
// import OpenEmail from './OpenEmail';
// import SortTableByDate from './SortTableByDate';


/**
 * Simple component with no state.
 *
 * See the basic-react from lecture 11 for an example of adding and
 * reacting to changes in state and lecture 16 for details on Material-UI
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <DesktopComponent></DesktopComponent>
      {/* Got the following line from this website
      https://sitebulb.com/hints/mobile-friendly/the-viewport-meta-tag-has-a-minimum-scale-set/ */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </div>
  );
}

export default App;

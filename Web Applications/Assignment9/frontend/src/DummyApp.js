import React from 'react';

/**
 * Simple component with no state.
 *
 * @param {function} setDummy set the dummy state
 */
function getDummy(setDummy) {
  fetch('http://localhost:3010/v0/dummy')
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setDummy(json.message);
      })
      .catch((error) => {
        setDummy(error.toString());
      });
}

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const [dummy, setDummy] = React.useState('');
  return (
    <div>
      <h3 id='instruction'>
        Click button to connect to the Backend dummy endpoint</h3>
      <button
        onClick={(event) => {
          getDummy(setDummy);
        }}
      >
        Get Dummy
      </button>
      <p/>
      <label>{dummy}</label>
    </div>
  );
}

export default App;

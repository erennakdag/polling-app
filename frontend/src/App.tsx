import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import { API } from '././API';

function App() {

  let bruh = "bruh";

  API.test().then(res => console.log(res));

  return (
    <div className="App">
      <h1>{bruh}</h1>

      <Link to="/signin">Sign In</Link> <br />
      <Link to="/signup">Sign Up</Link>

    </div>
  );
}

export default App;

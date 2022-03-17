import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// async function api(url: string) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return await response.json();
// }

function App() {

  let bruh = "bruh";
  // api('http://127.0.0.1:8000/').then(res => console.log(res)).catch(err => console.log("WHYY"));
  
  return (
    <div className="App">
      <h1>{bruh}</h1>

      <Link to="/signin">Sign In</Link> <br />
      <Link to="/signup">Sign Up</Link>

    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import UserDash from './components/userDash'


import "./App.css";

function App() {

  return (

    <Router>
      <div className="App">
        <h1>Co-Make</h1>
      </div>
      <Route path={'/login'}>
        <Login />
      </Route>
      <Route path={'/register'}>
      <Register />

      </Route>
      <Route path={'/userDash'}>
      <UserDash />

      </Route>
      
    </Router>

  );
}

export default App;

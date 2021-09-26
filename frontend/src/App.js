import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './Component/LoginForm';
import Main from './Component/Main';
import User from './Component/User';
import Role from './Component/Role';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          {window.localStorage.getItem('token') ? <Main /> : <Redirect to="/login" />}
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/role">
          <Role />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

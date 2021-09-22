import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './Component/LoginForm';
import Main from './Component/Main';
import instance from './apiInstance';
function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          {window.localStorage.getItem('token') ? <Main /> : <Redirect to="/login" />}
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

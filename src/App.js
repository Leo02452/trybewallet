import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/carteira" component={ Wallet } exact />
      </Switch>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navbar from './components/navbar';
import Login from './components/views/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserRoute from './user-route';
import Home from './components/views/home';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/login" component={Login} />
              <UserRoute exact path="/" component={Home} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

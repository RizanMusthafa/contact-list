import React, { Component } from 'react';
import Navbar from './components/navbar';
import Login from './components/views/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserRoute from './user-route';
import Contacts from './components/views/contacts';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <UserRoute exact path="/" component={Contacts} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navbar from './components/navbar';
import Login from './components/views/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

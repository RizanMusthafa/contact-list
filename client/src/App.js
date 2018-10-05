import React, { Component } from 'react';
import Navbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <h1>Content Area</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

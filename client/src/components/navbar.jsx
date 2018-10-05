import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <div className="container">
          <a href="/" className="navbar-brand">
            Contact Maneger
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;

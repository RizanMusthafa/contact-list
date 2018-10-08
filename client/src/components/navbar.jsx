import React from 'react';
import Link from 'react-router-dom/Link';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Contact Maneger
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;

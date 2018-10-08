import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/auth-action';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Contact Maneger
          </Link>
        </div>
        <ul className="navbar-nav">
          {this.props.token ? (
            <li className="nav-item">
              <button onClick={this.props.logout} className="btn btn-danger">
                LogOut
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/auth-action';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    from: null,
    email: '',
    password: '',
    errors: {
      email: [],
      password: []
    }
  };

  static PropType = {
    login: PropType.func.isRequired,
    token: PropType.string.isRequired
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.login(null, token);
    }
  }

  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    if (this.props.token) return <Redirect to="/" />;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.handleSubmit} className="my-5 card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleFieldChange}
                />
              </div>
            </div>
            <div className="card-footer text-right">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
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
      login
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

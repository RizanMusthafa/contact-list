import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../redux-store/actions/auth-action';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/user-service';
import FormValidate from '../../common/form-validate';

class Login extends React.Component {
  state = {
    from: null,
    formErr: null,
    email: '',
    password: '',
    errors: {
      email: [],
      password: []
    }
  };

  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.loginFormValidate = new FormValidate([
      {
        field: 'email',
        name: 'Email',
        required: true,
        pattern: /^rizan$/,
        minLength: 5,
        maxLength: 100
      },
      {
        field: 'password',
        name: 'Password',
        required: true
      }
    ]);
  }

  static PropType = {
    login: PropType.func.isRequired,
    token: PropType.string.isRequired
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) this.props.login(token);
  }

  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value, formErr: null });
  };

  isValid() {
    const { isValid, err } = this.loginFormValidate.validate({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({ errors: err });
    return isValid;
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isValid()) return;
    this.userService
      .loginUser({
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.err) this.setState({ formErr: res.err });
        else this.props.login(res.res);
      })
      .catch(err => this.setState({ formErr: err }));
  };

  render() {
    if (this.props.token) return <Redirect to="/" />;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.handleSubmit} className="my-5 card">
            <div className="card-header">
              <h3>Login</h3>
              <div className="text-danger">{this.state.formErr}</div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className={
                    'form-control' +
                    (this.state.errors.email.length ? ' is-invalid' : '')
                  }
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFieldChange}
                />
                <div className="invalid-feedback">
                  {this.state.errors.email.map(err => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className={
                    'form-control' +
                    (this.state.errors.password.length ? ' is-invalid' : '')
                  }
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleFieldChange}
                />
                <div className="invalid-feedback">
                  {this.state.errors.password.map(err => (
                    <p key={err}>{err}</p>
                  ))}
                </div>
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

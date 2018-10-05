import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <form className="my-5 card">
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
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

export default Login;

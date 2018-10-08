import React from 'react';
import { Route } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import { connect } from 'react-redux';

const UserRoute = ({ component: Component, token, ...rest }) => {
  const isLogin = Boolean(token);
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component />
        ) : (
          <Redirect to="/login" state={{ from: props.location }} />
        )
      }
    />
  );
};

export default connect(state => ({ token: state.auth.token }))(UserRoute);

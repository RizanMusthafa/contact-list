import React from 'react';
import { Route } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';

const UserRoute = ({ component: Component, ...rest }) => {
  const isLogin = false;
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

export default UserRoute;

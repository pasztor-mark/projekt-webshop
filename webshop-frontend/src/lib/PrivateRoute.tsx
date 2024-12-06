import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from '@/components/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
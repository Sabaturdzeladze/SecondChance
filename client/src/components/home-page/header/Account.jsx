import React from 'react'
import { Link } from 'react-router-dom';

export const Account = props => {
  const user = JSON.parse(localStorage.getItem('user'));
  let isAdmin = user ? user.isAdmin : false;
  return !props.value.isLogged ? (
    <>
      <Link to="/login">Log in</Link>
      <Link to="/register">Register</Link>
    </>
  ) : (
    <>
      <Link
        to="/"
        onClick={() => {
          props.value.onStateChange({ user: {}, isLogged: false });
          localStorage.clear();
        }}
      >
        Log out
      </Link>
      <Link to={isAdmin ? `/admin` : `/dashboard`}>My Account</Link>
    </>
  );
};

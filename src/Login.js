import React from 'react';
import { connect } from 'react-redux';
import { attemptLogout } from './store';

const _Login = ({ auth, attemptLogout }) =>
  <div>
    Welcome { auth.name }
    <button onClick={ attemptLogout }>Logout</button>
  </div>

const Login = connect(({ auth }) => {
  return { auth }
}, (dispatch) => {
  return {
    attemptLogout: () => dispatch(attemptLogout())
  }
})(_Login)

export default Login

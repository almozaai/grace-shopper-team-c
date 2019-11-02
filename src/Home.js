
import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import LoginForm from './LoginForm';
import Login from './Login';

const _Home = ({ auth }) => {
  return (
    <div>
      <h1>Home Page</h1>
      {
        !auth.id ? <LoginForm /> : <Login />
      }
      <Search />
    </div>
  );
};

const Home = connect(({ auth }) => {
  return { auth }
})(_Home);

export default Home;

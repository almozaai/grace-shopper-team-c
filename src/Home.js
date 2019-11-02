import { render } from "react-dom";
import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import Search from "./Search";
import LoginForm from "./LoginForm";
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

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

const _Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Search />
    </div>
  );
};

const Home = connect()(_Home);

export default Home;

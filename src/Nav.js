import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"

const _Nav = () => {
  return (
    <nav>
      <NavLink to='/' >Home</NavLink>
      <NavLink to='/users' >Users</NavLink>
      <NavLink to='/products' >Products</NavLink>
      <NavLink to='/cart' >Cart</NavLink>
    </nav>
  )
};
const Nav = connect()(_Nav);

export default Nav

import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"
import Users from './Users';
import { getProductsThunk } from './store';

const _Nav = ({users, products, cart}) => {
  return (
    <nav>
      <NavLink to='/' >Home</NavLink>
      <NavLink to='/users' >Users ({users.length})</NavLink>
      <NavLink to='/products' >Products ({products.length})</NavLink>
      <NavLink to='/cart' >Cart ({cart.length})</NavLink>
    </nav>
  )
};
const Nav = connect(state => state)(_Nav);

export default Nav

import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"
const root = document.querySelector('#root')

import Nav from './Nav';
import store, {getUsersThunk, getProductsThunk} from './store';
import Users from './Users';
import Products from './Products';
import Home from './Home';
import User from './User';


class _App extends Component{
  componentDidMount(){
    this.props.getUsers();
    this.props.getProducts();
  }
  render(){
    return (
      <HashRouter>
        <Route component={Nav} />
        
        <Route path='/' component={Home} exact />
        <Route exact path='/users' component={Users} />
        <Route path='/users/:id' component={User} />
        <Route path='/products' component={Products} />
        <Redirect to='/' />
      </HashRouter>
    )
  }
}
const App = connect(null, (dispatch)=>{
  return {
    getUsers: ()=> dispatch(getUsersThunk()),
    getProducts: ()=> dispatch(getProductsThunk())
  }
})(_App);

render(<Provider store={store}><App /></Provider>, root);

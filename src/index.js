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
import User from './SignUp';
import Products from './Products';
import Home from './Home';
import Cart from './Cart';
import { attemptSession } from './store';


class _App extends Component{
  componentDidMount(){
    this.props.getUsers();
    this.props.getProducts();
    this.props.attemptSession()
      .catch(ex => console.log(ex))
  }
  render(){
    const { loggedIn } = this.props;
    return (
      <HashRouter>
        <Route component={Nav} />
        <Route path='/' component={Home} exact />
        <Route path='/users' component={Users} />
        <Route path='/user' component={User} />
        <Route path='/products' component={Products} />
        <Route path='/cart' component={Cart} />
        <Redirect to='/' />
      </HashRouter>
    )
  }
}
const App = connect(({ auth }) => {
  return {
    loggedIn: !!auth.id
  }
}, (dispatch)=>{
  return {
    getUsers: ()=> dispatch(getUsersThunk()),
    getProducts: ()=> dispatch(getProductsThunk()),
    attemptSession: () => dispatch(attemptSession())
  }
})(_App);

render(<Provider store={store}><App /></Provider>, root);

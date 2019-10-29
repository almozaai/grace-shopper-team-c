import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"

class _Users extends Component{
  render(){
    return (
      <div>
        <ul>
          {
            this.props.users.map(user => <li key={user.id} >
              <Link to={`/users/${user.id}`}>
              {user.name}
              </Link>
              </li>)
          }
        </ul>
      </div>
    )
  }
}
const Users = connect(({users})=>{
  return {
    users
  }
})(_Users);

export default Users

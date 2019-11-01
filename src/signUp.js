import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"

import {createUserThunk} from './store'

class _User extends Component{
  constructor(){
    super();
    this.state={
      error: ''
    }
    this.create = this.create.bind(this)
  }
  async create(){
    const theState = {name: this.state.name, email: this.state.email, password: this.state.password}
    try{
    await this.props.toCreate(theState);
    }
    catch(ex){
      alert(ex)
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={ev => ev.preventDefault()} className='userForm' >
          <div>User Name: <input value={this.state.name} placeholder='enter name here' onChange={ev => this.setState({name: ev.target.value})} /></div>
          <br/>
          <div>Email: <input value={this.state.email} placeholder='enter email here' onChange={ev => this.setState({email: ev.target.value})} /></div>
          <br/>
          <div>Password: <input value={this.state.password} placeholder='enter email here' onChange={ev => this.setState({password: ev.target.value})} /></div>
          <br/>
          <Link to='/users' ><button onClick={this.create} >Add User</button></Link>
        </form>
      </div>
    )
  }
}
const User = connect(({users})=>{
  return {
    users,
  }
}, (dispatch)=>{
  return {
    toCreate: (user) => dispatch(createUserThunk(user)),
  }
})(_User)

export default User

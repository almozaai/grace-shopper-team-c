import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"

const GET_USERS = 'GET_USERS'
const GET_PRODUCTS = 'GET_PRODUCTS'

// USER REDUCER
const userReducer = (state=[], action)=>{
  if(action.type === GET_USERS){
    return action.users
  }
  return state
}

// PRODUCT REDUCER
const productReducer = (state=[], action)=>{
  if(action.type === GET_PRODUCTS){
    return action.products
  }
  return state
}

//REDUCER
const reducer = combineReducers({
  users: userReducer,
  products: productReducer
})

//STORE
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//ACTION CREATORS
const getUsers = (users) => ({type: GET_USERS, users});
const getProducts = (products) => ({type: GET_PRODUCTS, products});

//User thunks
const getUsersThunk = ()=>{
  return async (dispatch)=>{
    const response = (await axios.get('/api/users')).data;
    dispatch(getUsers(response))
  }
}

//Product thunks
const getProductsThunk = ()=>{
  return async (dispatch)=>{
    const response = (await axios.get('/api/products')).data;
    dispatch(getProducts(response));
  }
}

export default store;
export {getProductsThunk, getUsersThunk}

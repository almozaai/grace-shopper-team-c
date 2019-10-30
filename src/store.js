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

const GET_USERS = "GET_USERS";
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_To_CART";
const ADD_CART = "ADD_To_CART";
const DELETE_CART = "DELETE_CART";

const userReducer = (state = [], action) => {
  if (action.type === GET_USERS) {
    return action.users;
  }
  return state;
};

const productReducer = (state = [], action) => {
  if (action.type === GET_PRODUCTS) {
    return action.products;
  }
  if (action.type === ADD_TO_CART) {
    return state.map(item => (item.id === action.item.id ? action.item : item));
  }
  return state;
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_CART:
      return [...state, action.item];
    case DELETE_CART:
      return state.filter(item => item.id !== action.item.id);
    default:
      return state;
  }
};

const reducer = combineReducers({
  users: userReducer,
  products: productReducer,
  cart: cartReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//action creators
const getUsers = users => ({ type: GET_USERS, users });
const getProducts = products => ({ type: GET_PRODUCTS, products });
const getCart = cart => ({ type: GET_CART, cart });
const _addToCart = item => {
  console.log(item);
  return { type: ADD_TO_CART, item };
};
const deleteCartItem = item => ({ type: DELETE_CART, item });

//User thunks
const getUsersThunk = () => {
  return async dispatch => {
    const response = (await axios.get("/api/users")).data;
    dispatch(getUsers(response));
  };
};

//Product thunks
const getProductsThunk = () => {
  return async dispatch => {
    const response = (await axios.get("/api/products")).data;
    dispatch(getProducts(response));
  };
};

const addToCart = item => {
  return async dispatch => {
    const respoanse = (await axios.post(`/api/products/${item.id}`, item)).data;
    dispatch(_addToCart(respoanse));
  };
};

export default store;
export { getProductsThunk, getUsersThunk, getCart, deleteCartItem, addToCart };

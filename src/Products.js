import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"

class _Products extends Component{
  render(){
    return (
      <div>
        <ul>
          {
            this.props.products.map(product => <li key={product.id} >{product.name}</li>)
          }
        </ul>
      </div>
    )
  }
}
const Products = connect(({products})=>{
  return {
    products
  }
})(_Products);

export default Products

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
        <div className='ordering' >
          {
            this.props.products.map(product => <div key={product.id} className='border' >
              {product.name}
              <br/>
              ${product.price}
              <br/>
              <button>Add to Cart</button>
              </div>)
          }
        </div>
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

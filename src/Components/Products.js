import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCartItem, createOrderThunk } from '../redux/store';

class _Products extends Component {
  render() {
    return (
      <div>
        <div className="ordering">
          {this.props.products.map(product => (
            <div key={product.id} className="border">
              {product.name}
              <br />${product.price}
              <br />
              <button onClick={() => this.props.toCreate(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const Products = connect(
  ({ products }) => {
    return {
      products
    };
  },
  dispatch => {
    return {
      toCreate: item => dispatch(addCartItem(item)),
      creteOrder: order => dispatch(createOrderThunk(order))
    };
  }
)(_Products);

export default Products;

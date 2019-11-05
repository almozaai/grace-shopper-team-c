import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCartItemThunk, createOrderThunk } from '../redux/store';

class _Products extends Component {
  async create(e, product) {
    e.preventDefault();

    const checkOrder = this.props.orders.filter(order => {
      return this.props.cart.find(item => item.orderId == order.id);
    });
    if (!checkOrder.length) {
      this.props.creteOrder({ userId: this.props.auth.id });
    } else {
      await this.props.toCreate({ productId: product.id, orderId: order.id });
    }
  }
  render() {
    return (
      <div>
        <div className="ordering">
          {this.props.products.map(product => (
            <div key={product.id} className="border">
              {product.name}
              <br />${product.price}
              <br />
              <button onClick={e => this.create(e, product)}>
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
  ({ products, auth, cart, orders }) => {
    return {
      products,
      auth,
      cart,
      orders
    };
  },
  dispatch => {
    return {
      toCreate: item => dispatch(addCartItemThunk(item)),
      creteOrder: order => dispatch(createOrderThunk(order))
    };
  }
)(_Products);

export default Products;

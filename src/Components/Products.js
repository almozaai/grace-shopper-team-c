import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCartItemThunk, createOrderThunk } from '../redux/store';

class _Products extends Component {
  create(e, product) {
    e.preventDefault();
    console.log(this.props.cart, this.props.orders);
    if (this.props.auth) {
      const checkOrder = this.props.orders.filter(
        order => order.userId === this.props.auth.id
      );
      if (!checkOrder.length) {
        this.props.creteOrder({ userId: this.props.auth.id });
        const order = this.props.orders.filter(
          order => order.userId === this.props.auth.id
        );
        if (order.length) {
          this.props.toCreate({
            productId: product.id,
            orderId: order[0].id
          });
        }
      } else {
        this.props.toCreate({
          productId: product.id,
          orderId: this.props.orders.filter(
            order => order.userId === this.props.auth.id
          )[0].id
        });
      }
    }
  }
  render() {
    return (
      <div>
        <div className='ordering'>
          {this.props.products.map(product => (
            <div key={product.id} className='border'>
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

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCartItem} from './store';

class Cart extends Component{
  render(){
    const {cart, destroy, cartTotal} = this.props
    if (cart.length === 0) {
      return (
        <div>
          <h2>Your Cart</h2>
          <div>Your cart is empty</div>
        </div>
      );
    }
    return(
      <div>
        <h2>Your Cart</h2>
        <ul>
          {
            cart.map((item, idx)=>
            <li key={idx}>
              {item.name} ${item.price}
              <button onClick={()=> destroy(idx)}>Remove Item</button>
            </li>)
          }
        </ul>
        <h3>Subtotal ${cartTotal}</h3>
        <button>Submit Order</button>
      </div>
    )
  }
}

const mapStateToProps = ({cart, products})=> {
  //cartTotal maps the prices of each item in a cart and totals those prices. Note: doesn't account for tax
  const cartTotal = cart.map(item => item.price*1).reduce((acc, curr)=> acc + curr, 0).toFixed(2);
  return {
    cart,
    products,
    cartTotal
  };
}

const mapDispatchToProps = (dispatch)=> {
   return {
     destroy: (idx)=>{
       return dispatch(deleteCartItem(idx))
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)

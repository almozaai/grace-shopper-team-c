import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCartItem} from './store';

class Cart extends Component{
  render(){
    const {cart, destroy} = this.props
    return(
      <div>
        <h2>Your Cart</h2>
        <ul>
          {
            cart.map(item=>
            <li key={item.id}>
              {item.name}
              <button onClick={()=>destroy(item)}>Remove Item</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=> {
   return {
     destroy: (item)=>{
       return dispatch(deleteCartItem(item))
     }
  }
}


export default connect(state=> state, mapDispatchToProps)(Cart)

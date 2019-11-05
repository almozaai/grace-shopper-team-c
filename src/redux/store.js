import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  getProductsThunk,
  getUsersThunk,
  createUserThunk,
  attemptLogin,
  attemptSession,
  attemptLogout,
  createOrderThunk,
  addCartItemThunk
} from './thunk.js';
import { getCart, addCartItem, deleteCartItem } from './action.js';
import { reducer, composeEnhancers } from './reducer.js';

const store = createStore(
  reducer,
  //applyMiddleware(thunkMiddleware),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
export {
  getProductsThunk,
  getUsersThunk,
  getCart,
  addCartItem,
  deleteCartItem,
  createUserThunk,
  attemptLogin,
  attemptSession,
  attemptLogout,
  addCartItemThunk,
  createOrderThunk
};

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {getProductsThunk, getUsersThunk, createUserThunk, attemptLogin, attemptSession, attemptLogout} from './thunk.js'
import { getCart, addCartItem, deleteCartItem} from './action.js';
import { reducer } from './reducer.js';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
export {getProductsThunk, getUsersThunk, getCart, addCartItem, deleteCartItem, createUserThunk, attemptLogin, attemptSession, attemptLogout}

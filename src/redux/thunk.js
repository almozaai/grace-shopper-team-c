import axios from 'axios';

import {
  setAuth,
  logOutAuth,
  keepSession,
  getUsers,
  createUsers,
  getProducts,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getCart,
  addCartItem,
  deleteCartItem
} from './action.js';

// Auth thunks
const attemptLogin = user => {
  return async dispatch => {
    const auth = (await axios.post('/api/login', {
      email: user.email,
      password: user.password
    })).data;
    dispatch(setAuth(auth));
    //history.push('/')
  };
};

const attemptLogout = () => {
  return async dispatch => {
    await axios.delete('/api/logout');
    dispatch(logOutAuth());
  };
};

const attemptSession = () => {
  return async dispatch => {
    const auth = (await axios.get('/api/session')).data;
    dispatch(keepSession(auth));
  };
};

//User thunks
const getUsersThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/users')).data;
    dispatch(getUsers(response));
  };
};
const createUserThunk = user => {
  return async dispatch => {
    const response = (await axios.post('/api/users', user)).data;
    dispatch(createUsers(response));
  };
};

//Product thunks
const getProductsThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/products')).data;
    dispatch(getProducts(response));
  };
};

//Order thunks
const getOrdersThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/orders')).data;
    dispatch(getOrders(response));
  };
};

const createOrderThunk = order => {
  return async dispatch => {
    const response = (await axios.post('/api/orders', order)).data;
    dispatch(createOrder(response));
  };
};

const updateOrderThunk = order => {
  return async dispatch => {
    const resopnse = (await axios.put(`/api/orders/${order.id}`, order)).data;
    dispatch(updateOrder(resopnse));
  };
};

const deleteOrderThunk = order => {
  return async dispatch => {
    const response = (await axios.delete(`api/orders/${order.id}`)).data;
    dispatch(deleteOrder(response));
  };
};

//LineItem thunk
const getCartThunk = () => {
  return async dispatch => {
    const response = (await axios.get('/api/carts')).data;
    dispatch(getCart(response));
  };
};

const addCartItemThunk = item => {
  return async dispatch => {
    const response = (await axios.post('/api/carts'), item).data;
    dispatch(addCartItem(response));
  };
};

const deleteCartItemThunk = item => {
  return async dispatch => {
    const response = (await axios.delete(`api/carts/${item.id}`)).data;
    dispatch(deleteCartItem(response));
  };
};

export {
  getProductsThunk,
  getUsersThunk,
  createUserThunk,
  attemptLogin,
  attemptSession,
  attemptLogout,
  getOrdersThunk,
  createOrderThunk,
  updateOrderThunk,
  deleteOrderThunk,
  getCartThunk,
  addCartItemThunk,
  deleteCartItemThunk
};

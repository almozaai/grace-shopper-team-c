
const GET_USERS = 'GET_USERS'
const CREATE_USERS = 'CREATE_USERS'
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_CART = 'GET_CART'
const ADD_CART = 'ADD_CART'
const DELETE_CART = 'DELETE_CART'
const SET_AUTH = 'SET_AUTH';



//action creators
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const logOutAuth = () => ({ type: SET_AUTH, auth: {} });
const keepSession = (auth) => ({ type: SET_AUTH, auth });
const getUsers = (users) => ({type: GET_USERS, users});
const createUsers = (user) => ({type: CREATE_USERS, user});
const getProducts = (products) => ({type: GET_PRODUCTS, products});
const getCart = (cart)=> ({ type: GET_CART, cart});
const addCartItem = (item)=> {
  return { type: ADD_CART, item }
};
const deleteCartItem = (idx)=> ({ type: DELETE_CART, idx});

export { getCart, addCartItem, deleteCartItem, setAuth, logOutAuth, keepSession, getUsers, createUsers, getProducts, SET_AUTH, GET_USERS, GET_PRODUCTS, GET_CART, ADD_CART, DELETE_CART, CREATE_USERS}

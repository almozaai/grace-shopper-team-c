import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
const root = document.querySelector('#root');

import Nav from './Components/Nav';
import store, {
  getUsersThunk,
  getProductsThunk,
  getCartThunk,
  getOrdersThunk
} from './redux/store';
import Users from './Components/Users';
import SignUp from './Components/SignUp';
import UserProfile from './Components/UserProfile';
import UpdateUserForm from './Components/UpdateUserForm';
import DeleteUser from './Components/DeleteUser';
import Products from './Components/Products';
import Home from './Components/Home';
import Cart from './Components/Cart';
import { attemptSession } from './redux/store';

class _App extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getProducts();
    this.props.getCart();
    this.props.getOrders();
    this.props.attemptSession().catch(ex => console.log(ex));
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <HashRouter>
        <Route component={Nav} />
        <Route path='/' component={Home} exact />
        <Route path='/users' component={Users} />
        <Route path='/signup' component={SignUp} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/settings/profile' component={UpdateUserForm} exact />
        <Route path='/settings/deactivate' component={DeleteUser} exact />
        <Route path='/products' component={Products} />
        <Route path='/cart' component={Cart} />
      </HashRouter>
    );
  }
}
const App = connect(
  ({ auth }) => {
    return {
      loggedIn: !!auth.id
    };
  },
  dispatch => {
    return {
      getUsers: () => dispatch(getUsersThunk()),
      getProducts: () => dispatch(getProductsThunk()),
      attemptSession: () => dispatch(attemptSession()),
      getCart: () => dispatch(getCartThunk()),
      getOrders: () => dispatch(getOrdersThunk())
    };
  }
)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

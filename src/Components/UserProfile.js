import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogout } from '../redux/store';

class _UserProfile extends Component {
  render(){
    const { auth, logout, users } = this.props;

    //if guest tries to access /profile, link to home page
    if(!auth.id || users.length === 0){
      return (
        <div>
          <h3>Hello guest,</h3>
          <Link to='/'>Return Home</Link>
        </div>
      );
    }

    const user = users.find( user => user.id === auth.id);

    if(!user.id){
      return <h1>loading...</h1>
    }

    return (
      <div className='userProfileContainer'>
        <h1>Account Information</h1>
        <h3>Name: {auth.name} </h3>
        <h3>Email: {auth.email} </h3>
        <h3>Order History</h3>
        <ul>
          {
            !user.orders || user.orders.length === 0 ?
              <div>No Orders</div> :
            user.orders.map( order =>
              <li key={order.id}>
                <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
              </li>
            )
          }
        </ul>
        <div><Link to='/settings/profile'>Edit profile</Link></div>
        <br></br>
        <Link to='/'><button onClick={logout}>Logout</button></Link>
        <br></br><br></br>
        <div><Link to='/settings/deactivate'>Deactivate Account</Link></div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, users })=> ({ auth, users });

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(attemptLogout())
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile);

export default UserProfile;

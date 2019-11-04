import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { attemptLogout } from '../redux/store';

class _UserProfile extends Component {
  render(){
    const { auth, logout } = this.props;

    //if guest tries to access /profile, link to home page
    if(!auth.id){
      return (
        <div>
          <h3>Hello guest,</h3>
          <Link to='/'>Return Home</Link>
        </div>
      );
    }

    return (
      <div className='userProfileContainer'>
        <h1>Account Information</h1>
        <h3>Name: {auth.name} </h3>
        <h3>Email: {auth.email} </h3>
        <div><Link to='/settings/profile'>Edit profile</Link></div>
        <br></br>
        <button onClick={logout}><Link to='/'>Logout</Link></button>
        <br></br><br></br>
        <div><Link to='/settings/deactivate'>Deactivate Account</Link></div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth })=> ({ auth });

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(attemptLogout())
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile);

export default UserProfile;

import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogout } from '../redux/store';

const _DeleteUser = ({auth, logout})=> {

  if(!auth.id){
    return (
      <Redirect to='/' />
    );
  }

  return (
    <div>
      <h1>Delete Account, {auth.name}</h1>
      <h3>Are you sure you want to deactivate your account?</h3>
      <div>Note: this will delete all account information, including order history.</div>
      <br></br>
      <button onClick={ ()=> {
        logout();
      }}>Deactivate Account</button>
    </div>
  );
}


const mapStateToProps = ({ auth, users })=> ({ auth, users});

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(attemptLogout()),
    destroy: (user)=> dispatch(deleteUserThunk(user))
  }
}

const DeleteUser = connect(mapStateToProps, mapDispatchToProps)(_DeleteUser);

export default DeleteUser;

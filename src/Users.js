import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class _Users extends Component{
  render(){
    console.log(this.props.users)
    return (
      <div>
        <div>
          <ul>
            {
              this.props.users.map(user => <li key={user.id} >{user.name}</li>)
            }
          </ul>
        </div>
        <Link to='/user' ><button>Sign up</button></Link>
      </div>
    )
  }
}
const Users = connect(({users})=>{
  return {
    users
  }
})(_Users);

export default Users

import React, { Component } from 'react';
import { connect } from 'react-redux';

class _LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ [ ev.target.name ]: ev.target.value });
  }

  render() {
    const { email, password } = this.state;
    const { onChange } = this;

    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={ ev => ev.preventDefault() }>
          <div>
            <input placeholder="email" value={ email } type="text" name="email" onChange={ onChange } />
          </div>
          <div>
            <input placeholder="password" value={ password } type="password" name="password" onChange={ onChange } />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const LoginForm = connect()(_LoginForm);

export default LoginForm;


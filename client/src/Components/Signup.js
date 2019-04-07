import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    err: ''
  }

  // Standard ES5, the this keyword is binded when the function is run 
  // this keyword is going to be undefined, it loses its context

  // ES6 Function declaration (arrow function)
  // It binds the `this` keyword at the time of creation 
  onChange = event => {
    // this is binded to Signup component 
    this.setState({ [event.target.name]: event.target.value });

  }

  // Event is the form submit event 
  signUp = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    }

    try {
      const res = await axios.post('/api/user/signup', user);
      if (res.data === 'Email already exists') {
        this.setState({ err: 'Email already exists' });
      } else {
        // If we get back a token, store it in local storage
        localStorage.setItem('jwt', res.data);
        this.props.history.push('/');
      }
    } catch (err) {
      this.setState({ err });
    }





  }

  render() {
    const { err } = this.state;
    return (
      <form onSubmit={this.signUp}>
        <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
        <input type="password" name="password" placeholder="Password" minLength="8" onChange={this.onChange} />
        <button type="submit"> Signup </button>
        {err && <p> {err} </p>}
      </form>
    )
  }


}

export default Signup;
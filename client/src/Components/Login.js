import React, { Component } from 'react';
import axios from 'axios';
import '../css/Signup.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    err: ''
  }

  // Standard ES5, the this keyword is binded when the function is run 
  // this keyword is going to be undefined, it loses its context

  // ES6: arrow function
  // It binds the `this` keyword at the time of creation 
  onChange = event => {
    // this is binded to Signup component 
    this.setState({ [event.target.name]: event.target.value });

  }

  // Event is the form submit event 
  login = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    }

    try {
      const res = await axios.post('/api/user/login', user);
      if (res.data === 'Invalid email/password') {
        this.setState({ err: res.data });
      } else {
        // If we get back a token, store it in local storage
        localStorage.setItem('jwt', res.data);
        // window.location.reload();
        this.props.handleLogin();
        this.props.history.push('/');
      }
    } catch (err) {
      this.setState({ err: err.message });
    }
  }

  render() {
    const { err } = this.state;
    console.log("props", this.props);

    return (
      <div className="wrapper">
        <div className="inner">
          <h3>Log in</h3>
          <form className="log-form" onSubmit={this.login}>
            <input className="log-input" type="email" name="email" placeholder="Email" onChange={this.onChange} />
            <input className="log-input" type="password" name="password" placeholder="Password" minLength="8" onChange={this.onChange} />
            <button type="submit"> Login </button>
            {err && <p> {err} </p>}
          </form>
        </div>
        
      </div>
      
    )
  }


}

export default Login;
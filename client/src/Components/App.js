import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Order from './Order';
import Research from './Research';
import Account from './Account';
import Notfound from './NotFound';
import OrderConfirm from './OrderConfirm';
import Signup from './Signup';
import Login from './Login';
import '../css/App.css';

class App extends Component {

  state = {
    isLoggedIn: false
  }
  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      const decoded = jwt_decode(localStorage.getItem('jwt'))
      if (decoded.email) {
        this.setState({ isLoggedIn: true });
      }
    }
  }

  logout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.removeItem('jwt');
  }

  handleLogin = () => {
    this.setState({isLoggedIn: true});
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Router>
        <div className="app">
          <nav>
            <ul className="nav-list">
              <li className="nav-item"> <Link to="/">Home</Link> </li>
              {isLoggedIn && <li className="nav-item">   <Link to="/account">Account</Link> </li>}
              {isLoggedIn &&<li className="nav-item"> <Link to="/order">Trade</Link> </li>}
              <li className="nav-item"> <Link to="/research">Research</Link>  </li>
              <div id="right">
                {!isLoggedIn && <li className="nav-item inline">  <Link to="/signup">Signup</Link> </li>}
                {!isLoggedIn && <li className="nav-item inline" >  <Link to="/login">Login</Link> </li>}
              </div>

              {isLoggedIn && <li className="nav-item right"> <Link to="/" onClick={this.logout}> Logout </Link> </li>}

            </ul>
          </nav>

          {isLoggedIn ?
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={Account} />
              <Route path="/order" component={Order} />
              <Route path="/orderConfirm" component={OrderConfirm} />
              <Route path="/research" component={Research} />

              <Route component={Notfound} />
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/research" component={Research} />
              <Route path="/login" render={(props)=><Login {...props}handleLogin={this.handleLogin}/>}/>
              <Route path="/signup" render={(props)=><Signup {...props} handleLogin={this.handleLogin}/>}/>
              <Route component={Notfound} />
            </Switch>

          }


        </div>
      </Router>
    );
  }
}

export default App;

// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//services
import { login } from '../../services/authservice'
// data
import { appLogo } from '../../appdata/url';

class Login extends Component {

  constructor({ onLogin }) {
    super()

    this.state = {
      adminpwd: ''
    }

    this.onLogin = onLogin;
  }

  handleInputChange = e => {
    this.setState({
      adminpwd: e.target.value,
      error: null
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const pwd = this.state.adminpwd;
    const inputValue = e.target[0].value;

    if (inputValue === pwd) {
      login(this.state.adminpwd)
        .then(error => {
          if (!error) {
            this.onLogin()
          } else {
            this.setState({
              error: error.code
            });
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { error, adminpwd } = this.state;

    return (
      <div className="container">
        <div className="app-logo">
          <img src={appLogo} alt="app logo"></img>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label id="adminpwd">Admin password <span className="required">*</span></label>
            <input onChange={this.handleInputChange} value={adminpwd} type="password" name="adminpwd" required placeholder=""/>
            {error ? <p className="required">{error}</p> : null}
          </div>

          <div className="field">
            <button type="submit" className="login-button">
              Login
            </button>
            <button className="login-button"><Link to="/">Back to BeerScreen</Link></button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
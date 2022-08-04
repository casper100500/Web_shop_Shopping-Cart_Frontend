import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context'

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  //add method to the class AuthPage
  //The same as switchModeHandler and etc functions but taken from another file
  static contextType = AuthContext


  //waiting for a changes in email & password elements
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();

  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault(); //to be sure no request get send
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    console.log(this.emailEl.current.value)
    //trim() function delete spaces and etc
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }
    console.log(requestBody)

    //can be use axios and other API library
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        //console.log(resData);
        if (resData.data.login.token) {
          //this.context.token=resData.data.login.token
          // this.context.userId=resData.data.login.userId

          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration)
          //.bind(this)
          //this.context.logout()
        }

      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
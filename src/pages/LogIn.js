import React, { Component } from 'react';

import LogInContext from '../context/auth-context'
import { withAlert } from 'react-alert'

class LogInPage extends Component {
  // static alert = useAlert()
  //add method to the class LogInPage
  //The same as switchModeHandler and etc functions but taken from another file
  static contextType = LogInContext


  //waiting for a changes in email & password elements
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }


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
        if (res.status !== 200 && res.status !== 201 ) {
          alert.error(`login or password is incorrect! Try again.`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        //console.log(resData);
        if (resData.data.login.token) {
          //this.context.token=resData.data.login.token
          // this.context.userId=resData.data.login.userId
          //console.log('email...')
          //console.log(email)



          

          const UserName = email.split("@")[0]

        //   //save user in session
        //   const UserLogin=  {
        //   token:resData.data.login.token,
        //   userId:resData.data.login.userId,
        //   userName:UserName,
        //   tokenExpiration:resData.data.login.tokenExpiration
        // }

        //   sessionStorage.setItem("UserLogin", UserLogin);

          alert.success(`I've been logged in as ${UserName}`, {
            timeout: 5000, // custom timeout just for this one alert
            onOpen: () => {
              //console.log(resData)
              this.context.login(
                resData.data.login.token,
                resData.data.login.userId,
                UserName,
                resData.data.login.tokenExpiration)
            }, // callback that will be executed after this alert open
            onClose: () => {
              // console.log('closed')



            } // callback that will be executed after this alert is removed
          })
        }

      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>Login:
        <form className="LogIn-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default LogInPage;
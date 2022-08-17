import React, { Component } from 'react';
import LogInContext from '../context/auth-context'
import { withAlert } from 'react-alert'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

    let { env } = require('../nodemon.json')

    //can be use axios and other API library
    fetch(env.backendGraphQL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          const alert = this.props.alert
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
          const alert = this.props.alert
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
      <React.Fragment>
        <Form className="LogIn-form" onSubmit={this.submitHandler}>



            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Login</Form.Label>
        <Form.Control type="email" placeholder="Enter email login" ref={this.emailEl} />
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={this.passwordEl} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>







         

       







        </Form>
      </React.Fragment>
    );
  }
}

export default withAlert()(LogInPage);
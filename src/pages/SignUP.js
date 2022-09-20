import React, { Component } from 'react';
import LogInContext from '../context/auth-context'
import { withAlert } from 'react-alert'
import withRouter from "../components/withRouter";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignUPPage extends Component {

  static contextType = LogInContext


  //waiting for a changes in email & password elements
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl1 = React.createRef();
    this.passwordEl2 = React.createRef();
  }


  submitHandler = event => {
    event.preventDefault(); //to be sure no request get send
    const alert = this.props.alert
    const email = this.emailEl.current.value;
    const password = this.passwordEl1.current.value;

    console.log(this.emailEl.current.value)

    //trim() function delete spaces and etc
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    if (this.passwordEl1.current.value!==this.passwordEl2.current.value) {
      alert.error(`Confirm password is incorrect! Try again.`, { timeout: 5000 })
      return;
    }    
        

    let requestBody = {
      query: `
        mutation {
          createUser(email: "${email}", password: "${password}") {
            _id
            email
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
          
          alert.error(`login or password is incorrect! Try again.`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
      
        console.log('created.......')
        console.log(resData);
        if (resData.errors !== undefined) {
          console.log(resData.errors[0].message)
          alert.error(resData.errors[0].message, { timeout: 5000 })
        }
        else {
          alert.success(`User ${email} was created. Please Login...`, { timeout: 5000 })
          this.props.navigate("/login");
        }


      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <center><h1>SignUP</h1></center>
        <Form className="LogIn-form" onSubmit={this.submitHandler}>



          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control type="email" placeholder="Enter email login" ref={this.emailEl} />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={this.passwordEl1} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={this.passwordEl2} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>


        </Form>
      </React.Fragment>
    );
  }
}
//
export default withAlert()(withRouter(SignUPPage));
//export default withAlert()(SignUPPage);
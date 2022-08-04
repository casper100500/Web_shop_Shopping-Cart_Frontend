import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
//import './SignUP.css';
import SignUPContext from '../context/auth-context'

class SignUPPage extends Component {


  //add method to the class SignUPPage
  //The same as switchModeHandler and etc functions but taken from another file
  static contextType = SignUPContext


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
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    
    console.log(requestBody)
    const navigate = useNavigate();
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
        console.log('created.......')
        console.log(resData);
        //return 
       
        navigate("/login");

      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>SignUP:
      <form className="SignUP-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Create User</button>
        </div>
      </form>
      </React.Fragment>
    );
  }
}

export default SignUPPage;
import React from 'react';
import { Link, useNavigate  } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
//import LogInContext from '../context/auth-context'
import { useAlert } from 'react-alert'

function ProductsPage()  {
  alert = useAlert()
  //let contextType = LogInContext

  let navigate = useNavigate(); 
  //add method to the class ProductsPage
  //The same as switchModeHandler and etc functions but taken from another file
 // static contextType = LogInContext




  const newURL = event => {
    //event.preventDefault();
    //window.location.href='/checkout'
    // event.preventDefault(); //to be sure no request get send
    console.log('newURL...')
    const path='/checkout'
   // navigate(path);


    alert.show('Oh look, an alert!')

    //this.context.logout()
   // this.context.navigateToUrl()
   //push('/')


  };

 
    return (
      <React.Fragment>
        Products

        <Button onClick={newURL} variant="primary" >Navigate</Button>

        <Link to="/checkout">
          <Button variant="primary">
            Click Me!
          </Button>
        </Link>

      </React.Fragment>
    );
  }


export default ProductsPage;
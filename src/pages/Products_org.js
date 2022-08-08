import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context'

class ProductsPage extends Component {
       
  static contextType = AuthContext
  constructor(props) {
    super(props);
   
  }

  newURL = url => {
 
           
  //this.props.history.push(path)
  //
 // window.location.pathname =path '/'
 const path='/3232'
 console.log(path)
 
 //this.context.logout
 //const navigate = useNavigate();   
 //this.context.url='/checkout'
 //console.log(this.context)
 //this.setState({ url: '123'})

 //navigate("/checkout")
 //this.sa
//  this.props.history.push(path)
//  window.location.pathname =path 

      return
  }
      
 
  render() {
    return (
      <React.Fragment>
        Products

        <Button onClick={this.newURL} variant="primary" >btn3</Button>
      </React.Fragment>
    );
  }
}

export default ProductsPage;
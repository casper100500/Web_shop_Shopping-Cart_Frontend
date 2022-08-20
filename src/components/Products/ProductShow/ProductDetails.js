import React from 'react';

import './ProductDetails.css'
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import ManageCartFun from '../../Cart/ManageCartFun';
import AuthContext from '../../../context/auth-context';


const ProductShow = (props) => {
  console.log('ProductShow')
  console.log(props)
  //{props.i} {props.rowNumber}
  var shortID = props.product._id
  shortID = shortID.slice(18)
  const Auth = React.useContext(AuthContext); //to call login function
  

        return (
          <React.Fragment>
            <center>
              <h1>
                {props.product.title}

              </h1>
              <img width="150" height="150" src={props.product.imagePath} alt="..." class="img-responsive" />
              <div className='smallID'>
                ({shortID})
              </div>
              <div>
                Description:
              </div>
              <div>
                {props.product.description}
              </div>
              <div>
              <b>₴{props.product.price} UAH{' '}</b>
              </div>
              <Button onClick={() => 
              {
                ManageCartFun.AddToCart(props.product)
                Auth.setCartItmCount('add',props.product.title)
              }
            }  
                variant="primary" aria-label="add to shopping cart">
                <Icon.CartPlus size={20} /> Add to Cart
              </Button>
 

            </center>

          </React.Fragment>
        )
 


};



export default ProductShow;
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetails.css'

const ProductShow = (props) => {
  console.log('ProductShow')
  console.log(props)
  //{props.i} {props.rowNumber}
  var shortID=props.product._id
  shortID=shortID.slice(18)
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
            ₴{props.product.price} UAH{' '}
          </div>
          <div>
            <a href="/add-to-cart/{props.product._id}" class="btn btn-success pull-right" role="button">Add to shopping cart</a>
          </div>
        </center>

    </React.Fragment>
  )


};

export default ProductShow;
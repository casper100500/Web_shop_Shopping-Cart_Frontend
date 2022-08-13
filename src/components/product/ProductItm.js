import React from 'react';
import { Link } from 'react-router-dom';
import './ProducItm.css'

const ProductItm = (props) => {
  //console.log(props)
  //{props.i} {props.rowNumber}
  var shortID=props.product._id
  shortID=shortID.slice(18)
  return (
    <React.Fragment>
      <td key={props.product._id} width="250" height="250">
        <center>
          <img width="150" height="150" src={props.product.imagePath} alt="..." class="img-responsive" />
          <div >
            <Link to="/checkout">
              {props.product.title}
            </Link>
          </div>
          <div className='smallID'>
          ({shortID})
          </div>
          <div>
            ₴{props.product.price} UAH{' '}
          </div>
          <div>
            <a href="/add-to-cart/{props.product._id}" class="btn btn-success pull-right" role="button">Add to shopping cart</a>
          </div>
        </center>
      </td>

    </React.Fragment>
  )


};

export default ProductItm;
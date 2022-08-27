import React, { useState } from 'react';

import './ProductDetails.css'
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import ManageCartFun from '../../Cart/ManageCartFun';
import AuthContext from '../../../context/auth-context';
import Catalog from '../../../CatalogFN'
import { Link } from 'react-router-dom'
import withRouter from "../../withRouter";

const ProductShow = (props) => {
  const searchCatalog = (e, id) => {
    e.preventDefault();
    console.log(id)
    sessionStorage.setItem("CatalogID",id)
    console.log(Catalog.getChildItems(id))
  }
  //const [path, setPath] = useState();
  // const path=getCatalogPath(props.product._id).path
  const catalog = Catalog.getPath(props.product.catalogID)
  const path = catalog.path
  console.log(catalog.pathArr)

  console.log('ProductShow')
  console.log(props)
  //{props.i} {props.rowNumber}
  var shortID = props.product._id
  shortID = shortID.slice(18)
  const Auth = React.useContext(AuthContext); //to call login function


  return (
    <React.Fragment>
      
      <h4>
          {catalog.pathArr.map(itm => {
            return (
              <React.Fragment>
                <Icon.ArrowRight size={20} /> <Link to="" 
                onClick={(e) => { 
                  searchCatalog(e, itm.id) 
                  props.GoToURLFn(e, '/')
                  }}>
                  {itm.label}
                </Link>
              </React.Fragment>
            )
          })}
        </h4>
      <center>

        <h1>
          {props.product.title}

        </h1>
        
        <ul></ul>

        <center>
          <div className='divMax'>
             <img  className='imgMax' src={props.product.imagePath} />
          
            </div>
          </center>


      
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
          <h2>₴{props.product.price} UAH{' '}</h2>
        </div>
        <Button onClick={() => {
          ManageCartFun.AddToCart(props.product)
          Auth.setCartItmCount('add', props.product.title)
        }
        }
          variant="primary" aria-label="add to shopping cart">
          <Icon.CartPlus size={20} /> Add to Cart
        </Button>


      </center>

    </React.Fragment>
  )



};


export default withRouter(ProductShow)

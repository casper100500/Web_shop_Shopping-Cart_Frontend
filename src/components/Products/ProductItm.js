import React from 'react';
import { Link } from 'react-router-dom';
import './ProducItm.css'
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
//const [ProductShow, setProductShow] = useState();
import ManageCartFun from './ManageCartFun';
import AuthContext from '../../context/auth-context';




const ProductItm = (props) => {
  //console.log(props)
  //{props.i} {props.rowNumber}
  var shortID = props.product._id
  const Auth = React.useContext(AuthContext); //to call login function

  //  shortID=shortID.slice(18)


  return (
    <React.Fragment>
      <td key={props.product._id} width="250" height="270">
        <center>
          <Link to={`/ProductShow/${props.product._id}`}>
            <img width="150" height="150" src={props.product.imagePath} alt="..." class="img-responsive" />
          </Link>
          <div >
            <Link to={`/ProductShow/${props.product._id}`}>
              {props.product.title}
            </Link>
          </div>
          <div className='smallID'>
            ({shortID})
          </div>
          <div>
            <b>₴{props.product.price} UAH</b>
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
      </td>

    </React.Fragment>
  )


};






export default ProductItm;
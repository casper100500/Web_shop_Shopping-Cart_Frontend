import React from 'react';
import { Link } from 'react-router-dom';
import './ProducItm.css'
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
//const [ProductShow, setProductShow] = useState();
import ManageCartFun from '../Cart/ManageCartFun';
import AuthContext from '../../context/auth-context';




const ProductItm = (props) => {

  console.log('ProductItm')
  console.log(props)
  //{props.i} {props.rowNumber}
  var shortID = props.product._id
  shortID = shortID.substr(7, shortID.length - 7)
  var shortDesc = props.product.description
  shortDesc = shortDesc.substr(0, 65) + '...'

  var tdHeight = 150
  var tdWidth = 150

  if (window.innerWidth < 500) {
    tdHeight = 120
    tdWidth = 120

  }

  const Auth = React.useContext(AuthContext); //to call login function

  //  shortID=shortID.slice(18)


  return (
    <React.Fragment>
      <td key={props.product._id} width={tdWidth} height={tdHeight}>
        <tr height="150">
          <center>
            <Link to={`/ProductShow/${props.product._id}`}>
              <img width={tdWidth} height={tdHeight} src={props.product.imagePath} alt="..." class="img-responsive" />
            </Link>
          </center>
        </tr>
        <tr  height="60">
            <div>
              <Link to={`/ProductShow/${props.product._id}`}>
                {props.product.title}
              </Link>
            </div>
        </tr>
        <tr height="60">
          <center>
            <div className='center-justified'>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/ProductShow/${props.product._id}`}>
                {shortDesc}
              </Link>

            </div>
          </center>

        </tr>
        <tr>
          
          <h2>₴{props.product.price}</h2>
          <Button onClick={() => {
            ManageCartFun.AddToCart(props.product)
            Auth.setCartItmCount('add', props.product.title)
          }
          }
            variant="primary" aria-label="add to shopping cart">
            <Icon.CartPlus size={20} /> Add to Cart
          </Button>
          
        </tr>
      </td>






    </React.Fragment>
  )


};


{/* <div className='smallID'>
            
({shortID})

</div> */}




export default ProductItm;
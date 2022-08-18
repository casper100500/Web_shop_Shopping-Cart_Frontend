import React from 'react';
import './CartList.css';
import { Link } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import ManageCartFun from '../Products/ManageCartFun';
import AuthContext from '../../context/auth-context';

const CartList = props => {
  const Auth = React.useContext(AuthContext);
  console.log('CartList:')
  console.log(props)

  return (
    props.Cart.map(itm =>


      <React.Fragment>
        <tr key={itm.product._id} width="100" height="120">
          <td width="100" >
            <center>{itm.product._id}</center>
          </td>
          <td align="center">

            <Link to={`../ProductShow/${itm.product._id}`}>
              <img width="80" height="80" src={itm.product.imagePath} alt="..." class="img-responsive" />
            </Link>
            <div>
              <Link to={`../ProductShow/${itm.product._id}`}>
                {itm.product.title}
              </Link>
            </div>


          </td>
          <td>
            <b>₴{itm.product.price}</b>
          </td>

          <td>

            <tr>
              <Button onClick={() => {
                ManageCartFun.AddToCart(itm.product)
                Auth.setCartItmCount(false, itm.product.title)
                props.LoadCart()
              }
              } size='sm' variant="primary">

                <Icon.ChevronUp size={20} />

              </Button>
              <tr>
                <Button onClick={() => {
                  ManageCartFun.DelfromCart(itm.product)
                  Auth.setCartItmCount(false, itm.product.title)
                  props.LoadCart()
                }
                } size='sm' variant="primary">


                  <Icon.ChevronDown size={20} />

                </Button>
              </tr>
              <td className='td-middle' width="40">

                <b>            {itm.ItmQty}            </b>
              </td>
              <td>
              <Button onClick={() => {

                props.ShowDelDiag(itm.product)
                }
               } size='sm' variant="danger" >

                  <Icon.XLg size={20} />

                </Button>


             
              </td>
            </tr>


          </td>
          <td>
            <b>₴{itm.ItmPrice}</b>
          </td>

        </tr>

      </React.Fragment>
    )

  )
};


export default CartList;
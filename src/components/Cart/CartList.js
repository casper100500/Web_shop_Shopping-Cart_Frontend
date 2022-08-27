import React from 'react';
import './CartList.css';
import { Link } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import ManageCartFun from './ManageCartFun';
import AuthContext from '../../context/auth-context';

const CartList = props => {
  const Auth = React.useContext(AuthContext);
  console.log('CartList:')
  console.log(props)

  return (
    props.Cart.map(itm =>


      <React.Fragment>
        <tr key={itm.product._id} width="100" height="120">
          <td width="100" className='td-middle'>
            <center>{itm.product._id}</center>
          </td>
          <td className='td-middle'>

            

          
          <div className='divMax'>
          <Link to={`../ProductShow/${itm.product._id}`}>
              <img className='imgMax' src={itm.product.imagePath}  />
            </Link>
            </div>
         


            <div>
              <Link to={`../ProductShow/${itm.product._id}`}>
                {itm.product.title}
              </Link>
            </div>


          </td>
          <td className='td-middle'>
            <h2>₴{itm.product.price}</h2>
          </td>

          <td>

            <tr className='td-middle'>
              <Button onClick={() => {
                ManageCartFun.AddToCart(itm.product)
                Auth.setCartItmCount(false, itm.product.title)
                props.LoadCart()
              }
              } size='sm' variant="primary">

                <Icon.ChevronUp size={20} />

              </Button>
              <tr className='td-middle'>
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

                <h2>{itm.ItmQty}</h2>
              </td>
              <td className='td-middle'>
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
            <h2>₴{itm.ItmPrice}</h2>
          </td>

        </tr>

      </React.Fragment>
    )

  )
};


export default CartList;
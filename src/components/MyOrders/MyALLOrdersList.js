import React from 'react';
import './MyALLOrdersList.css';
import { Link } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context';

const MyALLOrdersList = props => {
  const Auth = React.useContext(AuthContext);
  console.log('MyALLOrdersList:')
  console.log(props)

  return (
    props.Orders.map(itm =>


      <React.Fragment>
        <tr key={itm._id} width="100" height="120">
          <td width="100" >


            <Link to={`/MyOrderDetailPage/${itm._id}`}>
              <center>{itm._id}</center>
            </Link>

          </td>
          <td align="center">
            <center>
              {itm.OrderCart.Items.map(row => {


                return (
                  <React.Fragment>

                    <Link to={`/ProductShow/${row.product._id}`}>
                      <img width="50" height="50" src={row.product.imagePath} alt="..." class="img-responsive" />
                    </Link>

                    {' '}
                  </React.Fragment>
                )


              }

              )}

              <ul>
                Items: {itm.OrderCart.totalQty} 
              </ul>
            </center>
          </td>
          <td>
            <b>₴{itm.OrderCart.totalPrice}</b>
          </td>

          <td>

            {itm.PaymentStatus}


          </td>
          <td>

          </td>

        </tr>

      </React.Fragment>
    )

  )
};


export default MyALLOrdersList;
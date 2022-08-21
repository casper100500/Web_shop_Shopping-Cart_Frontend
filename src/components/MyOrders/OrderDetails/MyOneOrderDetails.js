import React from 'react';
import './MyOneOrderDetails.css';
import { Link } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import AuthContext from '../../../context/auth-context';

const MyOneOrderDetails = props => {
  const Auth = React.useContext(AuthContext);
  console.log('MyOneOrderDetails:')
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

          <b>{itm.ItmQty}</b>


          </td>
          <td>
            <b>₴{itm.ItmPrice}</b>
          </td>

        </tr>

      </React.Fragment>
    )

  )
};


export default MyOneOrderDetails;
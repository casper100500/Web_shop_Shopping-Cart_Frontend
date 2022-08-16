import React from 'react';
import './CartList.css';  
import { Link } from 'react-router-dom';
const CartList = props => {
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


export default CartList;
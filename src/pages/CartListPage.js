import React, { useState, useEffect } from 'react';

import CartList from '../components/Cart/CartList';
import Spinner from '../components/Spinner/Spinner';


function CartListPage(props) {

  const [Cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const [isLoading, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      if (isLoading === true) { LoadCart() }
      setLoaded(false)
    }, 500)


  });



  const LoadCart = () => {
    

    var cart = {
      Items: [],
      totalQty: 0,
      totalPrice: 0
    }

    if (sessionStorage.getItem("Cart") !== null) {
      cart = JSON.parse(sessionStorage.getItem("Cart"))
    }
    console.log('LoadCart')
    console.log(cart.Items)

    setCart(cart.Items)
    setTotalPrice(cart.totalPrice)
  }

  return (
    <React.Fragment>
      Cart List:

      {isLoading && <Spinner />}
      {Cart &&

        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Full price</th>

            </tr>
          </thead>

          <tbody>
            <CartList Cart={Cart} />
          </tbody>

        </table>
      }

     <b> Total Price: ₴{totalPrice}</b>

    </React.Fragment>
  )


}


// {Products.title}
export default CartListPage;
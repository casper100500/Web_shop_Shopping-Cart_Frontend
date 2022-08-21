import React, { useState, useEffect } from 'react';

import withRouter from "../components/withRouter";
import CartList from '../components/Cart/CartList';
import Spinner from '../components/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../context/auth-context'
import { useParams } from 'react-router-dom'
import MyOneOrderDetails from '../components/MyOrders/OrderDetails/MyOneOrderDetails';

function MyOrderDetailPage(props) {
  const Auth = React.useContext(AuthContext);
  const [Cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setLoaded] = useState(true);

  const { OrderId } = useParams()

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
    const MyOrders= JSON.parse(sessionStorage.getItem("MyOrders"))
    console.log('MyOrders')
    console.log(MyOrders)
    
     cart=MyOrders.find(x => x._id === OrderId).OrderCart;
     console.log(cart)


    console.log('LoadCart')
    console.log(cart.Items)

    setCart(cart.Items)
    setTotalPrice(cart.totalPrice)
  }




  return (<AuthContext.Consumer>
    {(context) => {
      return (
        <React.Fragment>
          
          <center>
            <h1>Order</h1>
            <ul>({OrderId})</ul>
          </center>

          {isLoading && <Spinner />}
          {Cart &&

            <table className="table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th><center>Product</center></th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Full price</th>

                </tr>
              </thead>

              <tbody>
                <MyOneOrderDetails Cart={Cart} LoadCart={LoadCart} />
              </tbody>

            </table>
          }

          <h1> Total Price: ₴{totalPrice}</h1>
          <ul></ul>

        </React.Fragment>
      )
    }}</AuthContext.Consumer >);

}


// {Products.title}
export default withRouter(MyOrderDetailPage);
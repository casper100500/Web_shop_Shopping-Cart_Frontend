import React, { useState, useEffect } from 'react';
import withRouter from "../components/withRouter";
import CartList from '../components/Cart/CartList';
import Spinner from '../components/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../context/auth-context'

function CartListPage(props) {

  const [Cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const [isLoading, setLoaded] = useState(true);


  const ClearCartFn = async () => {


    console.log(window.location.pathname)
    // fn()
    //  this.props.context.setCartItmCountNull()
    //event.AuthContext.context.setCartItmCountNull()
    if (window.location.pathname === '/cart') {
        await props.navigate("/spinner")
        await props.navigate("/cart")
    }

}


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

  return (  <AuthContext.Consumer>
    {(context) => {
      return (
    <React.Fragment>
      Cart List:

      {isLoading && <Spinner />}
      {Cart &&

        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th><center>Product</center></th>
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
     <ul></ul>
     <Button onClick={
                            (e) => {
                                e.preventDefault(e);
                                context.setCartItmCountNull()
                                ClearCartFn()
                            }

                        } variant="primary" aria-label="add to shopping cart">
                            <Icon.Cart size={20} /> Clear
                        </Button>
    </React.Fragment>
  )
}}</AuthContext.Consumer >);

}


// {Products.title}
export default  withRouter(CartListPage);
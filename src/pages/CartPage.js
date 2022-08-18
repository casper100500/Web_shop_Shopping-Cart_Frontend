import React, { useState, useEffect } from 'react';
import withRouter from "../components/withRouter";
import CartList from '../components/Cart/CartList';
import Spinner from '../components/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../context/auth-context'
import DelDiag from '../components/DialogBox/DialogBox'
import ManageCartFun from '../components/Products/ManageCartFun';

function CartListPage(props) {
  const Auth = React.useContext(AuthContext);
  const [Cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const [productDel, setProductDel] = useState();
  const [isLoading, setLoaded] = useState(true);
  const [isDelDiag, setDelDiag] = useState(false);


  const YesBtnDelDiag = () => {
    console.log('YesBtnDelDiag')
    
    console.log(productDel)
    ManageCartFun.DelAllFromCart(productDel)
    Auth.setCartItmCount(false, productDel.title)
    LoadCart()
    setDelDiag(false)
  }


  useEffect(() => {
    setTimeout(function () {
      if (isLoading === true) { LoadCart() }
      setLoaded(false)
    }, 500)


  });

  const ShowDelDiag = (product) => {
    setProductDel(product)
    setDelDiag(true)
  }

  const CloseDelDiag = () => {
    setDelDiag(false)
  }





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




  return (<AuthContext.Consumer>
    {(context) => {
      return (
        <React.Fragment>
          Cart List:

          {isDelDiag &&

            <DelDiag
              title="Warning"
              message="Would you like to delete?"
              canCancel
              canConfirm
              onCancel={CloseDelDiag}
              onConfirm={YesBtnDelDiag}
              
            />}

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
                <CartList Cart={Cart} LoadCart={LoadCart} ShowDelDiag={ShowDelDiag} />
              </tbody>

            </table>
          }

          <h1> Total Price: ₴{totalPrice}</h1>
          <ul></ul>
          <Button onClick={function (event) {
            context.setCartItmCountNull()
            LoadCart()
            //props.GoToURLFn(event, '/cart')

          }} variant="primary" aria-label="add to shopping cart">
            <Icon.Cart size={20} /> Clear
          </Button>
          {' '}
          <Button variant="success" onClick={function (event) { props.GoToURLFn(event, '/checkout') }}>
            <Icon.CashCoin size={20} /> checkout
          </Button>
        </React.Fragment>
      )
    }}</AuthContext.Consumer >);

}


// {Products.title}
export default withRouter(CartListPage);
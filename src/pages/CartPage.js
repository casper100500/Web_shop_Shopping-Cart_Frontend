import React, { useState, useEffect } from 'react';
import Backdrop from '../components/Backdrop/Backdrop';
import withRouter from "../components/withRouter";
import CartList from '../components/Cart/CartList';
import Spinner from '../components/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../context/auth-context'

import DelDiag from '../components/DialogBox/DialogBox'
import DiagBox from '../components/DialogBox/DialogBox'
import ManageCartFun from '../components/Cart/ManageCartFun';

function CartListPage(props) {

  const Auth = React.useContext(AuthContext);
  const [Cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const [productDel, setProductDel] = useState();
  const [isLoading, setLoaded] = useState(true);
  const [isDelDiag, setDelDiag] = useState(false);
  const [isDiagBox, setIsDiagBox] = useState(false);
  const [DiagBoxCFG, setDiagBoxCFG] = useState();

  useEffect(() => {
    setTimeout(function () {
      if (isLoading === true) { LoadCart() }
      setLoaded(false)
    }, 500)


  });

  const YesBtnDelDiag = () => {
    console.log('YesBtnDelDiag')

    console.log(productDel)
    ManageCartFun.DelAllFromCart(productDel)
    Auth.setCartItmCount(false, productDel.title)
    LoadCart()
    setDelDiag(false)
  }




  const ShowDelDiag = (product) => {
    setProductDel(product)
    setDelDiag(true)
  }

  const CloseDelDiag = () => {
    setDelDiag(false)
  }

  const ShowDiagBox = () => {
    setIsDiagBox(true)
  }

  const CloseDiagBox = () => {
    setIsDiagBox(false)
  }


  const ClearCartFn = () => {

    const DiagBoxCFG = {
      title: 'Warrning',
      message: 'Would you like to completly delete your cart?',
      canConfirm: true,
      canCancel: true,
      onConfirm: YesBtnClearCartFn,
      onCancel: CloseDiagBox
    }

    setDiagBoxCFG(DiagBoxCFG)
    setIsDiagBox(true)
    //props.GoToURLFn(event, '/checkout') }}>
  }
  const YesBtnClearCartFn = () => {
    CloseDiagBox()
    Auth.setCartItmCountNull()
    LoadCart()
  }


  const CheckOutFn = () => {
    console.log(Cart )
if (Cart.length===0)
{
    const DiagBoxCFG = {
      title: 'Warrning!',
      message: 'Your cart is empty!',
      canConfirm: false,
      canCancel: true,
      onConfirm: null,
      onCancel: CloseDiagBox
    }

    setDiagBoxCFG(DiagBoxCFG)
    setIsDiagBox(true)
  }
  else
  {props.navigate('/checkout')
  }
    
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

          <center><h1> Cart</h1></center>
          {isDiagBox &&

            <Backdrop />}

          {isDiagBox &&
            <DiagBox
              title={DiagBoxCFG.title}
              message={DiagBoxCFG.message}
              canConfirm={DiagBoxCFG.canConfirm}
              canCancel={DiagBoxCFG.canCancel}
              onCancel={DiagBoxCFG.onCancel}
              onConfirm={DiagBoxCFG.onConfirm}
            />}

          {isDelDiag &&

            <Backdrop />}


          {isDelDiag &&



            <DelDiag
              title="Warning"
              message={"Would you like to delete '" + productDel.title + "' from your cart? "}
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

 


          <Button onClick={ClearCartFn} variant="primary" size='lg'>
            <Icon.Cart size={20} /> Clear
          </Button>
          {' '}
          <Button variant="success" size='lg'
            onClick={CheckOutFn}>
            <Icon.CashCoin size={20} /> Checkout
          </Button>

        </React.Fragment>
      )
    }}</AuthContext.Consumer >);

}


// {Products.title}
export default withRouter(CartListPage);
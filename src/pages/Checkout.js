import React, { useState, useEffect } from 'react';
import { withAlert } from 'react-alert'
import withRouter from "../components/withRouter";
import Spinner from '../components/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../context/auth-context'

function CheckoutPage(props) {
  const Auth = React.useContext(AuthContext);
  const alert = props.alert 
  

  const [Cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setLoaded] = useState(true);
  var cart = {
    Items: [],
    totalQty: 0,
    totalPrice: 0
  }
  useEffect(() => {
    setTimeout(function () {
      if (isLoading === true) { LoadCart() }
      setLoaded(false)
    }, 500)


  });
  


  const CreateOrder = () => {
    if (sessionStorage.getItem("Cart") !== null) {
      var cart = JSON.parse(sessionStorage.getItem("Cart"))
    }
    else
    {return}

    let cartStr=JSON.stringify(cart)
    console.log(cartStr)
    cartStr=cartStr.replace(/":/gi,':'); 
    cartStr=cartStr.replace(/,"/gi,','); 
    cartStr=cartStr.replace(/{"/gi,'{'); 
    cartStr=cartStr.substr(0,cartStr.length-1)
    cartStr=cartStr.substr(1,cartStr.length-1)
    
    //cartStr=cartStr.replace(/"/gi,'\"'); 


    console.log(cartStr)

    let requestBody = {
      query: `
      mutation{
        createOrder (orderInput:
          {orderCart:{
            ${cartStr} }
        ,
          email:"${Auth.userName}",
          PaymentID:"123",
          PaymentStatus:"123",
          SessionID:"123"
            })
        {_id,PaymentID,SessionID,PaymentStatus}
        
        
        
      }
      `
    };

    let requestBody2 = {
      query: `
      mutation{
        createOrder (orderInput:
        {
          
          orderCart:{
            Products:{
            _id: "62fa3832e73f022ebf594a33",
            title: "Far Cry 3",
            price: 10,
            imagePath: "https://upload.wikimedia.org/wikipedia/en/c/c6/Far_Cry_3_PAL_box_art.jpg?20190712000332"
            
            },TotalCount:190
          
          
          }
        ,
          email:"123",
          PaymentID:"123",
          PaymentStatus:"123",
          SessionID:"123"
            }
        ){_id,PaymentID,SessionID,PaymentStatus}
        
        
        
      }
      `
    };


    console.log(requestBody)

    let { env } = require('../nodemon.json')

    //can be use axios and other API library
    fetch(env.backendGraphQL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
        if (res.status !== 200 && res.status !== 201) {
          
          alert.error(`login or password is incorrect! Try again.`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
      
        
        console.log(resData);
        if (resData.errors !== undefined) {
          console.log(resData)
          alert.error(resData, { timeout: 5000 })
        }
        else {
          alert.success(`Order created`, { timeout: 5000 })
//          props.navigate("/success");
        }


      })
      .catch(err => {
        console.log(err);
      });


  }

  const LoadCart = () => {


   

    if (sessionStorage.getItem("Cart") !== null) {
      cart = JSON.parse(sessionStorage.getItem("Cart"))
    }
    console.log('LoadCart')
    console.log(cart)

    setCart(cart.Items)
    setTotalPrice(cart.totalPrice)
  }




  return (<AuthContext.Consumer>
    {(context) => {
      return (
        <React.Fragment>
          <h1><center>Checkout</center></h1>

          <h2> Total Price: {totalPrice} ₴</h2>
          <Button onClick={CreateOrder} variant="primary" >
            Pay
          </Button>
        </React.Fragment>
      )
    }}</AuthContext.Consumer >);

}


export default withAlert()(withRouter(CheckoutPage));
//export default withRouter(CheckoutPage);
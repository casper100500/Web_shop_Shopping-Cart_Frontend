import React, { useState, useEffect } from 'react';
import Backdrop from '../components/Backdrop/Backdrop';
import withRouter from "../components/withRouter";

import Spinner from '../components/Spinner/Spinner';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../context/auth-context'


import OrderList from '../components/MyOrders/MyALLOrdersList'



function MyOrdersPage(props) {
  const Auth = React.useContext(AuthContext);
  const [Orders, setOrders] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const [productDel, setProductDel] = useState();
  const [isLoading, setLoaded] = useState(true);



  useEffect(() => {
    setTimeout(function () {
      if (isLoading === true) { LoadOrders() }
      setLoaded(false)
    }, 500)


  });

  const LoadOrders = () => {
    const user=Auth.userName

    let requestBody = {
      query: `
      query{ordersALL
        (email:"${user}",PageNum:0,PageLimit:100)
        {
          Orders{
            _id,
            User,
            PaymentID,
            PaymentStatus,

            OrderCart{
            Items{
              product
              {_id,
                title,
                price,
                imagePath
              }
              ItmQty,
              ItmPrice
            }
              totalQty,
              totalPrice
            }
            
            },
      TotalCount  }  
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
          alert.error(resData.errors[0].message, { timeout: 5000 })
        }
        else {
          console.log(resData)
          
          setOrders(resData.data.ordersALL.Orders)
          sessionStorage.setItem("MyOrders",JSON.stringify(resData.data.ordersALL.Orders))
          //alert.success(`Order created`, { timeout: 5000 })

          //setClientSecret(options)


          //          props.navigate("/success");
        }


      })
      .catch(err => {
        console.log(err);
      });

  }




  return (<AuthContext.Consumer>
    {(context) => {
      return (
        <React.Fragment>
          
          <center><h1> My Orders </h1></center>

          

          {isLoading && <Spinner />}
          {Orders &&

            <table className="table">
              <thead>
                <tr>
                  
                  <th>order ID</th>
                  <th><center> Products </center></th>
                  <th>Amout</th>
                  <th>Payment Status</th>

                </tr>
              </thead>

              <tbody>
              <OrderList Orders={Orders} />

              </tbody>

            </table>
          }

          <h1> Total Price: ₴{totalPrice}</h1>
       
        </React.Fragment>
      )
    }}</AuthContext.Consumer >);

}

//               <OrderList Orders={Orders} />

// {Products.title}
export default withRouter(MyOrdersPage);
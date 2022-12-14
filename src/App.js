
import './App.css';
//Switch->Routes
//Redirect->Navigate

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
//import { useParams } from 'react-router-dom'
//import { withAlert } from 'react-alert'
import CatalogPage from './pages/Catalog';
import React, { Component } from 'react';
import LogInPage from './pages/LogIn'
import SignUPPage from './pages/SignUP';
import ProductsPage from './pages/Products';
import AboutUSPage from './pages/AboutUS';
import ContactsPage from './pages/Contacts';
//import SearchPage from './pages/Search';
import CartPage from './pages/CartPage';
import MyProfilePage from './pages/MyProfilePage';
import CreateUpdateProduct from './pages/CreateUpdateProduct';
import MyOrderDetailPage from './pages/MyOrderDetailPage';
import CheckoutPage from './pages/Checkout';
import MyOrdersPage from './pages/MyOrdersPage';
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'
import SpinnerPage from './components/Spinner/Spinner'
import SuccessPage from './components/Checkout/SuccessPage';
import TabRefresh from './components/Session/TabRefresh'
import ProductShowPage from './pages/ProductShow'
import { withAlert } from 'react-alert'


//function App() {
class App extends Component {


  state = {
    token: null,
    userName: null,
    userId: null,
    CartItmCount: 0
  }


  login = (token, userId, userName, tokenExpiration) => {



    console.log(`Logged1: ${userName}`)
    this.setState({ token: token, userName: userName, userId: userId }, () => {
      console.log(`Logged2: ${userName}`)
      const UserLogin = { token: token, userName: userName, userId: userId, tokenExpiration: tokenExpiration }
      sessionStorage.setItem("UserLogin", JSON.stringify(UserLogin));
     console.log(UserLogin)

  })

  }

  logout = () => {
    this.setState({ token: null, userId: null, userName: null })
    sessionStorage.setItem("UserLogin", null);
    console.log('logout!!!!!!!!!!!!!!!!!!')

  }

  setCartItmCount = (mode,title) => {
    console.log('setCartItmCount')
    var cart = {
      Items: [],
      totalQty: 0,
      totalPrice: 0
    }

    if (sessionStorage.getItem("Cart") !== null) {
      console.log(sessionStorage.getItem("Cart"))
      console.log(cart)
      //JSON.parse(
      cart = JSON.parse(sessionStorage.getItem("Cart"))
      if (mode==='add') {
        const alert = this.props.alert
        alert.show(`${title} - Added to Cart`)
      //  alert.show(`Added to Cart`)
      }

      if (mode==='del') {
        const alert = this.props.alert
        alert.error(`${title} - Deleted from Cart`)
      //  alert.show(`Added to Cart`)
      }
    }

    this.setState({ CartItmCount: cart.totalQty })
  }



  setCartItmCountNull = () => {
    console.log('setCartItmCountNull')
    var cart = {
      Items: [],
      totalQty: 0,
      totalPrice: 0
    }
    sessionStorage.setItem("Cart", JSON.stringify(cart))
    const alert = this.props.alert
    alert.show('Cart is empty!')

    this.setState({ CartItmCount: 0 })
  }
  
  ReloadPage = () => {
  }
  render() {
    return (

      <BrowserRouter>

        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            userName: this.state.userName,
            login: this.login, //.bind(this)
            logout: this.logout,
            setCartItmCount: this.setCartItmCount,
            setCartItmCountNull: this.setCartItmCountNull,
            ReloadPage:this.ReloadPage,
            CartItmCount: this.state.CartItmCount
          }} >

          <React.Fragment>
<div width="2000"></div>
            <TabRefresh />

            <MainNavigation />

            <main className="main-content">
              <Routes>
              
                <Route path="/" element={<ProductsPage />} />
                <Route path="/AboutUS" element={<AboutUSPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
              
                <Route path="/spinner" element={<SpinnerPage />} />
                {this.state.token && <Route path="/CreateUpdateProduct/:ProductId" element={<CreateUpdateProduct />} />}
                {this.state.token && <Route path="/myOrders" element={<MyOrdersPage />} />}
                {this.state.token && <Route path="/myProfile" element={<MyProfilePage />} />}
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/search" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                {!this.state.token && <Route path="/login" element={<LogInPage />} />}
                {this.state.token && <Route path="/login" element={<Navigate to="/" />} />}
                {!this.state.token && <Route path="/signup" element={<SignUPPage />} />}
                <Route path="MyOrderDetailPage/:OrderId" element={<MyOrderDetailPage />} />
                <Route path="ProductShow/:ProductId" element={<ProductShowPage />} />

              </Routes>
            </main>



            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" />

          </React.Fragment>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default withAlert()(App);

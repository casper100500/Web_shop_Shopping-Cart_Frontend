
import './App.css';
//Switch->Routes
//Redirect->Navigate

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
//import { useParams } from 'react-router-dom'
//import { withAlert } from 'react-alert'

import React, { Component } from 'react';
import LogInPage from './pages/LogIn'
import SignUPPage from './pages/SignUP';
import ProductsPage from './pages/Products';
//import SearchPage from './pages/Search';
import CartListPage from './pages/CartListPage';
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'
import SpinnerPage from './components/Spinner/Spinner'

import TabRefresh from './components/Session/TabRefresh'
import ProductShowPage from './pages/ProductShow'
import { withAlert } from 'react-alert'
//  <Navigate from="/" to="/auth" exact/> 

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
      //sessionStorage.setItem("UserLogin", UserLogin);
      console.log(UserLogin)

      //console.log(`Logged: ${userId}\ntoken:${token}`)
      // console.log(`state token: ${this.state.token}`)
    })

  }

  logout = () => {
    this.setState({ token: null, userId: null, userName: null })
    sessionStorage.setItem("UserLogin", null);
    console.log('logout!!!!!!!!!!!!!!!!!!')
    //console.log(`state token: ${this.state.token}`)

    //this.state.token=null
    //this.state.userId=null
  }

  setCartItmCount = (refresh,title) => {
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
      if (!refresh) {
        const alert = this.props.alert
        alert.show(`${title} - Added to Cart`)
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
            CartItmCount: this.state.CartItmCount
          }} >

          <React.Fragment>

            <TabRefresh />

            <MainNavigation />

            <main className="main-content">
              <Routes>

                <Route path="/" element={<ProductsPage />} />
                <Route path="/spinner" element={<SpinnerPage />} />
                
                <Route path="/search" element={<ProductsPage />} />
                <Route path="/cart" element={<CartListPage />} />
                {!this.state.token && <Route path="/login" element={<LogInPage />} />}
                {this.state.token && <Route path="/login" element={<Navigate to="/" />} />}
                {!this.state.token && <Route path="/signup" element={<SignUPPage />} />}
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
//{this.state.token && <Route path="/auth" element={<Navigate to="/" />} />}
//{!this.state.token && <Route path="/auth" element={<AuthPage />} />}
//{!this.state.token && <Route path="/" element={<Navigate to="/auth" />} />}
//export default withAlert(App);
//export default App;
export default withAlert()(App);

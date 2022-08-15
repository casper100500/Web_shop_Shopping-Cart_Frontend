
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
import CheckoutPage from './pages/Checkout';
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'
import TabRefresh from './components/Session/TabRefresh'
import ProductShowPage from './pages/ProductShow'

//  <Navigate from="/" to="/auth" exact/> 

//function App() {
class App extends Component {
  

  state = {
    token: null,
    userName: null,
    userId: null
  }
  
  navigateToUrl = (url) => {
    //const navigate = useNavigate();
    // navigate to /contacts
  //  navigate('/checkout');
  //const navigate = Route();
  const path='/checkout'
  console.log(`url: ${path}`)
  //navigate=path;
  //this.props.history.push(path);
    console.log('navigateToUrl!!!')
  };

  login = (token, userId, userName, tokenExpiration) => {


    // if (sessionStorage.getItem("UserLogin")===undefined)
    // {
    

    //}
    console.log(`Logged1: ${userName}`)
    this.setState({ token: token, userName: userName, userId: userId }, () => {
      console.log(`Logged2: ${userName}`)
      const UserLogin={ token: token, userName: userName, userId: userId, tokenExpiration:tokenExpiration }
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
//<Session_refresh />
  
  render() {
    return (

      <BrowserRouter>
        <AuthContext.Provider
          value={{
            navigateToUrl:this.navigateToUrl,
            token: this.state.token,
            userId: this.state.userId,
            userName: this.state.userName,
            login: this.login, //.bind(this)
            logout: this.logout
          }} >
          <React.Fragment>

            <TabRefresh />

            <MainNavigation />
            
            <main className="main-content">
              <Routes>

                <Route path="/" element={<ProductsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
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
export default App;

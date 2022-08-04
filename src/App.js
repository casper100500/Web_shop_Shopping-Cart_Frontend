
import './App.css';
//Switch->Routes
//Redirect->Navigate

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import React, { Component } from 'react';
import LogInPage from './pages/LogIn'
import SignUPPage from './pages/SignUP';
import ProductsPage from './pages/ProductsPage';
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'

//  <Navigate from="/" to="/auth" exact/> 

//function App() {
class App extends Component{
  state = {
    token: null,
    userName:null,
    userId: null
  }

   login = (token, userId, userName, tokenExpiration)  => {
     //this.state.setState({})
    // this.state.token=token
    // this.state.userId=userId
    this.setState({ token: token,userName:userName, userId: userId }, ()=>
   
    {
      console.log(`Logged: ${userName}`)
    //console.log(`Logged: ${userId}\ntoken:${token}`)
   // console.log(`state token: ${this.state.token}`)
    })
    
  }

   logout = () => {
    //this.setState({ token: null, userId: null,userName:null })
  //console.log('logout!!!!!!!!!!!!!!!!!!')
  //console.log(`state token: ${this.state.token}`)

    //this.state.token=null
    //this.state.userId=null
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
            logout: this.logout
          }} >
          <React.Fragment>



          <MainNavigation />
          <main className="main-content">
            <Routes>
              
            
            
            <Route path="/" element={<ProductsPage />} />
            
            {!this.state.token && <Route path="/login" element={<LogInPage />} />}
            {this.state.token && <Route path="/login" element={<Navigate to="/" />} />}
            {!this.state.token && <Route path="/signup" element={<SignUPPage />} />}
            </Routes>
          </main>
  


        <link
                            rel="stylesheet"
                            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                            crossorigin="anonymous"
                        />

      </React.Fragment>
    </AuthContext.Provider>
    </BrowserRouter>
  );
}
}
//            {this.state.token && <Route path="/auth" element={<Navigate to="/" />} />}
//{!this.state.token && <Route path="/auth" element={<AuthPage />} />}
//{!this.state.token && <Route path="/" element={<Navigate to="/auth" />} />}
export default App;

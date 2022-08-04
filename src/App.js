
import './App.css';
//Switch->Routes
//Redirect->Navigate

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import React, { Component } from 'react';
import AuthPage from './pages/Auth'
import ProductsPage from './pages/ProductsPage';

import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'
//  <Navigate from="/" to="/auth" exact/> 

//function App() {
class App extends Component{
   state = {
    token: null,
    userId: null
  }

   login = (token, userId, tokenExpiration)  => {
     //this.state.setState({})
    // this.state.token=token
    // this.state.userId=userId
    this.setState({ token: token, userId: userId }, ()=>
   
    {
    console.log(`Logged: ${userId}\ntoken:${token}`)
    console.log(`state token: ${this.state.token}`)
    })
    
  }

   logout = () => {
    this.setState({ token: null, userId: null },()=>
    {console.log(`state token: ${this.state.token}`)})
    //this.state.token=null
    //this.state.userId=null
  }

render() {
  return (

    <BrowserRouter>
      <React.Fragment>
      <link
                            rel="stylesheet"
                            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                            crossorigin="anonymous"
                        />

        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login, //.bind(this)
            logout: this.logout
          }} >
          <MainNavigation />
          <main className="main-content">
            <Routes>
              
            
            
            {<Route path="/" element={<ProductsPage />} />}  
            {this.state.token && <Route path="/auth" element={<Navigate to="/" />} />}
            {!this.state.token && <Route path="/auth" element={<AuthPage />} />}
            
            </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>

    </BrowserRouter>
  );
}
}
//
//{!this.state.token && <Route path="/" element={<Navigate to="/auth" />} />}
export default App;

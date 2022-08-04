
import './App.css';
//Switch->Routes
//Redirect->Navigate

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import React, { Component } from 'react';
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'

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
              
              {this.state.token && <Route path="/" element={<Navigate to="/events" />} />}
              {this.state.token && <Route path="/auth" element={<Navigate to="/events" />} />}
              
              {!this.state.token && <Route path="/auth" element={<AuthPage />} />}
              
              <Route path="/events" element={<EventsPage />} />
           
              {this.state.token && <Route path="/bookings" element={<BookingsPage />} />}

              {!this.state.token && <Route path="/" element={<Navigate to="/auth" />} />}
            </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>

    </BrowserRouter>
  );
}
}

export default App;

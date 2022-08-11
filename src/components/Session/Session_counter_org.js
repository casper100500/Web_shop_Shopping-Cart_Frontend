import React, { useEffect, useState } from "react";
//import ReactDOM from "react-dom";
import AuthContext from '../../context/auth-context'

const Session_counter = props => {
  // React State
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState('');
  
//   const [UserLogin, setUserLogin ]=useState({
//     token:null,
//     userId:null,
//     userName:'null',
//     tokenExpiration:null
//   });

  useEffect(() => {
// Access count value from session storage
   var userName = sessionStorage.getItem("userName");
   
    var UserLogin={
             token:null,
             userId:null,
             userName:'null',
             tokenExpiration:null
           }

    if (sessionStorage.getItem("UserLogin")!==null)
     {UserLogin = JSON.parse(sessionStorage.getItem("UserLogin"))}

    
   
    //console.log('SessionUserName:'+UserLogin.userName)
    if (userName!==null)
    {
    console.log('SessionUserName:'+UserLogin.userName)
   // console.log(JSON.stringify(UserLogin))
    }
    else
    {
        userName='null'
    }
    setUserName(UserLogin.userName)

   // setUserLogin(UserLogin);

    // Access count value from session storage
    var pageView = sessionStorage.getItem("pageView");
    if (pageView == null) {
      // Initialize page views count
      pageView = 1;
    } else {
      // Increment count
      pageView = Number(pageView) + 1;
    }
    // Update session storage
    sessionStorage.setItem("pageView", pageView);
    setCount(pageView);
  }, []); //No dependency to trigger in each page load

  return (
    <AuthContext.Consumer>
            {(context) => {
                    return (
    <div className="app">
        space
        space
      <div>Page View Count is:</div>
      Count : {count}
      <ul>
      User name: {context.userName}
      </ul>
      <ul>
      SessionUserName: {userName}
      </ul>
    </div>
  )}}
  </AuthContext.Consumer>
  );
}


export default Session_counter
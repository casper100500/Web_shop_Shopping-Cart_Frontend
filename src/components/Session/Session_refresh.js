import React, { useEffect } from "react";
//import ReactDOM from "react-dom";
import AuthContext from '../../context/auth-context'



const Session_refresh = props => {

  // const [userName, setUserName] = useState('');
  const Auth = React.useContext(AuthContext);

  useEffect(() => {
    // Access count value from session storage

    //ReLogin
    if (1 === 1) {
      if (sessionStorage.getItem("UserLogin") !== undefined) {
        const UserLogin = JSON.parse(sessionStorage.getItem("UserLogin"))
        console.log("sessionStorage.getItem:")
        if (UserLogin !== null) {
          console.log(UserLogin.userName)
          Auth.login(
            UserLogin.token,
            UserLogin.userId,
            UserLogin.userName,
            UserLogin.tokenExpiration)
  
        }
        else { console.log(UserLogin) }

      }

    }

  }, []); //No dependency to trigger in each page load

  return;
}


export default Session_refresh
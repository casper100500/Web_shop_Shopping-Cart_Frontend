import { useNavigate } from "react-router-dom";
import React from 'react'
//import {createBrowserHistory} from "history";
import AuthContext from '../context/auth-context';

const withRouter = (Component) => {
  

  const Wrapper = (props) => {

    const Auth = React.useContext(AuthContext);
    const navigate = useNavigate();
   
    const GoToURLFn = async (event,url) => {
      
      
      event.preventDefault();
      if (window.location.pathname === url)
      {//window.location.reload(false);
       // await navigate("/spinner")
        await navigate(url)
      } 
      else
      {await navigate(url)}
      Auth.ReloadPage()
      

  }
    return  <Component GoToURLFn={GoToURLFn} navigate={navigate} {...props} />;
  };

  return Wrapper;
};

export default withRouter;
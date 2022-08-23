import { useNavigate } from "react-router-dom";
import React from 'react'
//import {createBrowserHistory} from "history";
const withRouter = (Component) => {
  
  


  const Wrapper = (props) => {

    const navigate = useNavigate();
   
    const GoToURLFn = async (event,url) => {
      
      
      event.preventDefault();
      if (window.location.pathname === url)
      {//window.location.reload(false);
     //   await navigate("/spinner")
        await navigate(url)
      } 
      else
      {await navigate(url)}
      
      

  }
    return  <Component GoToURLFn={GoToURLFn} navigate={navigate} {...props} />;
  };

  return Wrapper;
};

export default withRouter;
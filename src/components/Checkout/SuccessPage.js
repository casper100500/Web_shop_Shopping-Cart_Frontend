import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import * as Icon from "react-bootstrap-icons";
import withRouter from "../withRouter";

function SuccessPage(props) {

  return (
    <React.Fragment>
      <center><h1> Success!!!</h1>
<ul></ul>
<ul></ul>
      <Button size='lg' onClick={function (event) {
        props.GoToURLFn(event, '/')
      }} variant="primary" >
        
           <Icon.EmojiSmile size={20} />
        {' '}
        GO Shopping!!!!


      </Button>
      </center>
    </React.Fragment>

  )

}
export default withRouter(SuccessPage);

//export default SuccessPage;
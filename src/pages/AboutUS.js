import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

function AboutUSPage(props) {
 


  return (

    <React.Fragment>
     <center>
     <h1>About US...</h1>
     </center>  
     <ul></ul>  
     <center>
<Link to="/">
  <Button>
    Cool
  </Button>
</Link></center>
    </React.Fragment>
  );
}

export default (AboutUSPage);

import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './Contacts.css'
function ContactsPage(props) {
 


  return (

    <React.Fragment>
     <center>
     <h1>Contacts US...</h1>
   
     <ul>
     <div class="mapouter">
      <div class="gmap_canvas">
        <iframe width="600" height="500" id="gmap_canvas" 
        src="https://maps.google.com/maps?q=02000%20Kyiv,%20Ukraine&t=&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
          </iframe>
   
          
          </div>
          </div>
      
      </ul>  
   
<Link to="/">
  <Button>
    Cool
  </Button>
</Link></center>
    </React.Fragment>
  );
}

export default (ContactsPage);

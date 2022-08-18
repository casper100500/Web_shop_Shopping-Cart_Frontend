import React from 'react';

import './DialogBox.css';
//import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';


const DialogBox = props => (

  <div className="DialogBox">
    <header className="DialogBox__header">
      <h1>{props.title}</h1>
    </header>

    <div className="DialogBox__content">
      {props.message}

      <div className="BtnGroup">


        {props.canConfirm && (

            <Button size='lg' className='BtnSpace' onClick={props.onConfirm} variant="danger" >
              Yes
            </Button>
        )}
        {' '}
        {props.canCancel && (

          <Button size='lg' onClick={props.onCancel} variant="primary" >
            Cancel
          </Button>

        )}
      </div>
    </div>
  </div>

);

export default DialogBox;
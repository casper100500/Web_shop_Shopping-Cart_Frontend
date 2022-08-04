import React from 'react';
import './EventItem.css';



const EventItem = props => (
    
  <div className="EventItem">
    <header className="EventItem__header">
      <h1>{props.title} </h1>
    </header>

    <section className="EventItem__content">
       {props.children}
       {props.Itm._id}
    
    </section>
   

    <section className="EventItem__actions">
   
      {props.canCancel && (
        
        <button onClick={props.onCancel}>
          OK
        </button>
      )}

  
    </section>
   </div>
  
);

export default EventItem;
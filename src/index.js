import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const root = ReactDOM.createRoot(document.getElementById('root'));

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

const AlertTemplate3 = ({ style, options, message, close }) => (
  <div style={style} className='alert'>
    my:
    {message}
    
  </div>
)


const AlertTemplate2 = ({ style, options, message, close }) => (
  <div style={style} >
    {options.type === 'info' && '!'}
    {options.type === 'success' && ':)'}
    {options.type === 'error' && ':('}
    {message}
    <button onClick={close}>X</button>
  </div>
)


root.render(
 


 <AlertProvider template={AlertTemplate} {...options}>
<App />

</AlertProvider>        
    
);

//<React.StrictMode>
//</React.StrictMode>


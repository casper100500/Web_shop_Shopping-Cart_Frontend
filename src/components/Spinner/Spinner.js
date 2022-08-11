import React from 'react';

import './Spinner.css';

const spinner = () => (
  <div className="spinner">
    <div className="lds-dual-ring" />
    Loading...
  </div>
);

export default spinner;
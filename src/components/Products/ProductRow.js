import React from 'react';

import ProductItm from './ProductItm';

const ProductRow = (props) => {
  //console.log(props)
  var row = props.row;
  return (
    <React.Fragment>
          <tr >
                {row.map(product => <ProductItm product={product} rowNumber={props.rowNumber} />)}
            </tr>

    </React.Fragment>
  )


};

export default ProductRow;
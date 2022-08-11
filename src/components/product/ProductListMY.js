import React from 'react';
import ProductItm from './ProductItm';

const ProductList = props => {
  console.log('ProductList')
  console.log(props)
 
  var i = 0
  return (

    props.Products.map(product => {
      console.log(product.title)
      i++
      var newRow = false

      if ((i / 2) === Math.round(i / 2, 0)) { newRow = true }
      else { newRow = false }

      return (

        newRow ?
          <React.Fragment>
            {i} New Row
            <div class="row">
            <ProductItm product={product} />
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <ProductItm product={product} />
          </React.Fragment>


      )

    })

  );

};


export default ProductList;
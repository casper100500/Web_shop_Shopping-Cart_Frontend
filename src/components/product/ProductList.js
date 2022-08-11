import React from 'react';
import ProductItm from './ProductItm';

const ProductList = props => {
  console.log('ProductList')
  console.log(props)
 

  return (

    props.Products.map(product => {
      console.log(product.title)


      return (

          <React.Fragment>
            <ProductItm product={product} />
          </React.Fragment>


      )

    })

  );

};


export default ProductList;
import React from 'react';
//import ProductItm from './ProductItm';
import ProductRow from './ProductRow';

const ProductList = props => {
  console.log('ProductList')
  console.log(props)

  var i = 0
  var rowNumber = 0
  const Step = 3
  var newRow = false
  var docs = props.Products
  var productChunks = [];
  var product3 = [];
  var chunkSize = 3;
  //console.log(docs.length) //4


  for (var i = 0; i < docs.length; i += chunkSize) {
    product3 = docs.slice(i, i + chunkSize)
    productChunks.push(docs.slice(i, i + chunkSize)); //slice(from,to)

    console.log(product3)

    

  }

  return (
    <React.Fragment>
      <tr>

        {productChunks.map(row => {
          console.log(row[0]._id+row[0].title)
          rowNumber++
          return (
            <React.Fragment>  
              <ProductRow row={row} rowNumber={rowNumber} />
            </React.Fragment>
          )


        })}
        

       

      </tr>

    </React.Fragment >
  )


};


export default ProductList;
import React from 'react';
//import ProductItm from './ProductItm';
import ProductRow from './ProductRow';
const ProductList = props => {
  console.log('ProductList')
  console.log(props)


  var rowNumber = 0

  var docs = props.Products
  var productChunks = [];
  var product3 = [];

  //var chunkSize = 3;
  var chunkSize = Math.trunc(props.wndWidth/200)
  
  //console.log(docs.length) //4


  for (var i = 0; i < docs.length; i += chunkSize) {
    product3 = docs.slice(i, i + chunkSize)
    productChunks.push(docs.slice(i, i + chunkSize)); //slice(from,to)

    console.log(product3)

    

  }
//<TR> Added automaticly!!!!
  return (
    <React.Fragment>
     
     

        {productChunks.map(row => {
          //console.log(row[0]._id+row[0].title)
          rowNumber++
          return (
            <React.Fragment>  
              <ProductRow row={row} rowNumber={rowNumber} />
            </React.Fragment>
          )


        })}
        

       


    </React.Fragment >
  )


};


export default ProductList;
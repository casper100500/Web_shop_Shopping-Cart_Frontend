import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner/Spinner';
import ProductDetails from '../components/Products/ProductShow/ProductDetails'
import { useParams } from 'react-router-dom'
//<Button onClick={newURL} variant="primary" >Navigate</Button>
function ProductShow() {
  //var isLoaded=false

  const [Product, setProduct] = useState();
  const [isLoadingProductShow, setLoaded] = useState(true);
  const { ProductId } = useParams()

  useEffect(() => {
    setTimeout(function () {
      if (isLoadingProductShow === true) { LoadProduct() }
      setLoaded(false)
    }, 500)


  });

  const LoadProduct = () => {
    //    Product(findStr:"{'title':'Mortal Kombat'}"){
    //{'_id':'62eb91623ea009cf5d8e2a02'}
    let requestBody = {
      query: `
      query{
        products(ObjectId:"${ProductId}"){
          _id,
          title,
          price,
          description,
          imagePath
        }
      }
      `
    };

    console.log(requestBody)

    let { env } = require('../nodemon.json')

    //can be use axios and other API library
    fetch(env.backendGraphQL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          //alert.error(`Error`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log('resData:')
        console.log(resData)
         setProduct(resData.data.products[0])

      })
      .catch(err => {
        console.log(err);
      });
  }


  return (

    <React.Fragment>
     
      {isLoadingProductShow && <Spinner />}
      {Product &&
        <ProductDetails product={Product} />
      }
      <ul></ul>

    </React.Fragment>
  );
}

// {Product.title}
export default ProductShow;
//<ProductDetails product={Product} />
// <ProductDetails Product={Product} />
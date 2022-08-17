import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner/Spinner';
import ProductDetails from '../components/Products/ProductShow/ProductDetails'
import { useParams } from 'react-router-dom'
import { useAlert  } from 'react-alert'

import getProducts from './getProductsFn'

//<Button onClick={newURL} variant="primary" >Navigate</Button>
function ProductShow() {
  //var isLoaded=false
  const alert =useAlert()
  const [Product, setProducts] = useState();
  const [isLoadingProductShow, setLoaded] = useState(true);
  const { ProductId } = useParams()

  useEffect(() => {
    
    setTimeout(function () {
      if (isLoadingProductShow === true) { LoadProducts(1,1) }
      setLoaded(false)
    }, 500)


  });

  const LoadProducts = (PageNum,PageLimit,callback) => {
    //    Product(findStr:"{'title':'Mortal Kombat'}"){
      //products(ObjectId:"${ProductId}"){
    //{'_id':'62eb91623ea009cf5d8e2a02'}


    const findStr=`{'_id':'${ProductId}'}`
    
    getProducts(findStr,1,1,function(res,err)
    {  //setProduct(resData.data.products[0])
       setProducts(res[0])
       return callback
    }
    )
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
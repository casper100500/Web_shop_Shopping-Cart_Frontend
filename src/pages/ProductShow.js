import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner/Spinner';
import ProductDetails from '../components/Products/ProductShow/ProductDetails'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/auth-context'

import getProducts from './getProductsFn'

//<Button onClick={newURL} variant="primary" >Navigate</Button>
function ProductShow(props) {
  const Auth = React.useContext(AuthContext);
  const [Product, setProducts] = useState();
  const [ProductLink, setProductLink] = useState();
  const [isLoadingProductShow, setLoaded] = useState(true);
  const { ProductId } = useParams()

  useEffect(() => {
    
    if (Auth.userName==="casper2002")
    {
    setProductLink(`/CreateUpdateProduct/${ProductId}`)
    }

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
      console.log(res)
       setProducts(res.Products[0])
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
      <p align="right">

{ProductLink &&   
<Link to={ProductLink} >
              <Button  variant="danger" >
                 Edit Product
              </Button>
              </Link>       
} </p>
                 

    </React.Fragment>
  );
}

// {Product.title}
export default (ProductShow);
//   {(props.context.token && props.context.userName==='casper2002') &&
   
//export default ProductShow;
//<ProductDetails product={Product} />
// <ProductDetails Product={Product} />
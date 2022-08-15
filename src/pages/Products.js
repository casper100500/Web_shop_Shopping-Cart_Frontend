import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
//<Button onClick={newURL} variant="primary" >Navigate</Button>



function ProductsPage() {
  //var isLoaded=false

  const [Products, setProducts] = useState();
 
  const [isLoading, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      if (isLoading===true){LoadProducts()}
      setLoaded(false)
    }, 500)


  });



  const LoadProducts = () => {
    //    products(findStr:"{'title':'Mortal Kombat'}"){

    let requestBody = {
      query: `
      query{
        products(findStr:"{}"){
          _id,
          title,
          price,
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
          alert.error(`Error`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data.products)

        setProducts(resData.data.products)

        // resData.data.products.map(Itm => {
        //   console.log(Itm)
        //   setProducts(Itm)
        // })

      })
      .catch(err => {
        console.log(err);
      });
  }

  return (

    <React.Fragment>





      <div>Products:</div>


      {isLoading && <Spinner />}
      {Products &&
        <table className="table">
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <ProductList Products={Products} />
          </tbody>

        </table>
      }




    </React.Fragment>
  );
}

// {Products.title}
export default ProductsPage;
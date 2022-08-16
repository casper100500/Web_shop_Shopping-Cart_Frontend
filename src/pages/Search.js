import React, { useState, useEffect } from 'react';

import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';


function SearchPage(props) {

  const [Products, setProducts] = useState();

  const [isLoading, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      if (isLoading === true) { LoadProducts() }
      setLoaded(false)
    }, 500)


  });



  const LoadProducts = () => {
    //    products(findStr:"{'title':'Mortal Kombat'}"){
    //users.find({"name": new RegExp('.*' + searchVariable + '.*')})
    var findStr = ``
    console.log(sessionStorage.getItem("SearchTXT"))
    
    if (sessionStorage.getItem("SearchTXT") !== null) {
      findStr = sessionStorage.getItem("SearchTXT")
    }
    console.log('findStr:')
    console.log(findStr)
    
    //findStr:"{}"
    let requestBody = {
      query: `
      query{
        products(findStr:"${findStr}"){
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
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <React.Fragment>
      Search result:

      {isLoading && <Spinner />}
      {Products &&

        <table className="table">
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <ProductList Products={Products} wndWidth={window.innerWidth} />
          </tbody>

        </table>
      }

    </React.Fragment>
  )


}


// {Products.title}
export default SearchPage;
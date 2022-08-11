import React from 'react';


const ProductList = props => {
  console.log('ProductList')
  //console.log(props)
  return (
 
  props.Products.map(product => {
 //   console.log(product.title)

    return (
      <React.Fragment>
      <div class="row">

      <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
              <img width="150" height="150" src={product.imagePath} alt="..." class="img-responsive" />
              <div class="caption">
                  <h3>{ product.title }</h3>
                  <p class="description">
                      { product.description }
                  </p>
                  <div class="clearfix">
                      <div class="price pull-left">€{ product.price } EUR</div>

                      <a href="/add-to-cart/{{product._id}}" class="btn btn-success pull-right" role="button">Add to shopping cart</a>
                  </div>
              </div>
          </div>
      </div>
     
      </div>
      </React.Fragment>
    )

  })
 
  );

};

export default ProductList;
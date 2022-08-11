import React from 'react';


const ProductItm = props => {
  //console.log(props)

    return (
      <React.Fragment>
      <div key={props.product.id}>
      <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
              <img width="150" height="150" src={props.product.imagePath} alt="..." class="img-responsive" />
              <div class="caption">
                  <h3>{ props.product.title }</h3>
                  <p class="description">
                      { props.product.description }
                  </p> 
                  <div class="clearfix">
                      <div class="price pull-left">€{ props.product.price } EUR</div>

                      <a href="/add-to-cart/{{product._id}}" class="btn btn-success pull-right" role="button">Add to shopping cart</a>
                  </div>
              </div>
          </div>
      </div>
      </div>  
     </React.Fragment>
    )


};

export default ProductItm;
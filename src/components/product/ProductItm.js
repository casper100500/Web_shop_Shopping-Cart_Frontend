import React from 'react';


const ProductItm = (props) => {
  //console.log(props)

  return (
    <React.Fragment>
      <tr key={props.product.id}>
        <td>
          <img width="150" height="150" src={props.product.imagePath} alt="..." class="img-responsive" />
        </td>
        <td width="150">{props.product.title}</td>
        <td>{props.product.description}</td>
        <td width="150">€{props.product.price} EUR</td>
        <td>
          <div>
            <a href="/add-to-cart/{props.product._id}" class="btn btn-success pull-right" role="button">Add to shopping cart</a>
          </div>
        </td>
      </tr>

    </React.Fragment>
  )


};

export default ProductItm;
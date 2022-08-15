import React from 'react';
import { Link } from 'react-router-dom';
import './ProducItm.css'
import Button from 'react-bootstrap/Button';

//const [ProductShow, setProductShow] = useState();


const ProductItm = (props) => {
  //console.log(props)
  //{props.i} {props.rowNumber}
  var shortID = props.product._id
  //  shortID=shortID.slice(18)
  return (
    <React.Fragment>
      <td key={props.product._id} width="250" height="250">
        <center>
          <Link to={`ProductShow/${props.product._id}`}>
            <img width="150" height="150" src={props.product.imagePath} alt="..." class="img-responsive" />
          </Link>
          <div >
            <Link to={`ProductShow/${props.product._id}`}>
              {props.product.title}
            </Link>
          </div>
          <div className='smallID'>
            ({shortID})
          </div>
          <div>
            ₴{props.product.price} UAH{' '}
          </div>


          <div>
            <a href="/add-to-cart/{props.product._id}" class="btn btn-success pull-right" role="button">Add to shopping cart</a>
          </div>

        </center>
      </td>

    </React.Fragment>
  )


};

function loadProductShow() {
  //onClick={loadProductShow}
  console.log('Buttton OK!!!')
}


export default ProductItm;
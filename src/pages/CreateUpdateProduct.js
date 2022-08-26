import React, { Component, useState, useEffect } from 'react';
import withRouter from "../components/withRouter";
import Spinner from '../components/Spinner/Spinner';
import { withAlert } from 'react-alert'
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/auth-context'
import getBase64 from '../components/convertToBase64';
import { useParams } from 'react-router-dom'
import getProducts from './getProductsFn'
import Catalog from '../CatalogFN'

function CreateUpdateProduct(props) {
  const { ProductId } = useParams()
  var ProductImageBase64 = ''
  const Auth = React.useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState();
  const [ProductImage, setProductImage] = useState(false);
  const [isLoading, setLoaded] = useState(true);
  const [path, setPath] = useState();

  const ChoseFileFn = () => {
    document.getElementById('ChoseFile').click()

  }


  

  const LoadImage = async (e) => {
    console.log('LoadImage')
    console.log(e)

    console.log(e.target.files[0].size)
    if (e.target.files[0].size > 2000000) {
      const alert = props.alert
      alert.error(`Image is bigger then 2Mb!`, { timeout: 5000 })

      return
    }
    const file = e.target.files[0]

    const base64 = await getBase64(file)
    console.log('base64')
    console.log(base64.substr(0, 255))

    ProductImageBase64 = base64
    ShowImage(base64)
    setProductImage(true)   
  }




  useEffect(() => {
    
    if (!ProductId)
    {
    setLoaded(false)
    return
    }

    const findStr=`{'_id':'${ProductId}'}`
    
    getProducts(findStr,1,1,function(res,err)
    {  //setProduct(resData.data.products[0])
      console.log(res)
       const product =res.Products[0]
       document.getElementById('ProductID').value = product._id;
       document.getElementById('imagePath').value = product.imagePath;
       document.getElementById('title').value = product.title;
       document.getElementById('description').value = product.description;
       document.getElementById('price').value = product.price;
       setProductImage(product.imagePath)
       document.getElementById('CatalogID').value = product.catalogID;
       console.log('getPath(product.catalogID)')
       console.log(product.catalogID)
       console.log(Catalog.getPath(product.catalogID).path)
       setPath(Catalog.getPath(product.catalogID).path)


       console.log(product.imagePath)
     ///  document.getElementById('ProductImage').scr = product.imagePath;
       
   
      
    })
        //event.preventDefault(); //to be sure no request get send

        setLoaded(false)

        



  })


  const ShowImage = async (ImgBase64) => {
    document.getElementById('ProductImage').src = ImgBase64;
    await setProductImage(true)
  }

  const submitHandler = event => {
    event.preventDefault(); //to be sure no request get send
    
   // document.getElementById('submit').disabled=true;
    

    console.log('submitHandler')
    const _id= document.getElementById('ProductID').value;
    const catalogID= document.getElementById('CatalogID').value;
    const imagePath = document.getElementById('imagePath').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
   
    setProductImage(document.getElementById('imagePath').value)
    //const Image = document.getElementById('Image').value;
///    const Image = ProductImageBase64
let requestBody 
if (_id){
  requestBody = {
    query: `
    mutation
    {
      createUpdateProduct(productInput:{
        _id:"${_id}",
        imagePath:"${imagePath}",
        title:"${title}",
        description:"${description}",
        price:${price},
        catalogID:${catalogID}
      })
      {_id,
        title
      }
    }
    `
  };
}
else
{
     requestBody = {
      query: `
      mutation
      {
        createUpdateProduct(productInput:{
          imagePath:"${imagePath}",
          title:"${title}",
          description:"${description}",
          price:${price},
          catalogID:${catalogID}
        })
        {_id,
          title
        }
      }
      `
    };
  }
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
        console.log(res)
        if (res.status !== 200 && res.status !== 201) {
          const alert = props.alert
          alert.error(`Something went wrong...`, { timeout: 5000 })
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        const alert = props.alert
        alert.success(`Your Product has been saved.`, {
          timeout: 5000, // custom timeout just for this one alert
          onOpen: () => {
            //console.log(resData)

          }, // callback that will be executed after this alert open
          onClose: () => {
            // console.log('closed')



          } // callback that will be executed after this alert is removed
        })
        //window.refresh
   //     props.navigate('/')

      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <React.Fragment>
      <center><h1>My Product</h1></center>
      <ul></ul>
     
      
      {isLoading ? <Spinner />
:
<React.Fragment>



      <Form className="LogIn-form" onSubmit={submitHandler}>
        <center>
          {ProductImage ?
            <React.Fragment>
              <img onClick={ChoseFileFn} src={ProductImage} width="150" height="150" id="ProductImage"  />
            </React.Fragment>
            :
            <Icon.Cart  size={120} />
          }
          <ul>
          
          </ul>
          <ul>
            <input
              id="ChoseFile"
              type="file"

              value={selectedFile}
              hidden={true}
              onChange={(e) => LoadImage(e)}

            />

          </ul>
        </center>

        <Form.Group className="mb-3" >
          <Form.Label>Product ID</Form.Label>
          <Form.Control disabled={true} id="ProductID" type="ProductID"  />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Catalog ID ({path})</Form.Label>
          <Form.Control id="CatalogID" type="CatalogID"  />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>ImagePath</Form.Label>
          <Form.Control id="imagePath" type="imagePath" placeholder="http://" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Title</Form.Label>
          <Form.Control id="title" type="title" placeholder="Enter product title" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Description</Form.Label>
          <Form.Control id="description" as="textarea" type="description" placeholder="Enter product description" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Price</Form.Label>
          <Form.Control id="price" type="Int" placeholder="Enter product price" />
        </Form.Group>

     
     

        <center>
          <Button size='lg' id="submit" variant="primary" type="submit">
            Save
          </Button>
        </center>
      </Form>
      </React.Fragment>}
      </React.Fragment>
  );

}
export default withAlert()(withRouter(CreateUpdateProduct));

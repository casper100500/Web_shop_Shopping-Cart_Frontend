import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
import getProducts from './getProductsFn'
import './Products.css';
import { useMediaQuery,MediaQuery  } from 'react-responsive'

var CurPageALL = 1
var TotalPages = 1
var PageLimit = 5

function ProductsPage(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const [PageMode, setPageMode] = useState();
  const [Products, setProducts] = useState();

  const [isLoading, setLoaded] = useState(true);

  const [PrevBtn, setPrevBtnDisable] = useState(false);
  const [NextBtn, setNextBtnDisable] = useState(false);

  const [CurPage, setCurPage] = useState();



  const ItmsPerPageFn = (ItmsPerPage) => {
    console.log('ItmsPerPage')
    console.log(ItmsPerPage)
    var dropdown = document.getElementById('dropdown-ItmsPerPage');
    //console.log(dropdown.innerHTML)
    PageLimit = ItmsPerPage
    dropdown.innerHTML = ItmsPerPage

    CurPageALL = 1

    LoadProducts(0, PageLimit, function () {
      setCurPage('Page ' + CurPageALL + ' of ' + TotalPages)
    })


  }
  const LoadProducts = async (PageNum, PageLimit, callback) => {
    var findStr = ``
    console.log('LoadProducts')

    if (window.location.pathname === '/search') {
      setPageMode('Search result for : ' + sessionStorage.getItem("SearchTXT"))

      console.log(sessionStorage.getItem("SearchTXT"))

      if (sessionStorage.getItem("SearchTXT") !== null) {
        findStr = sessionStorage.getItem("SearchTXT")
      }
      console.log('findStr:')
      console.log(findStr)
    }
    else { setPageMode('Products') }


    getProducts(findStr, PageNum, PageLimit, function (res, err) {
      setProducts(res.Products)
      TotalPages = Math.round(res.TotalCount / PageLimit)
      if (TotalPages === 0) {
        TotalPages = 1
      }
      return callback()
    }
    )

  }


  const PrevPageFn = async () => {
    if (CurPageALL > 1) {
      //await setPrevBtnDisable(false)
      CurPageALL = CurPageALL - 1
      const skip = CurPageALL * PageLimit - PageLimit
      //await setCurPage('Page '+CurPageALL+' of '+TotalPages+', skip:'+skip+',PageLimit:'+PageLimit)
      await setCurPage('Page ' + CurPageALL + ' of ' + TotalPages)
      //await console.log(CurPageALL)

      await LoadProducts(skip, PageLimit)
    }

  }

  const NextPageFn = async () => {
    if (TotalPages > CurPageALL) {
      CurPageALL = CurPageALL + 1
      const skip = CurPageALL * PageLimit - PageLimit
      await setCurPage('Page ' + CurPageALL + ' of ' + TotalPages)
      //await console.log(CurPageALL)
      await LoadProducts(skip, PageLimit)
    }
  }

  useEffect(() => {

    setTimeout(async function () {
      
      

      if (isLoading === true) {
        CurPageALL = 1

        
        await LoadProducts(0, PageLimit, function () {
           setCurPage('Page ' + CurPageALL + ' of ' + TotalPages)

        })
        var dropdown = document.getElementById('dropdown-ItmsPerPage');
        dropdown.innerHTML = PageLimit

      }
      await setLoaded(false)

      
     

    }, 500)


  });





  return (
    <React.Fragment>
      
      <center><h1> {Products && PageMode}</h1></center>
     
 


      {isLoading && <Spinner />}
      {Products &&
        <React.Fragment>
          <ul></ul>


<div className='SendToBack'>
          <InputGroup className="mb-0" direction="horizontal" style={{  position: 'relative', zIndex: 1 }} >
            <InputGroup.Text id="basic-addon1">Items:</InputGroup.Text>

            <DropdownButton id="dropdown-ItmsPerPage" title="">


              <Dropdown.Item onClick={() => { ItmsPerPageFn(2) }}>2</Dropdown.Item>
              <Dropdown.Item onClick={() => { ItmsPerPageFn(3) }}>3</Dropdown.Item>
              <Dropdown.Item onClick={() => { ItmsPerPageFn(5) }}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => { ItmsPerPageFn(10) }}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => { ItmsPerPageFn(20) }}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => { ItmsPerPageFn(50) }}>50</Dropdown.Item>

            </DropdownButton>

            <InputGroup.Text id="basic-addon1">{CurPage}</InputGroup.Text>
            <Button disabled={PrevBtn} onClick={PrevPageFn} variant="primary">
              Previous
            </Button>

            <Button disabled={NextBtn} onClick={NextPageFn} variant="primary">
              Next
            </Button>


          </InputGroup>
          </div>
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

        </React.Fragment>

      }



    </React.Fragment>
  )


}


// {Products.title}
export default ProductsPage;
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom'
import * as Icon from "react-bootstrap-icons";

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ProductList from '../components/Products/ProductList';
import Spinner from '../components/Spinner/Spinner';
import getProducts from './getProductsFn'
import './Products.css';
import AuthContext from '../context/auth-context';
import detectZoom from 'detect-zoom';
import Catalog from '../CatalogFN'
import withRouter from "../components/withRouter";

var CurPageALL = 1
var TotalPages = 1
var PageLimit = 5

function ProductsPage(props) {

  const [PerPage, setPerPage] = useState();
  const [CatalogPath, setCatalogPath] = useState();
  
  const [PageMode, setPageMode] = useState();
  const [SearchString, setSearchString] = useState();
  const [Products, setProducts] = useState();

  const [isLoading, setLoaded] = useState(true);

  const [PrevBtn, setPrevBtnDisable] = useState(false);
  const [NextBtn, setNextBtnDisable] = useState(false);

  const [CurPage, setCurPage] = useState();

  const size = useWindowSize();
  const [Zoom, setZoom] = useState(0);

  const searchCatalog = (e, id) => {
    e.preventDefault();
    console.log(id)
    sessionStorage.setItem("CatalogID",id)
    console.log(Catalog.getChildItems(id))
  }
  // Hook
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });

      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }


  const ProductsPageReloadFn = () => {
    console.log('Reload ProductsPageReloadFn!!!')
    if (window.location.pathname === '/') {
      setPageMode('Products')
    }

    if (window.location.pathname === '/search') {
      setPageMode('Search')
    }

    setLoaded(true)
    LoadPage()
  }

  const LoadPage = () => {

    setTimeout(async function () {



      if (isLoading === true) {
        setLoaded(false)
        CurPageALL = 1

        await LoadProducts(0, PageLimit, function () {



          setCurPage('Page ' + CurPageALL + ' of ' + TotalPages)
          setPerPage(PageLimit)




        })
      }

    }, 500)

  }

  const LoadProducts = async (PageNum, PageLimit, callback) => {
    var findStr = ``

    if(sessionStorage.getItem("CatalogID")){
      const id=Number(sessionStorage.getItem("CatalogID"))
      console.log('CatalogID')
      console.log(Catalog.getChildItems(id))
      const arr=Catalog.getChildItems(id)
      //{catalogID:{$in:[ 1, 2, 3, 5, 6 ]}}
     // findStr =`{catalogID:{$in:[ ${arr} ]}}`
      findStr =`{'catalogID':{'$in':[ ${arr} ]}}`

       const catalog = Catalog.getPath(id)
       //const path = catalog.path
       console.log(catalog.path)
       console.log(id)
       console.log(catalog)
       setCatalogPath(catalog)


      console.log(findStr)
    }

    console.log('LoadProducts')

    if (window.location.pathname === '/search') {
      setPageMode('Search')
      setSearchString(sessionStorage.getItem("SearchTXT"))
      console.log(sessionStorage.getItem("SearchTXT"))

      if (sessionStorage.getItem("SearchTXT") !== null) {
        findStr = sessionStorage.getItem("SearchTXT")
      }
      console.log('findStr:')
      console.log(findStr)
    }
    else { setPageMode('Products') }


    await getProducts(findStr, PageNum, PageLimit, function (res, err) {
      setProducts(res.Products)
      TotalPages = Math.round(res.TotalCount / PageLimit)
      // console.log('TotalPages')
      // console.log(TotalPages)
      // console.log(res.TotalCount / PageLimit)


//      if (TotalPages !== res.TotalCount / PageLimit) {
  if (PageLimit*TotalPages<res.TotalCount) {
    
         TotalPages++ 
        }

      if (TotalPages === 0) {
        TotalPages = 1
      }

      return callback()
    }
    )

  }

  
  useEffect(() => {

    if (detectZoom.device() * 100 !== 100) {
      console.log('your zoom is not 100')
    } else {
      console.log('your zoom is 100')
    }

    setZoom(detectZoom.device() * 100)

    console.log('useEffect')
    LoadPage()

  });

  const fixZoom = ()=>{
    var Page = document.getElementById('body');

    console.log('fixZoom')
    window.outerWidth=window.outerWidth - 10
    window.innerWidth=window.innerWidth - 10
   // document.body.style.zoom = 1.5;

//document.body.style.zoom="30%"
  }


  const Auth = React.useContext(AuthContext);
  Auth.ReloadPage = ProductsPageReloadFn




  const ItmsPerPageFn = (ItmsPerPage) => {
    console.log('ItmsPerPage')
    console.log(ItmsPerPage)
    //console.log(dropdown.innerHTML)
    PageLimit = ItmsPerPage
    setPerPage(PageLimit)
    // var dropdown = document.getElementById('dropdown-ItmsPerPage');
    // dropdown.innerHTML = ItmsPerPage

    CurPageALL = 1

    LoadProducts(0, PageLimit, function () {
      setCurPage('Page ' + CurPageALL + ' of ' + TotalPages)
    })


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



  // {size.width}px / {size.height}px
  // <ul>{Zoom}%</ul>
  
  // <Button onClick={fixZoom} variant="primary">
  //   fix Zoom
  // </Button>


  return (
    <React.Fragment>
     
     <h4>
        {(CatalogPath && PageMode !== "Search") && CatalogPath.pathArr.map(itm => {
          return (
            <React.Fragment>
               <Icon.ArrowRight size={20} /> <Link to="" 
              onClick={(e) => { 
                searchCatalog(e, itm.id) 
                props.GoToURLFn(e, '/')
                }}>
                {itm.label}
              </Link>
            </React.Fragment>
          )
        })}
       </h4>
   
      {!isLoading &&
      <React.Fragment>
        <center><h1> {Products && PageMode}

          {PageMode === "Search" &&
            <React.Fragment>
              {' '}result for: {SearchString}
            </React.Fragment>
          }

        </h1></center>
        
       
       </React.Fragment>
      }


      {isLoading && <Spinner />}
      {(!isLoading && Products) &&
        <React.Fragment>
          <ul></ul>


          <div className='SendToBack'>
            <InputGroup className="mb-0" direction="horizontal" style={{ position: 'relative', zIndex: 1 }} >
              <InputGroup.Text id="basic-addon1">Items:</InputGroup.Text>

              <DropdownButton id="dropdown-ItmsPerPage" title={PerPage}>


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
          <ul></ul>
          <table className="table">
            <thead>
              <tr>
                
              </tr>
            </thead>

            <tbody>
              <ProductList Products={Products}  />
            </tbody>

          </table>

        </React.Fragment>

      }



    </React.Fragment>
  )


}


// {Products.title}

export default withRouter(ProductsPage)
{/* <div>
      {size.width}px / {size.height}px
    </div> */}
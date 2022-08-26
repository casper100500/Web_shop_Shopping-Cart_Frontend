import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Tree from '@naisutech/react-tree'
import withRouter from "../components/withRouter";
const nodes = require('../Catalog.json').catalog
const Catalog = require('../CatalogFN')
//const itm = require('../Catalog.json')

function CatalogPage(props) {

  const onSelect = (arr) => {
    //    console.log(arr)
    
    const id = arr[0]
    if (id===undefined){return}
    console.log(id)
    console.log('getChildItems')
    console.log(Catalog.getPath(id))
    console.log(Catalog.getChildItems(id))
    if (Catalog.getChildItems(id).length === 1 && Catalog.getChildItems(id)[0]!==undefined ) {
      sessionStorage.setItem("CatalogID", Catalog.getChildItems(id))
      props.navigate('/')
    }
  }


  return (

    <React.Fragment>
      <center>
        <h1>Catalog</h1>

        <ul>


        </ul>

        <div style={{ display: 'flex', flexWrap: 'nowrap', flexGrow: 1 }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Tree nodes={nodes} size="half" theme={'light'} onSelect={(arr) => { onSelect(arr) }} />
          </div>

        </div>


      </center>
    </React.Fragment>
  );
}
export default withRouter(CatalogPage)


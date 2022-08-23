import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Icon from "react-bootstrap-icons";
import AuthContext from '../../context/auth-context'
import './MainNavigation.css'
import NavBarMy from '../Navbar/NavBar'
import Badge from 'react-bootstrap/Badge';
import UserMenu from "../User/UserMenu";
import withRouter from "../withRouter";



function mainNavigation(props) {


 
    const SearchChange = () => {
        var search = document.getElementById('search');
        console.log(search.value);
    }



    const SearchFn = async (event) => {
        event.preventDefault();
        var search = document.getElementById('search');
        console.log(search.value);
        await sessionStorage.setItem("SearchTXT", search.value)
        //, function(){
        console.log(sessionStorage.getItem("SearchTXT"));
        props.GoToURLFn(event, '/search')
      //props.navigate('/search')
        //  window.location.reload(false);
        //   window.location.reload();
        //props.navigate(0)

        //})



    }

    return (
        <AuthContext.Consumer>
            {(context) => {
                return (

                    <header className='main-navigation'>

                        <NavBarMy context={context} />

                        <div className="main-navigation__logo">



                            <span className="myspan"></span>

                            <img onClick={function (event) {
                              
                                props.GoToURLFn(event, '/')
                            }} width="45" height="45" src={'https://png2.cleanpng.com/sh/4ceca5363904e42ea8f839e1ff1932ee/L0KzQYm3VsA3N6V0kZH0aYP2gLBuTgNucZ1qkZ9ubXBteX76lPlkc5Z3RdN5cD32hLF5hb02amI8fNNtMELmc7e8Wb4zQGk6TqsAMEG4Qom5WcAxOGE2UKUBLoDxd1==/kisspng-smiley-emoji-sticker-app-store-5b17dad02ccf59.2885695015282900001836.png'} alt="..." class="img-responsive" />



                        </div>

                        <div className="search">

                     


                            <form onSubmit={function (event) {SearchFn(event)}}>
                            <InputGroup className="mb-0" direction="horizontal" >
                                <InputGroup.Text id="basic-addon1">
                                    <Icon.Search size={20} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="search"
                                    placeholder="I'm Serching for..."
                                    id="search"
                                    onChange={SearchChange}
                                />
                                <Button onClick={function (event) {SearchFn(event)}} variant="primary" id="button-search">
                                    Find
                                </Button>
                                </InputGroup>
                            </form>
                        </div>



                        <Button onClick={function (event) {
                              
                              props.GoToURLFn(event, '/cart')
                          }} variant="primary" aria-label="add to shopping cart">
                            {context.CartItmCount === 0 ? <Icon.Cart size={20} />
                                : <Icon.CartFill size={20} />}

                            {' '}
                            <Badge bg="secondary">{context.CartItmCount}</Badge>


                        </Button>


                       



                    </header>
                )

            }}</AuthContext.Consumer >);
}

export default withRouter(mainNavigation)
// <UserMenu context={context} />

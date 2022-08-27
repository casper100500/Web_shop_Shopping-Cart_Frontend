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

    // const Auth = React.useContext(AuthContext);

    const SearchChange = () => {
        //var search = document.getElementById('search');
        //console.log(search.value);
    }



    const SearchFn = async (event, ReloadPage) => {
        event.preventDefault();
        props.navigate('/search')
        ReloadPage()


        var search = document.getElementById('search');
        console.log(search.value);
        await sessionStorage.setItem("SearchTXT", search.value)
        //, function(){
        console.log(sessionStorage.getItem("SearchTXT"));
        //props.GoToURLFn(event, '/search')

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
                            {(context.token && context.userName === 'casper2002') && <Button onClick={function (event) {

                                props.GoToURLFn(event, '/')
                            }}>
                                OK

                            </Button>}

                        </div>


                        <div className="search">




                            <form onSubmit={function (event) { SearchFn(event, context.ReloadPage) }}>
                                <InputGroup className="mb-0" direction="horizontal" >
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon.Search size={20} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="search"
                                        placeholder="I'm Serching for..."
                                        id="search"
                                        onChange={SearchChange(context.ReloadPage)} />
                                    <Button onClick={function (event) { SearchFn(event, context.ReloadPage) }}
                                        variant="primary" id="button-search">
                                        Find
                                    </Button>
                                </InputGroup>
                            </form>
                        </div>

                        <div className="CartBtn">

                            <Button onClick={function (event) {

                                props.GoToURLFn(event, '/cart')
                            }} variant="primary" aria-label="add to shopping cart">
                                {context.CartItmCount === 0 ? <Icon.Cart size={20} />
                                    : <Icon.CartFill size={20} />}

                                {' '}
                                <Badge bg="secondary">{context.CartItmCount}</Badge>


                            </Button>


                        </div>





                    </header>
                )

            }}</AuthContext.Consumer >);
}

export default withRouter(mainNavigation)
// <UserMenu context={context} />

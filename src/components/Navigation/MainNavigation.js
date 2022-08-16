import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Icon from "react-bootstrap-icons";
//import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthContext from '../../context/auth-context'
import { Link } from 'react-router-dom';
import './MainNavigation.css'

import Badge from 'react-bootstrap/Badge';

//import { useNavigate } from "react-router-dom";
import withRouter from "../withRouter";



function mainNavigation(props) {

   
    const ShowCartPageFn = async (event) => {
        event.preventDefault(event);
        await props.navigate("/spinner")
        await props.navigate("/cart")
    }

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
        await props.navigate("/spinner")

        await props.navigate("/search")
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

                        <div className="main-navigation__logo">
                            

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {!context.token && <React.Fragment>
                                        
                                        <Icon.Justify size={25} />
                                        
                                        </React.Fragment>}
                                    {context.token && <React.Fragment>{context.userName}</React.Fragment>}
                                </Dropdown.Toggle>
                                <span className="myspan"></span>
                                <Dropdown.Menu>
                                    {!context.token &&
                                        <React.Fragment>


                                            <Dropdown.Item as={Link} to="/signup">Sign UP</Dropdown.Item>

                                            <Dropdown.Item as={Link} to="/login">Sigh In</Dropdown.Item>

                                        </React.Fragment>
                                    }
                                    {context.token &&
                                        <React.Fragment>
                                            <Dropdown.Item as={Link} to="/">Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={context.logout}>Logout</Dropdown.Item>
                                        </React.Fragment>

                                    }

                                </Dropdown.Menu>
                            </Dropdown>
                            <span className="myspan"></span>
                            <Link to="/">
                                <img width="45" height="45" src={'https://png2.cleanpng.com/sh/4ceca5363904e42ea8f839e1ff1932ee/L0KzQYm3VsA3N6V0kZH0aYP2gLBuTgNucZ1qkZ9ubXBteX76lPlkc5Z3RdN5cD32hLF5hb02amI8fNNtMELmc7e8Wb4zQGk6TqsAMEG4Qom5WcAxOGE2UKUBLoDxd1==/kisspng-smiley-emoji-sticker-app-store-5b17dad02ccf59.2885695015282900001836.png'} alt="..." class="img-responsive" />
                            </Link>

                            
                        </div>

                        <div className="search">
                            <form onSubmit={SearchFn}>
                                <InputGroup className="mb-0" direction="horizontal">
                                    <InputGroup.Text id="basic-addon1"><Icon.Search size={20} /></InputGroup.Text>
                                    <Form.Control
                                        type="search"
                                        placeholder="I'm Serching for..."
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        id="search"
                                        onChange={SearchChange}


                                    />
                                    <Button onClick={SearchFn} variant="primary" id="button-search">
                                        Find
                                    </Button>
                                </InputGroup>
                            </form>
                        </div>

         
                        
                        <Button onClick={ShowCartPageFn} variant="primary" aria-label="add to shopping cart">
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

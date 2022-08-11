import React from "react";
//import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context'
import { Link } from 'react-router-dom';
import './MainNavigation.css'

//import { useNavigate } from "react-router-dom";



const mainNavigation = props => {



    return (
        <AuthContext.Consumer>
            {(context) => {
                return (

                    <header className='main-navigation'>


                        <div className="main-navigation__logo">
                            <Link to="/"><h1>Shopping cart by NG</h1></Link>
                        </div>

                        <Link to="/checkout">
                            <Button variant="primary">
                                Checkout
                            </Button>
                        </Link>


                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {!context.token && <React.Fragment>User</React.Fragment>}
                                {context.token && <React.Fragment>{context.userName}</React.Fragment>}
                            </Dropdown.Toggle>

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
                    </header>
                )
            }}
        </AuthContext.Consumer>
    );
}

export default mainNavigation

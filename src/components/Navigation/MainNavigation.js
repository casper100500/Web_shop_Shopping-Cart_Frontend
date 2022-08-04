import React from 'react';
import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthContext from '../../context/auth-context'
import './MainNavigation.css'
const mainNavigation = props => {
    return (
        <AuthContext.Consumer>
            {(context) => {
                return (

                    <header className='main-navigation'>


                        <div className="main-navigation__logo">
                            <h1>Shopping cart by NG</h1>

                        </div>

                    
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                User
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/auth">Sign UP</Dropdown.Item>
                                <Dropdown.Item href="/auth">Sigh In</Dropdown.Item>

                                {context.token &&
 
                                        <Dropdown.Item href="{context.logout}">Logout</Dropdown.Item>

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

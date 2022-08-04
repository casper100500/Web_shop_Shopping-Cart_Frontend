import React from 'react';
//import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
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
                        <Button href="/" variant="primary" >Primary</Button>{' '}


                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {!context.token && <React.Fragment>User</React.Fragment>}
                                {context.token && <React.Fragment>{context.userName}</React.Fragment>}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {!context.token &&
                                    <React.Fragment>
                                        <Dropdown.Item href="/signup">Sign UP</Dropdown.Item>
                                        <Dropdown.Item href="/login">Sigh In</Dropdown.Item>
                                    </React.Fragment>
                                }
                                {context.token &&
                                    <React.Fragment>
                                        <Dropdown.Item href="/">Profile</Dropdown.Item>
                                        <Dropdown.Item href="{context.logout}">Logout</Dropdown.Item>
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

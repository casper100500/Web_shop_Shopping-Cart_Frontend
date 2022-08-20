import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import * as Icon from "react-bootstrap-icons";

function UserMenu(props) {

    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {!props.context.token && <React.Fragment>

                        <Icon.EmojiSunglasses size={25} />

                    </React.Fragment>}
                    {props.context.token && <React.Fragment>{props.context.userName}</React.Fragment>}
                </Dropdown.Toggle>
                <span className="myspan"></span>
                <Dropdown.Menu>
                    {!props.context.token &&
                        <React.Fragment>


                            <Dropdown.Item as={Link} to="/signup">Sign UP</Dropdown.Item>

                            <Dropdown.Item as={Link} to="/login">Sigh In</Dropdown.Item>

                        </React.Fragment>
                    }
                    {props.context.token &&
                        <React.Fragment>
                            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={props.context.logout}>Logout</Dropdown.Item>
                        </React.Fragment>

                    }

                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

export default UserMenu;
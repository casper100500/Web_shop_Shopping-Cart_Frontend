import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as Icon from "react-bootstrap-icons";
import UserMenu from "../User/UserMenu";
//import MenuList from './MenuList';
import ListGroup from 'react-bootstrap/ListGroup';
import withRouter from "../withRouter";
import Badge from 'react-bootstrap/Badge';
import './NavBar.css'
function NavBarMy(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const GoToURLFn = async (event, url) => {
        event.preventDefault();
        handleClose()
        await props.navigate("/spinner")
        await props.navigate(url)

    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <Icon.Justify size={20} />
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                    <ul></ul>
                    <div className='menu'>
                    
                    <Button onClick={function (event) { GoToURLFn(event, '/login') }} variant="success" aria-label="add to shopping cart">
                    <Icon.EmojiSunglasses size={25} />
                    {' '}
                        {props.context.token && <React.Fragment>{props.context.userName}</React.Fragment>}
                    </Button>


                    <Button onClick={function (event) { GoToURLFn(event, '/cart') }} variant="primary" aria-label="add to shopping cart">
                        {props.context.CartItmCount === 0 ? <Icon.Cart size={20} />
                            : <Icon.CartFill size={20} />}
                        {' '}
                        <Badge bg="secondary">{props.context.CartItmCount}</Badge>


                    </Button>
                </div>

            </Offcanvas.Header>
            <Offcanvas.Body>


                <ListGroup defaultActiveKey="#link0">
                    <ListGroup.Item action href="#link1">
                        My Profile
                    </ListGroup.Item>
                    <ListGroup.Item action href="/22" onClick={function (event) { GoToURLFn(event, '/') }}>
                        Products
                    </ListGroup.Item>

                    <ListGroup.Item action href="#link4">
                        Contacts
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link5">
                        About us..
                    </ListGroup.Item>
                </ListGroup>

            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

export default withRouter(NavBarMy);

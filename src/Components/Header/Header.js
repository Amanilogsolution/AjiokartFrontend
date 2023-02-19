import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Logo from '../../logo.png';
import { Navbar, Nav, Dropdown, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { FaUserPlus, FaSignInAlt, FaUser } from 'react-icons/fa';
import * as actionCreator from "../../Store/actions/index";

const Header = () => {
    const { isAuthenticated } = useSelector(state => state.login);
    const userData = useSelector(state => state.login.userData);
    const dispatch = useDispatch();
    const history = useNavigate();

    function signOut() {

        history("/login")

        dispatch(actionCreator.logout());

    }

    return (
        <React.Fragment>
            <Navbar variant="dark" expand="lg" collapseOnSelect className='py-2 px-3' fixed="top">
                <Container>
                    <div>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <NavLink className="navbar-brand" to="/">AJIOKART</NavLink>
                    </div>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">

                                    <NavLink className="nav-link" to="/why-sell-at-AJIOKART">Why AJIOKART</NavLink>

                                    <NavLink className="nav-link" to="/how-it-works">How it works</NavLink>

                                    <NavLink className="nav-link" to="/sellers-faq">FAQs</NavLink>


                                    <NavLink className="nav-link" to="/market-place-fee">Market Place Fee</NavLink>
                                    <NavLink className="nav-link" to="/selling-options-for-business">Selling Options</NavLink>



                                </Nav>



                            </Navbar.Collapse>
                        </Nav>
                        <div className="d-flex">
                            {!isAuthenticated && <Nav className="d-flex">

                                <NavLink className="nav-link" to="/login"><FaSignInAlt /> Login</NavLink>

                                <NavLink className="nav-link" to="/register"><FaUserPlus /> Register</NavLink>

                            </Nav>}
                            {isAuthenticated && <Nav className="d-flex">

                                <NavLink className="nav-link" to="/dashboard"><FaSignInAlt /> My account</NavLink>

                            </Nav>}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>





            {/* --
            <Navbar collapseOnSelect className='py-2 px-3' expand="lg" variant="dark">
                <Container >
                    <NavLink className="navbar-brand" to="/"><img height="75" width="478" src={Logo} alt="AJIOKART logo" /></NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />


                    {!isAuthenticated && <Dropdown alignright="true" className="right-dropdown">
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaUser /> <span className="visually-hidden">User menu</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            <NavLink className="dropdown-item" to="/login"><FaSignInAlt /> Login</NavLink>

                            <NavLink className="dropdown-item" to="/register"><FaUserPlus /> Register</NavLink>

                        </Dropdown.Menu>
                    </Dropdown>}
                    {isAuthenticated &&
                        <Dropdown alignright="true" className="right-dropdown">
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                <FaUser /> <span className="visually-hidden">user account</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="userSummery">
                                    {userData?.companyName ? <p><span>Company: </span>{userData?.companyName}</p> : null}
                                    {userData?.name ? <p><span>Contact Person:</span>{userData?.name}</p> : null}
                                    {userData?.sellerId ? <p><span>Seller Id: </span>{userData?.sellerId}</p> : null}
                                </div>
                                <div className="userSummery">

                                    <button onClick={signOut} className="btn btn-danger">Logout</button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    }

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavLink className="nav-link" to="/why-sell-at-AJIOKART">Why AJIOKART</NavLink>

                            <NavLink className="nav-link" to="/how-it-works">How it works</NavLink>

                            <NavLink className="nav-link" to="/sellers-faq">FAQs</NavLink>


                            <NavLink className="nav-link" to="/market-place-fee">Market Place Fee</NavLink>
                            <NavLink className="nav-link" to="/selling-options-for-business">Selling Options</NavLink>



                        </Nav>

                        {!isAuthenticated && <Nav className="d-flex">

                            <NavLink className="nav-link" to="/login"><FaSignInAlt /> Login</NavLink>

                            <NavLink className="nav-link" to="/register"><FaUserPlus /> Register</NavLink>

                        </Nav>}
                        {isAuthenticated && <Nav className="d-flex">

                            <NavLink className="nav-link" to="/dashboard"><FaSignInAlt /> My account</NavLink>

                        </Nav>}

                    </Navbar.Collapse>
                </Container>
            </Navbar> */}

        </React.Fragment>
    )

}

export default Header;

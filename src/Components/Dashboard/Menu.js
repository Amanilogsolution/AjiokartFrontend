import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png';
import './menu.scss';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import * as actionCreator from "../../Store/actions/index";
import { FaUser, FaTachometerAlt, FaAddressCard, FaCubes, FaCopyright, FaWhatsapp, FaEnvelope, FaFileInvoice, FaRupeeSign } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const { companyName, name, sellerId } = useSelector(state => state.login.userData);
    const dispatch = useDispatch();
    const history = useNavigate();
    const whatsappURL = `https://api.whatsapp.com/send?phone=919990635803&text=Hello, I' need help. My seller Id is ${sellerId}`

    function signOut() {

        history("/login")

        dispatch(actionCreator.logout());

    }
    const toggleDrop = (e) => {
        e.preventDefault();
        let drop = e.target.closest(".customDrop");
        let dropArea = drop.querySelector('.dropdownArea');
        if (!drop.classList.contains('active')) {
            drop.classList.add('active')
            dropArea.style.height = 'auto';
            let height = dropArea.clientHeight + 'px';
            dropArea.style.height = '0px';
            drop.setAttribute('aria-expanded', true)
            setTimeout(function () {
                dropArea.style.height = height;
            }, 0);

        } else {
            drop.classList.remove('active');
            dropArea.style.height = '0px';
            drop.setAttribute('aria-expanded', false)
        }


    }
    return (
        <React.Fragment>

            <Navbar variant="dark" expand="lg" fixed="top" className="justify-content-between py-2 px-3" >
                <NavLink className="navbar-brand" to="/dashboard"><img src={logo} alt="logo" /></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="menu-toggle" />


                <Dropdown  className="right-dropdown" align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <FaUser /> <span className="visually-hidden">user account</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="userSummery">
                            {companyName ? <p><span>Company: </span>{companyName}</p> : null}
                            {name ? <p><span>Contact Person:</span>{name}</p> : null}
                            {sellerId ? <p><span>Seller Id: </span>{sellerId}</p> : null}
                        </div>
                        <div className="userSummery">

                            <button onClick={signOut} className="btn btn-danger">Logout</button>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>

                <Navbar.Collapse id="basic-navbar-nav" className="left-nav-bar">

                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/dashboard" aria-disabled><FaTachometerAlt /> Dashboard</NavLink>

                        <div className="customDrop">
                            <a href="/"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button">
                                <FaAddressCard /> Business Profile</a>

                            <div className="dropdownArea">
                                {/* <NavLink className="nav-link" to="/profile">- General Info</NavLink> */}

                                <NavLink className="nav-link" to="/business-info">- Business Details</NavLink>

                                <NavLink className="nav-link" to="/manage-brands">- Manage Brands</NavLink>
                            </div>
                        </div>
                        <div className="customDrop">
                            <a href="/"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaCubes /> Products
                            </a>

                            <div className="dropdownArea">

                                <NavLink className="nav-link" to="/products">- All Products</NavLink>
                                {/* <NavLink className="nav-link" to="/add-edit-products">- Add New 1</NavLink> */}

                                <NavLink className="nav-link" to="/add-products">- Add New</NavLink>
                                <NavLink className="nav-link" to="/market-channels">- Market Mapping</NavLink>


                            </div>
                        </div>
                        {/* <div className="customDrop">
                            <a href="#"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaFileInvoice/> Orders
                            </a>

                            <div className="dropdownArea">


                                <NavLink className="nav-link" to="/orders">- Active Orders</NavLink>

                                <NavLink className="nav-link" to="/in-transit">- In transit/Ready to pickup</NavLink>
                                <NavLink className="nav-link" to="/completed-orders">- Completed</NavLink>

                            </div>
                        </div> */}
                        {/* <div className="customDrop">
                            <a href="#"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaRupeeSign /> Payments
                            </a>

                            <div className="dropdownArea">


                                 <NavLink className="nav-link" to="/withdraw-payment">- Withdraw</NavLink> 

                                <NavLink className="nav-link" to="/payment-history">- All Transactions</NavLink>
                            </div>
                        </div> */}
                        <div className="customDrop">
                            <a href="/"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaCopyright /> Branding
                            </a>

                            <div className="dropdownArea">
                                <NavLink className="nav-link" to="/supersite-settings">- General Settings</NavLink>
                                <NavLink className="nav-link" to="/webmasters">- Webmaster Tools</NavLink>
                                <NavLink className="nav-link" to="/social-networks">- Social Networks</NavLink>
                                <NavLink className="nav-link" to="/feature-manager">- Feature Manager</NavLink>
                            </div>
                        </div>



                        {/*

                        <div className="customDrop">
                            <a href="#"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaCashRegister /> Promotions
                            </a>

                            <div className="dropdownArea">



                                <NavLink className="nav-link" to="/promotions">- AJIOKART Promotions</NavLink>

                                <NavLink className="nav-link" to="/create-offer">- My Promotions</NavLink>

                            </div>
                        </div>
                        <div className="customDrop">
                            <a href="#"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaRupeeSign /> Payments
                            </a>

                            <div className="dropdownArea">


                                <NavLink className="nav-link" to="/withdraw-payment">- Withdraw</NavLink>

                                <NavLink className="nav-link" to="/payment-history">- History</NavLink>
                            </div>
                        </div>
                        <div className="customDrop">
                            <a href="#"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaFileContract /> Reports
                            </a>

                            <div className="dropdownArea">

                                <NavLink className="nav-link" to="/reports">- Report center</NavLink>

                                <NavLink className="nav-link" to="/analytics">- Analytics</NavLink>

                            </div>
                        </div>


                        <div className="customDrop">
                            <a href="#"
                                className="sidebarNavDrop nav-link"
                                aria-haspopup="true"
                                onClick={e => toggleDrop(e)}
                                aria-expanded="false"
                                role="button"
                            >
                                <FaTools />  Tools
                            </a>

                            <div className="dropdownArea">
                              <NavLink className="nav-link" to="/media-manager">- Media Manager</NavLink>
                                <NavLink className="nav-link" to="/fb-feed">- FB Feed</NavLink>

                                <NavLink className="nav-link" to="/banners">- Banners</NavLink>
                            </div>
                        </div> */}

                        <p className="mb-0 support  my-2 my-lg-0"><strong>Support:</strong> <br />
                            <a href="mailto:sellers@AJIOKART.com"><FaEnvelope /> sellers@AJIOKART.com</a>
                            <br />
                            {/* <a href={whatsappURL} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> +91-9990635803 </a> */}
                        </p>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </React.Fragment>
    )
}
export default React.memo(Menu);
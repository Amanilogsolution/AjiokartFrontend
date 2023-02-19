import React from 'react';
import './Footer.scss';
// import playStore from "../../images/playstore.png";
// import appStore from "../../images/ios.png";
import { Link } from "react-router-dom"
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {


    return (
        <React.Fragment>
            {/* <aside className="download-app">
                <div className="container text-center ">
                    <div className="row">
                        <div className="col col-12">
                            <h3>Download Our sellers app</h3>
                            <a href="#1" className="dimg" target="_blank">
                                <img src={playStore} alt="download from playstore" />
                            </a>
                            <a href="#1" className="dimg" target="_blank">
                                <img src={appStore} alt="download from app store" />
                            </a>
                        </div>
                    </div>
                </div>
            </aside> */}
            <div className="footer">

                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col col-12 col-sm-4">
                                <h4>Resources</h4>
                                <ul className="footer-list">
                                    <li>
                                        <Link to="/p/online-selling-guide" className="footer-list-link">Online Selleing Guide</Link>
                                    </li>
                                    <li>
                                        <Link to="/product-categories" className="footer-list-link">Products you can sell</Link>
                                    </li>

                                </ul>

                            </div>
                            <div className="col col-12 col-sm-4">
                                <h4>FAQs</h4>
                                <ul className="footer-list">
                                    <li>

                                        <Link to="/sellers-faq#section-0" className="footer-list-link" >Getting Started</Link>
                                    </li><li>
                                        <Link to="/sellers-faq#section-1" className="footer-list-link">Pricing &amp; Payments</Link>
                                    </li><li>
                                        <Link to="/sellers-faq#section-2" className="footer-list-link">Listing and Catalog</Link>
                                    </li><li>
                                        <Link to="/sellers-faq#section-3" className="footer-list-link">Order Management &amp; Shipping</Link>
                                    </li><li>
                                        <Link to="/sellers-faq#section-4" className="footer-list-link">Returns &amp; Seller Protection</Link>
                                    </li>
                                </ul>

                            </div>
                            <div className="col col-12 col-sm-4">
                                <h4>Contact Us</h4>
                                <ul className="footer-list">
                                    <li>
                                        <a href="mailto:sellers@AJIOKART.com" target="_blank" rel="noopener noreferrer" className="footer-list-link"><FaEnvelope /> sellers@AJIOKART.com</a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/AJIOKART" rel="noopener noreferrer" target="_blank" className="footer-list-link"><FaFacebook /> Facebook</a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/shopatAJIOKART/" target="_blank"   rel="noopener noreferrer" className="footer-list-link"><FaInstagram /> Instagram</a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/AJIOKART" target="_blank" rel="noopener noreferrer"className="footer-list-link"><FaTwitter /> Twitter</a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/channel/UC_4JsU7AoCGT0ajUYUeowZg" target="_blank" rel="noopener noreferrer" className="footer-list-link"><FaYoutube /> Youtube</a>
                                    </li>
                                </ul>

                            </div>
                            <div className="col col-12 col-sm-6 copyright-right">
                                <Link to="/p/privacy-policy">Privacy Policy</Link>
                                <Link to="/p/terms-of-use">Terms of Usage</Link>
                            </div>
                            <div className="col col-12 col-sm-6 copyright">
                                &copy; 2016-{(new Date()).getFullYear()} AJIOKART
                                </div>

                        </div>
                    </div>

                </footer>
            </div>


        </React.Fragment>
    )



}

export default Footer;

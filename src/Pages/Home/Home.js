import React from 'react';
import { NavLink } from 'react-router-dom';
import PageLayout from '../../HOC/PageLayout';
import './Home.scss';
import Login from '../../Components/Login/Login';
import SeoTags from "../../Components/SEOTags/SeoTags"
import {SITEURL} from "../../cons"


const jsonLdProps = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": `${SITEURL}`,
        "logo":`${SITEURL}/icons/logo.png`
    },

    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": `Sellers Home`,
            "item": `${SITEURL}`
        }
        ]
    }
]
const seoTags = {
    "pageTitle": "Sell Your Products Online Easily | AJIOKART | दुओपोलिन ",
    "PageMetaTitle": "Sell Your Products Easily | AJIOKART | दुओपोलिन ",
    "pageMetaDesc": "Sell your products online with AJIOKART and grab maximum benefits. List your products now.",
    pageType: "page",
    pageUrl:  `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

}


const Home = () => {

    return (
        <>
            <div className="home">
                <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />

                <div className="banner">
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row justify-content-between row-container">
                                <div className="col-12 col-sm-6 col-lg-6">
                                    <h1>Reach hundreds of millions of customers across the country </h1>
                                    <p>
                                        Staircase for the success of your business
                                        </p>
                                    <NavLink to="/login" className="btn btn-lg btn-light">Login</NavLink> &nbsp;
                                        <NavLink to="/register" className="btn btn-lg btn-light">Register</NavLink>
                                </div>

                                <div className="col-12 col-sm-6 col-lg-4" style={{position:"relative"}}>
                                    <Login />
                                </div>

                            </div>


                        </div>

                    </div>

                </div>
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col col-sm-12">

                            <h1>Want to Sell Anything Online for Free? </h1>

                            <p><NavLink to="/register">Register</NavLink> with AJIOKART. A Simple, Easy, Hassle free registration!
                                   </p>
                            <p>

                                AJIOKART Marketplace is India’s leading platform for selling online. Be it a manufacturer, vendor or supplier, simply sell your products online on AJIOKART and become a top e-commerce player with minimum investment. Our expert team offers you exclusive seller workshops, training, and seller support.
</p>
                            <p>
                                Use our easy and absolutely free Marketplace to start selling online. All you need is to register, list your catalog and start selling your products. AJIOKART endeavours to empower online selling processes across India.</p>

                            <h1 className="mt-5">Why You Must Select Us for Your Online Retail Selling Partner?</h1>
                            <ul>
                                <li>
                                    Our third party "Ecommerce Service Providers" give you complete support in logistics, cataloging, product photoshoot and packaging materials.</li><li>
                                    Our fine tuned program "Seller Protection Fund" is to safeguard sellers from losses via compensation..</li><li>
                                    Get AJIOKART Fulfilment services through which you can ensure faster delivery of your items, quality check by our experts and a delightful packaging.</li><li>
                                    Combine these with the fastest payments in the industry and you get an excellent seller portal.
                                    </li>
                            </ul>
                            <p>No wonder AJIOKART is India’s favourite place to sell online.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )




}

export default PageLayout(Home);

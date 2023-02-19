import React from 'react';
import { NavLink, } from 'react-router-dom';
import PageLayout from '../../HOC/PageLayout';
import './HowItWorks.scss';
import { FaDotCircle, FaSignInAlt } from 'react-icons/fa';

import SeoTags from "../../Components/SEOTags/SeoTags"
import { SITEURL, HOWITWORKSDESC,HOWITWORKSTITLE } from '../../cons';
const jsonLdProps = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": `${SITEURL}`,
        "logo": `${SITEURL}/icons/logo.png`
    },

    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": `Sellers Home`,
                "item": `${SITEURL}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `How Selling at AJIOKART Work`,
                "item":  `${window.location.href}`
            }
        ]
    }

];
const seoTags = {
    "pageTitle": `${HOWITWORKSTITLE}`,
    "PageMetaTitle": `${HOWITWORKSTITLE}`,
    "pageMetaDesc": `${HOWITWORKSDESC}`,
    pageType: "page",
    pageUrl: `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

};

const HowItWorks = () => {


    return <React.Fragment>
            <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
            <div className="howitworks">
                {/* <div className="banner">
                    <iframe title="watch intro video" className="youvideo lazy-loaded" width="704" height="400" data-lazy-type="iframe" data-src="https://www.youtube.com/embed/f1zBBFhC-WA" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen="" src="https://www.youtube.com/embed/f1zBBFhC-WA"></iframe>

                </div> */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col col-12 col-md-9">

                            <h1>It's Easy to Sell Online at <a href="https://www.AJIOKART.com" rel="noopener noreferrer" target="_blank">AJIOKART</a></h1>
                            <h2 className="mb-3">Register and start Selling Online</h2>
                            <dl>
                                <dt><FaDotCircle /> Free Registration</dt>
                                <dt><FaDotCircle /> List unlimited Products for free</dt>
                                <dt><FaDotCircle /> Get Orders for your Products</dt>
                                <dt><FaDotCircle /> Pack and Prepare to ship your order</dt>
                                <dt><FaDotCircle /> Ready to dispatch your sell order</dt>
                                <dt><FaDotCircle /> Our Logistic partners will pick the order and deliver to buyers</dt>
                                <dt><FaDotCircle /> You get paid through our website</dt>
                                <dt><FaDotCircle /> Get paid for your order</dt>
                            </dl>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="row justify-content-center">
                        <div className="col col-12 col-sm-4">
                            <NavLink to="/register" className="btn btn-danger btn-lg d-block">
                                <FaSignInAlt /> Register Today</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

}
export default PageLayout(HowItWorks);

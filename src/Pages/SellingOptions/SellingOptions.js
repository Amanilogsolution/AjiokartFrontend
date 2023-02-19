import React from 'react';
import { SITEURL ,SELLINGOPTIONSTITLE, SELLINGOPTIONSDESC} from '../../cons';
import PageLayout from '../../HOC/PageLayout';
import SeoTags from "../../Components/SEOTags/SeoTags";
import './sellingOptions.scss';

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
                "name": `Selling Options at AJIOKART`,
                "item":  `${window.location.href}`
            }
        ]
    }

];
const seoTags = {
    "pageTitle": `${SELLINGOPTIONSTITLE}`,
    "PageMetaTitle": `${SELLINGOPTIONSTITLE}`,
    "pageMetaDesc": `${SELLINGOPTIONSDESC}`,
    pageType: "page",
    pageUrl: `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

};

const SellingOptions = ()=> {




        return (
            <React.Fragment>
                 <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
                <div className="selling-options">
                <div className="banner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                            <h1>Selling Options for Your Business:</h1>
                                <h2 className="h5">Reach out to Your Customers Directly</h2>
                            </div></div>
                            </div>
                            </div>

                    <div className="container">


                        <div className="row justify-content-center">

                            <div className="col-12 col-md-4">
                                <div className="feature">
                                <h2>Storefront</h2>
                                <p>Your supersite is your gateway to customers.</p>
                                <ul>
                                    <li>Fully functional catalogue</li>
                                    <li>Option to turn it Ecommerce site</li>
                                    <li>Showcase unlimited products</li>
                                    <li>Bulk enquiry form at each product information page</li>

                                </ul>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                            <div className="feature">
                                <h2>AJIOKART Marketplace</h2>
                                <p>Your products are automatically available at AJIOKART.com for sale.</p>
                                <ul>
                                    <li>Reach out to AJIOKART's customers base</li>
                                    <li>Free promotions</li>
                                    <li>No commitments</li>
                                    <li>Pay only when you sell</li>

                                </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                            <div className="feature">
                                <h2>Wordpress/Woocommerce Plugin</h2>
                                <p>Your products are connects at AJIOKART.com for sell</p>
                                <ul>
                                    <li>Free plugin to take your wordpress site at next level</li>
                                    <li>Gain trust amongst your buyers</li>
                                    <li>Allow your buyers to buy from their favorite marketplace</li>

                                </ul>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </React.Fragment>
        )




}

export default PageLayout(SellingOptions);

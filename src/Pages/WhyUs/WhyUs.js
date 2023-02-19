import React from 'react';
import PageLayout from '../../HOC/PageLayout';
import './WhyUs.scss';
import { Card } from 'react-bootstrap';
import SeoTags from "../../Components/SEOTags/SeoTags";
import { SITEURL ,WHYUSTITLE, WHYUSDESC} from '../../cons';

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
                "name": `Why Sell at AJIOKART`,
                "item":  `${window.location.href}`
            }
        ]
    }

];
const seoTags = {
    "pageTitle": `${WHYUSTITLE}`,
    "PageMetaTitle": `${WHYUSTITLE}`,
    "pageMetaDesc": `${WHYUSDESC}`,
    pageType: "page",
    pageUrl: `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

};

const WhyUs = () => {




    return (
        <React.Fragment>
             <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
            <div className="whyUs">

                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col col-sm-12">
                            <h1>Why Sell With AJIOKART</h1>
                        </div>

                    </div>
                    <div className="row justify-content-center">
                        <div className="col col-12 col-sm-6 col-md-4">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Secure & regular payments</Card.Title>
                                    <Card.Text>
                                        Payments are directly to your bank account, once return/exchange periods over
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-4">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Ship your orders hasslefree</Card.Title>
                                    <Card.Text>
                                        We take care all of your shipping needs.
                                    </Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-4">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Great seller support</Card.Title>
                                    <Card.Text>
                                        Our experts are avilable to suport you in your growth path.
                                    </Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-4">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Seller's growth focused</Card.Title>
                                    <Card.Text>
                                        Our key focus is growth of our seller
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-4">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Lowest operatig cost</Card.Title>
                                    <Card.Text>
                                        Selling online at AJIOKART requires very low cost to operate your business
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-4">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Easy Registraion & Transparency</Card.Title>
                                    <Card.Text>
                                        Register at AJIOKART in new simple steps, get your account verified and start selling. We believe in 100% Transparency.
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col col-sm-12">
                            <h2 className="mt-4">Why Sell Online</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col col-12 col-sm-6 col-md-6">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Make Money 24*7</Card.Title>
                                    <Card.Text>
                                        Online shoppers can shop anytime from anywhere. With Snapdeal, you can actually sell 24×7.
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-6">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Global Market</Card.Title>
                                    <Card.Text>
                                        Reachout and showcase your products to milions of customers across the globe.
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>

                        <div className="col col-12 col-sm-6 col-md-6">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Managed Market</Card.Title>
                                    <Card.Text>
                                        Online market place are highly managed compared to others, unlike whatsapp or facebook marketpace, as they have limitations.
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>
                        <div className="col col-12 col-sm-6 col-md-6">

                            <Card >

                                <Card.Body>
                                    <Card.Title>Low operating cost</Card.Title>
                                    <Card.Text>
                                        To start your business online requires very low cost. You can start slling even with single product.
</Card.Text>
                                </Card.Body>
                            </Card>


                        </div>

                    </div>
                </div>
            </div>

        </React.Fragment>
    )




}

export default PageLayout(WhyUs);

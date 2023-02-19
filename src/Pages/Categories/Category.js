import React, { useEffect, useState } from 'react';
import PageLayout from '../../HOC/PageLayout';
import SeoTags from "../../Components/SEOTags/SeoTags";
import Axios from 'axios';
import { SITEGENAPIURL, LOGO_URL, SITEURL, SITETITLE } from "../../cons"
import "./category.scss"
import Loader from '../../Components/Loader/Loader';
import { NavLink } from 'react-router-dom';

const Page = (props) => {
    const [pageData, setPageData] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        Axios.get(`${SITEGENAPIURL}/getCategoryData/${props.match.params.catId}`).then(res => {
            window.scrollTo(0, 0)
            setPageData(res.data.data[0])
            setLoading(false)

        }).catch(err => {
            setLoading(false)
        })


    }, [props.match.params.slug])


    const jsonLdProps = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": props.match.url,
            "logo": LOGO_URL
        },

        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Sellers Home",
                "item": SITEURL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": pageData?.categoryName,
                "item": `${window.location.href}`
            }
            ]
        }
    ]
    const seoTags = {
        "pageTitle": pageData ? `Sell ${pageData?.categoryName} online in India` : SITETITLE,
        "PageMetaTitle": pageData ? `Sell ${pageData?.categoryName} online in India` : null,
        "pageMetaDesc": pageData ? `Looking to Sell ${pageData?.categoryName} online in India, DupPolin India is the right place to get started. AJIOKART charges lowest market place fee and give you full control to manage your products the way you want.` : null,
        pageType: "page",
        pageUrl: `${window.location.href}`,
        pageImage: `${SITEURL}${pageData && pageData.metaImage ? pageData.metaImage : LOGO_URL}`

    }


    return (

        <React.Fragment>
            <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />

            <div className="hygine-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">

                            {pageData && pageData.categoryName ? <h1>{pageData.categoryName}</h1> : null}

                            {pageData && pageData.categoryDescription ?
                                <div dangerouslySetInnerHTML={{ __html: pageData.categoryDescription }}></div> :
                                <div>
                                    <p>AJIOKART.com is a perfect market place, where you can sell your products related to {pageData?.categoryName} online at lowest market place fee.
                                </p>
                                    <p>
                                        Registration at AJIOKART is 100% free and you can list unlimited products. </p>
                                </div>
                            }

                            <div className="seller-box">
                                <h2>Start Selling online today</h2>
                                <h3>Tomorrow will never come</h3>

                                <NavLink to="/register" className="btn btn-danger btn-lg">Start Selling</NavLink>


                            </div>


                        </div>
                    </div>
                </div>

            </div>
            {loading && <Loader />}

        </React.Fragment >
    )


}

export default PageLayout(Page);

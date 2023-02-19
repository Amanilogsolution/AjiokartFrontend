import React, { useEffect, useState } from 'react';
import PageLayout from '../../HOC/PageLayout';
import SeoTags from "../../Components/SEOTags/SeoTags";
import Axios from 'axios';
import { SITEGENAPIURL, LOGO_URL, SITEURL, SITETITLE } from "../../cons"
//import "./page.scss"
import Loader from '../../Components/Loader/Loader';
import { NavLink } from 'react-router-dom';

const Categories = (props) => {
    const [pageData, setPageData] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        Axios.post(`${SITEGENAPIURL}/getCategoryData`).then(res => {
            window.scrollTo(0, 0)
            setPageData(res.data.data)
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
                "name":  "Products you can sell",
                "item": `${window.location.href}`
            }
            ]
        }
    ]
    const seoTags = {
        "pageTitle": pageData ? pageData.metaTitle : SITETITLE,
        "PageMetaTitle": pageData ? pageData.metaTitle : "Proucts in demand online",
        "pageMetaDesc": pageData ? pageData.metaDescription : null,
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
                            <h1>Product Categories at AJIOKART</h1>
                            <p>Being the growing market place in India, AJIOKART allows you to sell products under 4000+ categories. Below is the list of categories under which you can sell your products online. If you feel your product category is not aviable here and you will to sell at AJIOKART, Kindly contact seller support.</p>



                            <ul className="row">
                                {pageData?.map(el =>
                                    <li key={el.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <NavLink to={`sell-${el.categoryURL}-products-online/${el.id}`}>{el.categoryName}</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            {loading && <Loader />}

        </React.Fragment >
    )


}

export default PageLayout(Categories);

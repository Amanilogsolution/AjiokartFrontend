import React, { useEffect, useState } from 'react';
import PageLayout from '../../HOC/PageLayout';
import SeoTags from "../../Components/SEOTags/SeoTags";
import Axios from 'axios';
import { SITEGENAPIURL, LOGO_URL, SITEURL, SITETITLE } from "../../cons"
import "./page.scss"
import Loader from '../../Components/Loader/Loader';

const Page = (props) => {
    const [pageData, setPageData] = useState();
    const [loading, setLoading] =useState(false)
    useEffect(() => {

        setLoading(true)
        Axios.post(`${SITEGENAPIURL}/page/seller/${props.match.params.slug}`).then(res => {
            window.scrollTo(0, 0)
            setPageData(res.data)
            setLoading(false)

        }).catch(err=>{
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
                "name": pageData ? pageData.pageTitle : null,
                "item": `${window.location.href}`
            }
            ]
        }
    ]
    const seoTags = {
        "pageTitle": pageData ? pageData.metaTitle : SITETITLE,
        "PageMetaTitle": pageData ? pageData.metaTitle :null,
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
                            {pageData && pageData.pageTitle ? <h1>{pageData.pageTitle}</h1> : null}

                            {pageData && pageData.pageDescription ? <div dangerouslySetInnerHTML={{ __html: pageData.pageDescription }}></div> : null}
                        </div>
                    </div>
                </div>

            </div>
            {loading && <Loader/>}

        </React.Fragment >
    )


}

export default PageLayout(Page);

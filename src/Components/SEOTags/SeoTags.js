import React from "react";
import Helmet from "react-helmet"



const SeoTags =(props)=>{


    return(
        <React.Fragment>
            <Helmet>
             <title>{props.seoData.pageTitle}</title>
            <meta property="fb:app_id"          content="313942932581971" />
            <meta property="og:type"            content={props.seoData.pageType} />
            <meta property="og:url"             content={props.seoData.pageUrl} />
            <meta property="og:title"           content={props.seoData.PageMetaTitle} />
            <meta property="og:image"           content={props.seoData.pageImage} />
            <meta property="og:description"     content={props.seoData.PageMetaTitle}/>

            <meta name="twitter:card"           content={props.seoData.pageMetaDesc} />
            <meta name="twitter:site"           content="@AJIOKART" />

            <meta name="title"                  content={props.seoData.PageMetaTitle} />
            <meta name="description"            content={props.seoData.pageMetaDesc} />

            <script type="application/ld+json">
                    {JSON.stringify(props.jsonLdProps)}
            </script>
            </Helmet>


        </React.Fragment>
    )
}

export default SeoTags
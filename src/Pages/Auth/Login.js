import React, { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PageLayout from '../../HOC/PageLayout';
import LoginComponent from "../../Components/Login/Login";
import './Login.scss';
import SeoTags from "../../Components/SEOTags/SeoTags";
import { SITEURL,LOGINTITLE ,LOGINDESC} from '../../cons';
import * as actionCreator from "../../Store/actions/index"
const jsonLdProps = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": `${SITEURL}`,
        "logo": `${SITEURL}/icons/logo512.png`
    },

    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": `Sellers Home`,
            "item": `${SITEURL}`
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name":`Login at AJIOKART`,
            "item":  `${window.location.href}`
        }
        ]
    }
]
const seoTags = {
    "pageTitle":`${LOGINTITLE}`,
    "PageMetaTitle": `${LOGINTITLE}`,
    "pageMetaDesc": `${LOGINDESC}`,
    pageType: "page",
    pageUrl:  `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

}
const Login = () => {
    const history = useNavigate();
    const dispatch = useDispatch()
    const { isAuthenticated, isSellerActive } = useSelector(state => state.login);



    useEffect(()=>{
        dispatch(actionCreator.clearError())
    },[dispatch])
    useEffect(() => {

        if (isAuthenticated && isSellerActive) {
            history("/dashboard")

        }else if(isAuthenticated && !isSellerActive){
          history("/business-info")
        }

    }, [isAuthenticated,history,isSellerActive])

    return (

        <>
            <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
            {isAuthenticated ? <Navigate to="/dashboard"></Navigate> :null}

            <div className="login-page">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col col-12 col-sm-12 col-md-6 col-lg-5">

                            <LoginComponent />




                        </div>
                        <div className="col col-12 col-md-6 col-lg-7 left">

                            <h1>Join India’s Growing marketplace</h1>
                            <h2>Start selling your products to crores of customers across country</h2>


                            <p>Complete your free registration here and start selling in less than 5 minutes!</p>

                        </div>
                    </div>
                </div>
            </div>
        </ >
    )


}

export default PageLayout(Login);

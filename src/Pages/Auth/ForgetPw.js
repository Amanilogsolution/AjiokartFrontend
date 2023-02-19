import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';

import PageLayout from '../../HOC/PageLayout';
import './Register.scss';
import { FORGETPWDESC, FORGETPWTITLE, SITEAPIURL } from "../../cons"
import Loader from '../../Components/Loader/Loader';
import SeoTags from "../../Components/SEOTags/SeoTags";
import { SITEURL } from '../../cons';
import useErrorHandler from '../../Hooks/HandleError';
const seoTags = {
    "pageTitle": `${FORGETPWTITLE}`,
    "PageMetaTitle": `${FORGETPWTITLE}`,
    "pageMetaDesc": `${FORGETPWDESC}`,
    pageType: "page",
    pageUrl: `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

}

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
            "name": `Login at AJIOKART}`,
            "item": `${SITEURL}/login`
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": `Forget Password`,
            "item": `${window.location.href}`
        }
        ]
    }
]

const ForgetPw = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [success, setSuccess] = useState()
    const [resMessage, setMessage] = useState()
    const password = useRef({});
    const [loader, setLoader] = useState(false)
    password.current = watch("password", "");
    const [ErrorHandler, ShowSuccess] = useErrorHandler()



    const onSubmit = data => {
        setSuccess(null)
        setLoader(true)

        Axios.post(`${SITEAPIURL}/forget-password`, data).then(res => {
            setMessage(res.data.message)
            ShowSuccess(res.data.message)
            setSuccess(true)
            setLoader(false)

        }).catch(err => {
            ErrorHandler(err)
            setMessage(err.response?.data?.message)
            setLoader(false)
        })

    }



    return (
        <React.Fragment>
            <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
            <div className="register">
                <div className="banner">
                    <div className="container" >
                        <div className="row align-items-center">
                            <div className="col col-12 left text-center">

                                <h1>It's ok, we all forget sometimes</h1>
                                <h2>Reset your password here</h2>
                            </div>
                            <div className="col col-12">
                                <form onSubmit={handleSubmit(onSubmit)} style={{ "maxWidth": 500, "margin": "0 auto" }}>
                                    <h2>Type your email</h2>


                                    <div className="form-group">

                                        <input
                                            type="email"
                                            className={`form-control ${errors?.password ? "is-invalid " : " "}`}
                                            aria-label="Type your registered Email"
                                            placeholder="Email"
                                            id="email"
                                            name="email"
                                            autoComplete="false"
                                            {...register('email', {
                                                required: true,
                                                pattern: {
                                                    value: 8,
                                                    message: "Password must have minimum 8 characters"
                                                }
                                            })}
                                            // ref={register({
                                            //     required: "This field is required",
                                            //     minLength: {
                                            //         value: 8,
                                            //         message: "Password must have minimum 8 characters"
                                            //     }

                                            // })}
                                        />
                                        <span className="text-danger">
                                            {errors?.password && errors?.password.message}
                                        </span>
                                    </div>


                                    {resMessage &&
                                        <p className={success ? 'text-success' : 'text-danger'}>{resMessage}</p>}

                                    <button type="submit"

                                        className="btn btn-primary d-block">Reset Password</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {loader && <Loader />}

        </React.Fragment>
    )



}

export default PageLayout(ForgetPw)

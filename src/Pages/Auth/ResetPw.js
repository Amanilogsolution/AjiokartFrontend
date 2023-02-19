import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';

import PageLayout from '../../HOC/PageLayout';
import './Register.scss';
import { SITEAPIURL } from "../../cons"
import Loader from '../../Components/Loader/Loader';
import SeoTags from "../../Components/SEOTags/SeoTags";
import { SITEURL, RESETPWTITLE, RESETPWRDESC } from '../../cons';
import useErrorHandler from '../../Hooks/HandleError';
import { NavLink } from 'react-router-dom';

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
            "name": `Reset Password`,
            "item":  `${window.location.href}`
        }
        ]
    }
]
const seoTags = {
    "pageTitle": `${RESETPWTITLE}`,
    "PageMetaTitle": `${RESETPWTITLE}`,
    "pageMetaDesc": `${RESETPWRDESC}`,
    pageType: "page",
    pageUrl:  `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

}
const ResetPw = (props) => {
    const [ErrorHandler, ShowWarning,ShowSuccess]=useErrorHandler()
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    const [loader, setLoader] = useState(false)
    password.current = watch("password", "");
    const [compState, setCompState]=useState({
        successMessage:""
    })



    const onSubmit = data => {
        data.token = props.match.params.token;
        setLoader(true)

        Axios.post(`${SITEAPIURL}/reset-password`, data).then(res => {
            ShowSuccess(res.data.message)
            setCompState(compState=>({...compState,successMessage: res.data.message}))
            setLoader(false)
        }).catch(err => {
            ErrorHandler(err)
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

                                <h1>Reset your password here</h1>
                            </div>
                            <div className="col col-12">
                                <form onSubmit={handleSubmit(onSubmit)} style={{ "maxWidth": 500, "margin": "0 auto" }}>
                                    <h2>Reset your password</h2>


                                    <div className="form-group">

                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? "is-invalid " : " "}`}
                                            aria-label="New password"
                                            placeholder="New Password"
                                            id="password"
                                            name="password"
                                            autoComplete="false"
                                            ref={register({
                                                required: "This field is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must have minimum 8 characters"
                                                }

                                            })}
                                        />
                                        <span className="text-danger">
                                            {errors.password && errors.password.message}
                                        </span>
                                    </div>
                                    <div className="form-group">

                                        <input
                                            autoComplete="false"
                                            type="password"
                                            aria-label="confirm new password"
                                            className={`form-control ${errors.confirmPassword ? "is-invalid " : " "}`}
                                            placeholder="Confirm New Password"
                                            aria-describedby="confirm new password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            ref={register({
                                                required: "This field is required",
                                                validate: value =>
                                                    value === password.current || "The passwords do not match"
                                            })}
                                        />
                                        <span className="text-danger">
                                            {errors.confirmPassword && errors.confirmPassword.message}
                                        </span>
                                    </div>

                                    {compState.successMessage? <p className="text-success">{compState?.successMessage}</p>:null}

                                    <button type="submit"

                                        className="btn btn-primary d-block">Update Password</button>
                                </form>

                                <div className="text-center mt-5"><NavLink className="btn btn-link" to="/login">Back To Login</NavLink></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {loader && <Loader />}

        </React.Fragment>
    )



}

export default PageLayout(ResetPw)

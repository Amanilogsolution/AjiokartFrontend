import React, { useRef, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

import PageLayout from '../../HOC/PageLayout';
import './Register.scss';
import * as actionCreator from "../../Store/actions/index"
import Popup from '../../UI/Modal/Modal';
import { SITEGENAPIURL } from "../../cons"
import { useNavigate } from 'react-router-dom';

import SeoTags from "../../Components/SEOTags/SeoTags";
import { SITEURL, REGISTERDESC, REGISTERTITLE } from '../../cons';
import useErrorHandler from '../../Hooks/HandleError';
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
      "name": `Become a seller`,
      "item": `${window.location.href}`
    }
    ]
  }
]
const seoTags = {
  "pageTitle": `${REGISTERTITLE}`,
  "PageMetaTitle": `${REGISTERTITLE}`,
  "pageMetaDesc": `${REGISTERDESC}`,
  pageType: "page",
  pageUrl: `${window.location.href}`,
  pageImage: `${SITEURL}/icons/logo512.png`

}
const Register = (props) => {
  const [ErrorHandler] = useErrorHandler()
  const [formError, setFormError] = useState([])
  const { error, isAuthenticated, isSellerActive } = useSelector(state => state.login);
  const [showTNCModal, setSHowTNCModal] = useState(false)
  const [TNC, setTNC] = useState(null)
  const dispatch = useDispatch();
  const history = useNavigate();
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  useEffect(() => {
    dispatch(actionCreator.clearError())
  }, [dispatch])

  useEffect(() => {

    if (error) {
      let errorMessage= []

      Object.values(error.response.data.validationErrors).forEach(el => {
        errorMessage.push(el[0])
      })
      setFormError(errorMessage)
      ErrorHandler(error)
    }

  }, [error])

  useEffect(() => {


    if (isAuthenticated && isSellerActive) {
      history("/dashboard")

    } else if (isAuthenticated && !isSellerActive) {
      history("/business-info")
    }

  }, [isAuthenticated, isSellerActive, history])

  const onSubmit = data => {
    dispatch(actionCreator.register(data))
  }
  const ShowTNC = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!TNC) {
      Axios.post(`${SITEGENAPIURL}/page/seller/terms-of-use`).then(res => {

        setTNC(res.data)

      })
    }
    setSHowTNCModal(!showTNCModal)
  }


  return (
    <>
      <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
      <div className="register">
        <div className="banner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col col-12 col-sm-12 col-md-6 col-lg-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>Create your Seller Account</h2>
                  <input type="text" hidden name="countryCode" defaultValue="91'" ref={register()} />
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control ${errors?.email ? "is-invalid " : " "}`}
                      aria-label="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      id="email"
                      name="email"

                      {...register('email', {
                            required: true,
                            pattern: {
                              value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                          message: "Please enter a valid email"
                            }
                        })}
                      // ref={register({
                      //   required: "Please enter your email",
                      //   pattern: {
                      //     value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                      //     message: "Please enter a valid email"
                      //   }

                      // })}
                    />

                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    {errors?.email &&
                      errors?.email.type === "required" && <span className="text-danger">This field is required</span>}
                    {errors?.email &&
                      errors?.email.type === "pattern" && <span className="text-danger">Please enter a valid email</span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <input type="hidden"
                        {...register("countryCode",{})}
                        //  ref={register({})}
                          name="countryCode" value="91" />
                        <span className="input-group-text" id="mobile-number">+91</span>
                      </div>
                      <input
                        type="text"
                        className={`form-control ${errors?.mobile ? "is-invalid " : " "}`}
                        placeholder="Mobile"
                        aria-label="mobile"
                        aria-describedby="mobile-number"

                        id="mobile"
                        name="mobile"
                        // ref={register({
                        //   required: "This field is required",
                        //   minLength: {
                        //     value: 10,
                        //     message: "Mobile number should have 10 digits"
                        //   },
                        //   maxLength: {
                        //     value: 10,
                        //     message: "Mobile number should not have more then 10 digits"
                        //   }
                        // })}

                        {...register("mobile",{
                      required:true,
                        minLength: {
                            value: 10,
                            message: "Mobile number should have 10 digits"
                          },
                          maxLength: {
                            value: 10,
                            message: "Mobile number should not have more then 10 digits"
                          }
                    })}
                      />
                      <span className="text-danger">
                        {errors?.mobile && errors.mobile?.message}
                      </span>
                    </div>

                  </div>

                  <div className="form-group">

                    <input
                      type="password"
                      className={`form-control ${errors?.password ? "is-invalid " : " "}`}
                      aria-label="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      autoComplete="false"
                      // ref={register({
                      //   required: "This field is required",
                      //   minLength: {
                      //     value: 8,
                      //     message: "Password must have minimum 8 characters"
                      //   }

                      // })}

                      {...register("password",{
                      required:true,
                           minLength: {
                          value: 8,
                          message: "Password must have minimum 8 characters"
                        }
                    })}
                      
                    />
                    <span className="text-danger">
                      {errors?.password && errors?.password.message}
                    </span>
                  </div>
                  <div className="form-group">

                    <input
                      autoComplete="false"
                      type="password"
                      aria-label="confirm password"
                      className={`form-control ${errors?.confirmPassword ? "is-invalid " : " "}`}
                      placeholder="Confirm Password"
                      aria-describedby="confirm password"
                      id="confirmPassword"
                      name="confirmPassword"
                      // ref={register({
                      //   required: "This field is required",
                      //   validate: value =>
                      //     value === password.current || "The passwords do not match"
                      // })}
                      {...register("termsAndCondition",{
                      required:true,
                       validate: value =>
                          value === password.current || "The passwords do not match"
                    })}
                    />
                    <span className="text-danger">
                      {errors?.confirmPassword && errors?.confirmPassword.message}
                    </span>
                  </div>
                  <label className='mb-3'><input
                    type="checkbox"
                    name="termsAndCondition"
                    id="termsAndCondition"
                    // ref={register({ required: true })}
                    {...register("termsAndCondition",{
                      required:true
                    })}
                  /> By filling this form, I agree to <a href="/" onClick={e => ShowTNC(e)}>Terms of Use</a></label>
                  {errors?.termsAndCondition ? <span className="text-danger"> Please accept terms and conditions</span> : ""}

                  {formError.map((el,i)=><p  key={i}className="text-danger mb-0">{el}</p>)}


                  <button type="submit"

                    className="btn btn-danger btn-lg d-block">Create Account</button>
                </form>
              </div>
              <div className="col col-12 col-sm-12 col-md-6 col-lg-7 left">

                <h1>Join India’s Growing marketplace</h1>
                <h2>Start selling your products to crores of customers across country</h2>


                <p>Complete your free registration here and start selling in less than 5 minutes!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTNCModal && <Popup heading={TNC ? TNC.pageTitle : "Terms of Usage"}
        showModal={showTNCModal} showModalFunction={(e) => ShowTNC(e)}>

        <div dangerouslySetInnerHTML={{ __html: TNC ? TNC.pageDescription : "" }} className="tncoverlay"></div>
      </Popup>
      }
    </>
  )



}

export default PageLayout(Register)

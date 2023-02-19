import React from 'react';
import { useForm } from "react-hook-form";
const GoogleCaptcha = ({ updataConfigData, superSiteConfigs }) => {
    const { handleSubmit, errors, register } = useForm();

    const onSubmit = data => {
        updataConfigData(data)

    }


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                <h2 className="panel-heading">Google Captcha Keys</h2>
                <div className="panel-body pt-3">
                    <p className="mb-1">Any form at your super site will not work, until you submit these keys.</p>
                    <p className="mb-4">Generate reCaptcha V2 Keys <a href="https://www.google.com/recaptcha/admin/create" target="_blank" rel="noopener noreferrer" >here</a></p>
                    <div className="form-group">
                    <div className="row">
                            <label htmlFor="recaptchaKey" className="col-12 col-sm-3 col-md-3">Google reCAPTCHA SITE KEY</label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className={`form-control ${errors.recaptchaKey ? "is-invalid " : " "}`}
                                    id="recaptchaKey"
                                    placeholder="Google reCAPTCHA SITE KEY"
                                    name="recaptchaKey"
                                    defaultValue={superSiteConfigs.recaptchaKey}
                                    ref={register({
                                        required: "Please enter reCaptcha Key"
                                    })}

                                />

                                <span className="text-danger">
                                    {errors.recaptchaKey && errors.recaptchaKey.message}
                                </span>
                            </div>
                        </div>
                        </div>
                        <div className="form-group">

                        <div className="row">
                            <label htmlFor="recaptchaSecretKey" className="col-12 col-sm-3 col-md-3">Google reCAPTCHA SECRET KEY</label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className={`form-control ${errors.siteTitle ? "is-invalid " : " "}`}
                                    id="recaptchaSecretKey"
                                    placeholder="Google reCAPTCHA SECRET KEY"
                                    name="recaptchaSecretKey"
                                    defaultValue={superSiteConfigs.recaptchaSecretKey}
                                    ref={register({
                                        required: "Please enter reCaptcha secret key"
                                    })}

                                />

                                <span className="text-danger">
                                    {errors.recaptchaSecretKey && errors.recaptchaSecretKey.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 offset-md-3 col-md-9">
                                <button type="submit" className="btn btn-danger btn-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </React.Fragment >
    )





}

export default GoogleCaptcha;

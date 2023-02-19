import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../../HOC/DashboardLayout";
import Axios from 'axios';
import { SITEAPIURL, ToastConfig } from '../../../cons';
import Loader from "../../Loader/Loader";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify"
import useResponseHandler from '../../../Hooks/HandleError';

const WebmasterTool = () => {
    const [ErrorHandler] =useResponseHandler()
    const [brandingData, setBrandingData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        Axios.get(`${SITEAPIURL}/webmaster`).then(res => {

            setBrandingData(res.data)
            setLoading(false)
        }, err => {
            ErrorHandler(err)
            toast.error(err?.response?.message|| "Request Failed", ToastConfig);
            setLoading(false)
        })
    }, [])

    const updataData = (data) => {

        setLoading(true)
        Axios.post(`${SITEAPIURL}/webmaster`, data)
            .then(res => {
                toast.success(res?.message|| "Webmaster Settings has been updated", ToastConfig);
                setLoading(false)
            })
            .catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })

    }
    const { handleSubmit, register } = useForm();

    const onSubmit = data => {

        updataData(data)

    }
    return (
        <React.Fragment>
            <h1 className="sticky-head">Webmaster Tools</h1>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="panel-body pt-5">

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="googleAnalytics" className="col-12 col-sm-3 col-md-3">Google Analytics ID: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className="form-control"
                                    id="googleAnalytics"
                                    placeholder="Google analytics ID"
                                    name="googleAnalyticsId"
                                    defaultValue={brandingData?.googleAnalyticsId}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="googleVerificationCode" className="col-12 col-sm-3 col-md-3">Google Verification Code: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className="form-control"
                                    id="googleVerificationCode"
                                    placeholder="Google Verification Code:"
                                    name="googleVerificationCode"
                                    defaultValue={brandingData?.googleVerificationCode}
                                    ref={register()}

                                />

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="bingVerificationCode" className="col-12 col-sm-3 col-md-3">Bing Verification Code: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className="form-control"
                                    id="bingVerificationCode"
                                    placeholder="Bing Verification Code:"
                                    name="bingVerificationCode"
                                    defaultValue={brandingData?.bingVerificationCode}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="pinterestVerificationCode" className="col-12 col-sm-3 col-md-3">Pinterest Verification Code: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className="form-control"
                                    id="pinterestVerificationCode"
                                    placeholder="Pinterest Verification Code:"
                                    name="pinterestVerificationCode"
                                    defaultValue={brandingData?.pinterestVerificationCode}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="yandexVerificationCode" className="col-12 col-sm-3 col-md-3">Yandex  Verification Code: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className="form-control"
                                    id="yandexVerificationCode"
                                    placeholder="Yandex Verification Code:"
                                    name="yandexVerificationCode"
                                    defaultValue={brandingData?.yandexVerificationCode}
                                    ref={register()}

                                />
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


            {loading ? <Loader /> : null}

        </React.Fragment >
    )





}

export default DashboardLayout(WebmasterTool);

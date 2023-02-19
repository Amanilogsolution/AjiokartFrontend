import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../../HOC/DashboardLayout";
import SocialInfo from './parts/SocialInfo'
import Axios from 'axios';
import { SITEAPIURL, ToastConfig } from '../../../cons';
import Loader from "../../Loader/Loader";
import {toast} from "react-toastify"
import useResponseHandler from '../../../Hooks/HandleError';

const SocialNetworks = () => {
    const [ErrorHandler] = useResponseHandler()
    const [brandingData, setBrandingData] = useState([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        setLoading(true)
        Axios.get(`${SITEAPIURL}/soicalMedia`).then(res => {
            setBrandingData(res.data)
            setLoading(false)
        }, err => {
            ErrorHandler(err)
            setLoading(false)
        })
    }, [])

    const updataData = (data) => {

        setLoading(true)
        Axios.post(`${SITEAPIURL}/soicalMedia`, data)
            .then(res => {
                toast.success("Social media settings has been updated", ToastConfig);
                setLoading(false)
            })
            .catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })

    }

    return (
        <>
            <h1 className="sticky-head">Social Networks</h1>

            <SocialInfo updataData={updataData} brandingData={brandingData} />


            {loading ? <Loader /> : null}

        </>
    )





}

export default DashboardLayout(SocialNetworks);

import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../../HOC/DashboardLayout";
import SiteBranding from './parts/SiteBranding';
import SetPrimaryDomain from './parts/SetPrimaryDomain';
import SetSubdomain from './parts/SetSubdomain';
import SiteCarousel from './parts/SiteCarousel';
import Axios from 'axios';
import { SITEAPIURL, ToastConfig } from '../../../cons';
import Loader from "../../Loader/Loader"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import GoogleCaptcha from './parts/GoogleCaptcha';
import useResponseHandler from "../../../Hooks/HandleError"
import { toast } from "react-toastify";

const SiteSettings = () => {
    const [ErrorHandler]=useResponseHandler()
    const [brandingData, setBrandingData] = useState([])
    const [categoryMenu, setCategoryMenu] = useState([])


    const [superSiteConfigs, setSuperSiteConfigs] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        Axios.get(`${SITEAPIURL}/superSiteSettings`).then(res => {
            setBrandingData(res.data.data[0])
            setCategoryMenu(res.data.categoryMenu)
            setLoading(false)
        }, err => {
            ErrorHandler(err)
            setLoading(false)
        })
    }, [])



    const updataData = (data) => {
        setBrandingData({...brandingData,...data})

        setLoading(true)
        Axios.post(`${SITEAPIURL}/superSiteSettings`, data)
            .then(res => {
                toast.success("Super Site Settings has been successfully updated", ToastConfig);
                setLoading(false)
            })
            .catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })

    }
    useEffect(() => {
        setLoading(true)
        Axios.get(`${SITEAPIURL}/superSiteConfig`).then(res => {
            setSuperSiteConfigs(res.data.data)
            setLoading(false)
        }, err => {
            ErrorHandler(err)
            setLoading(false)
        })
    }, [])
    const updataConfigData = (data) => {


        setLoading(true)
        Axios.post(`${SITEAPIURL}/superSiteConfig`, data)
            .then(res => {
                toast.success("Super Site Settings has been successfully updated", ToastConfig);
                setLoading(false)
            })
            .catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })

    }

    return (
        <React.Fragment>

            <h1 className="sticky-head">General Settings</h1>
            <div style={{ margin: "-15px -15px 30px", padding: "15px" }}>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="fullwidth">
                    <Tab eventKey="home" title="Site Settings">
                        <SetSubdomain updataData={updataData} brandingData={brandingData} />
                        {/* <SetPrimaryDomain updataData={updataData} brandingData={brandingData} /> */}
                        <GoogleCaptcha updataConfigData={updataConfigData} superSiteConfigs={superSiteConfigs} />
                    </Tab>
                    <Tab eventKey="profile" title="Branding Settings" disabled={typeof brandingData === 'undefined'}>
                        <SiteBranding updataData={updataData} brandingData={brandingData} />
                    </Tab>
                    <Tab eventKey="contact" title="Hero Slider" disabled={typeof brandingData === 'undefined'}>
                        <SiteCarousel brandingData={brandingData} categoryMenu={categoryMenu} />
                    </Tab>
                </Tabs>
            </div>

            {/* <SetSubdomain updataData={updataData} brandingData={brandingData}/>
            <SetPrimaryDomain updataData={updataData} brandingData={brandingData}/>
            <SiteBranding updataData={updataData} brandingData={brandingData} />
            <SiteCarousel brandingData={brandingData}/> */}




            {loading ? <Loader /> : null}

        </React.Fragment >
    )





}

export default DashboardLayout(SiteSettings);

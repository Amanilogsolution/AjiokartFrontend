import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../../HOC/DashboardLayout";
import Form from 'react-bootstrap/Form'
import { SITEAPIURL } from '../../../cons';
import Loader from "../../Loader/Loader"
import Axios from 'axios';
import "./feature-manager.scss"

import useResponseHandler from "../../../Hooks/HandleError"

const FeatureManager = () => {
    const [ErrorHandler]=useResponseHandler()
    const [features, setFeatures] = useState(
        {
            superSiteActive: false,
            ecommerceMode: false,
            isBinEnabled: false,
            isGAEnabled: false,
            isContactFormEnabled: false,
            isBulkEnquiryEnabled: false,
            isFooterSocialLinkEnabled: false
        }
    )
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        Axios.get(`${SITEAPIURL}/features`).then(res => {
            setFeatures(features => ({ ...features, ...res.data }))
            setLoading(false);

        }, err => {
            setLoading(false)
        })
    }, [])


    const handleSwitch = (e, field) => {
        let el = e.target.parentElement.parentElement;
        el.classList.add("loading")
        let obj = {};
        obj[field] = e.target.checked;
        Axios.post(`${SITEAPIURL}/features`, obj)
            .then(res => {
                setFeatures({ ...features, ...obj })
                setLoading(false)
                el.classList.remove("loading")

            })
            .catch(err => {
                ErrorHandler(err)
                setLoading(false)
                el.classList.remove("loading")
            })
    }

    return <>
        <h1 className="sticky-head">Feature  Manager</h1>
        <div className="panel-body">
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr><th scope="col">Feature</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><p>Super Site (Free)</p>
                        </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id="superSiteActive"
                                    checked={+features.superSiteActive}
                                    name="superSiteActive"
                                    label={features.superSiteActive ? "Active" : "Inactive"}
                                    onChange={(e) => handleSwitch(e, "superSiteActive")}
                                />
                            </td>
                        </tr>

                        <tr><td><p>Ecommerce Mode (₹ 500 Per Month)</p>
                            <small>Comming Soon</small>
                        </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id="superSiteMode"
                                    checked={+features.ecommerceMode}
                                    name="ecommerceMode"
                                    label={features.ecommerceMode ? "Active" : "Inactive"}
                                    disabled
                                    onChange={(e) => handleSwitch(e, "ecommerceMode")}
                                />
                            </td>
                        </tr>
                        <tr><td><p className="mb-0">Buy it now widget (Free)</p>
                        </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id="isBinEnabled"
                                    checked={+features.isBinEnabled}
                                    name="isBinEnabled"
                                    label={features.isBinEnabled ? "Active" : "Inactive"}
                                    onChange={(e) => handleSwitch(e, "isBinEnabled")}
                                /></td>
                        </tr>
                        <tr><td><p>Google Analytics (Free)</p>
                        </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id="isGAEnabled"
                                    checked={+features.isGAEnabled}
                                    name="isGAEnabled"
                                    label={features.isGAEnabled ? "Active" : "Inactive"}
                                    onChange={(e) => handleSwitch(e, "isGAEnabled")}
                                />
                            </td>
                        </tr>
                        <tr><td><p className="mb-0">Contact Form (₹ 0.50 Per Enquiry)</p>
                        </td>
                            <td>  <Form.Check
                                type="switch"
                                checked={+features.isContactFormEnabled}
                                id="isContactFormEnabled"
                                name="isContactFormEnabled"
                                label={features.isContactFormEnabled ? "Active" : "Inactive"}
                                onChange={(e) => handleSwitch(e, "isContactFormEnabled")}
                            /></td>
                        </tr>

                        <tr><td><p>Bulk Enquiry Form (₹ 1 Per Enquiry)</p>
                        </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={+features.isBulkEnquiryEnabled}
                                    id="isBulkEnquiryEnabled"
                                    name="isBulkEnquiryEnabled"
                                    label={features.isBulkEnquiryEnabled ? "Active" : "Inactive"}
                                    onChange={(e) => handleSwitch(e, "isBulkEnquiryEnabled")}
                                /></td>
                        </tr>

                        <tr><td><p>Enable Social Links at footer (Free)</p>
                        </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={+features.isFooterSocialLinkEnabled}
                                    id="isFooterSocialLinkEnabled"
                                    name="isFooterSocialLinkEnabled"
                                    label={features.isFooterSocialLinkEnabled ? "Active" : "Inactive"}
                                    onChange={(e) => handleSwitch(e, "isFooterSocialLinkEnabled")}
                                /></td>
                        </tr>

                    </tbody>
                </table>
            </div>
            {loading ? <Loader /> : null}
        </div>

    </>
}

export default DashboardLayout(FeatureManager);
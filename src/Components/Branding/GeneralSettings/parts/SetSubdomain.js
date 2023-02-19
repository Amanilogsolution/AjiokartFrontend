import React, { useState, useEffect } from 'react';

import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { DOMAIN } from '../../../../cons';

const SetSubdomain = ({ updataData, brandingData }) => {
    const { handleSubmit, errors, register } = useForm();
    const { sellerId } = useSelector(state => state.login.userData);
    const [subdomain, setSubdomain] = useState();

    const onSubmit = data => {
        updataData(data)

    }
    useEffect(() => {
        setSubdomain(brandingData?.subDomain || sellerId)
    }, [brandingData,sellerId])


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                <h2 className="panel-heading">Partially-Branded URL</h2>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="row">
                            <p className="col-12">Your Customers can access the SuperSite 2 with this partially-branded URL:</p>
                            <label htmlFor="subDomain" className="visually-hidden">Partially-Branded Subdomain URL</label>

                            <div className="col-12 col-sm-7 col-md-6">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend d-none d-sm-block">
                                        <div className="input-group-text">https://</div>
                                    </div>
                                    <input type="text" className="form-control" id="subDomain" placeholder="your-company"
                                        name="subDomain"
                                        defaultValue={subdomain}
                                        ref={register({
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[A-Za-z0-9]+$/,
                                                message: "No special characters allowed"
                                            }
                                        })} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">.{DOMAIN}</div>
                                    </div>
                                </div>
                                {errors.subDomain ? <span className="text-danger mb-1">{errors.subDomain.message}  </span> : null}
                            </div>
                            <div className="col-12 col-sm-5 col-md-5">
                                <button type="submit" className="btn btn-primary me-2">Update</button>
                                <a href={`https://${subdomain}.${DOMAIN}`} target="_blank" rel="noopener noreferrer" className="btn btn-link">Visit Site</a>
                            </div>

                        </div>
                    </div>
                </div>
            </form>


        </React.Fragment >
    )





}

export default SetSubdomain;

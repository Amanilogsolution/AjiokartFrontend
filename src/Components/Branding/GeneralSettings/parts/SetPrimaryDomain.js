import React from 'react';
import { useForm } from "react-hook-form";

const SetPrimaryDomain = ({ updataData, brandingData }) => {
    const { handleSubmit, errors, register } = useForm();

    const onSubmit = data => {
        updataData(data)
    }


    return (
        <React.Fragment>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                <h2 className="panel-heading">Fully-Branded URL</h2>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="row">
                            <p className="col-12">Let your Customers access the SuperSite with your own Branded Domain Name.</p>
                            <label htmlFor="primaryDomain" className="visually-hidden">Fully Branded Domain URL</label>

                            <div className="col-12 col-sm-9 col-md-6 mb-3">
                                <label className="font-weight-bold">Step 1 : Specify your Primary Domain Name</label>


                                <input type="text" className="form-control" id="primaryDomain" placeholder="your-company"
                                    name="primaryDomain"
                                    defaultValue={brandingData?.primaryDomain}
                                    ref={register({
                                        required: "This field is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
                                            message: "Please enter a valid domain name"
                                        }
                                    })} />
                                <small id="emailHelp" className="form-text text-muted">Eg. www.yourcompany.com, yourcompany.net. Do not use http:// or https://</small>

                                {errors.primaryDomain ? <span className="text-danger mb-1">{errors.primaryDomain.message}  </span> : null}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-9 col-md-6">
                                <label className="font-weight-bold">Step 2 : Specify your Primary Domain Name</label>
                                <p>Update the A record in your nameservers for your fully branded URL(s) to 209.99.17.71</p>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-9 col-md-6">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>


        </React.Fragment >
    )





}

export default SetPrimaryDomain;

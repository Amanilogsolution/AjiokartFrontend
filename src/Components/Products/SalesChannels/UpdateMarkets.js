
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { SITEAPIURL } from '../../../cons';
import useResponseHandler from "../../../Hooks/HandleError";

const UpdateMarkets = ({ currentEditing, QuickupdateData }) => {
    const [ErrorHandler] = useResponseHandler()
    const { handleSubmit, errors, register } = useForm();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const onSubmit = (data) => {
        setLoading(true)
        let mergedData ={...currentEditing, ...data}

        Axios.put(`${SITEAPIURL}/updateMarketMapping`, mergedData)
            .then(res => {

                QuickupdateData({...currentEditing, ...data})
                setLoading(false)


            }, err => {
                ErrorHandler(err)
               // setError(true)
                setLoading(false)
            })
    }
    return (
        <React.Fragment>


            <form onSubmit={handleSubmit(onSubmit)} className="form-inline">

                <label className="d-block mb-3 mb-sm-0 me-1" htmlFor="input">Update Value </label>
                <input id="input" type="text" className={`form-control me-2`}
                    placeholder={"Identifier"}
                    ref={register(
                        {
                            required: "This is required",

                        }
                    )}
                    name="identifier"


                    defaultValue={currentEditing?.value} />

                {loading ? <div className="spinner"></div> : <button type="submit" className="btn btn-primary">Update</button>}
            </form>
            {errors.identifier ? <p className="text-danger mt-1">{errors.identifier.message}</p> : null}


        </React.Fragment>
    )


}

export default UpdateMarkets;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { SITEAPIURL } from '../../../cons';
import useResponseHandler from "../../../Hooks/HandleError";

const QuickUpdate = ({ currentEditing, QuickupdateData }) => {
    const [ErrorHandler]=useResponseHandler()
    const { handleSubmit, errors, register } = useForm();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const onSubmit = (data) => {
        setLoading(true)
        setError(false)
        data.SKU = currentEditing.sku;
        data.din = currentEditing.din;

        Axios.put(`${SITEAPIURL}/quickUpdate`, data)
            .then(res => {

                QuickupdateData(data)
                setLoading(false)



            }, err => {
                ErrorHandler(err)
                setError(true)
                setLoading(false)
            })
    }
    return (
        <React.Fragment>


            <form onSubmit={handleSubmit(onSubmit)} className="form-inline">


                <label className="d-block mb-3" htmlFor="input">Update {currentEditing.type === "mrp" ? "MRP" : currentEditing.type === "sellingPrice" ? "Selling Price" : "Inventory"} for SKU: {currentEditing.sku}, DIN: {currentEditing.din}</label>
                <input id="input" type="number" className={`form-control me-2`}
                    placeholder={currentEditing.type === "mrp" ? "MRP" : currentEditing.type === "sellingPrice" ? "Selling Price" : "Inventory"}
                    ref={register(
                        {
                            required: "This is required",
                            validate: val => {
                                if ((currentEditing.type==="mrp") && (+val < +currentEditing.sellingPrice)){
                                    return false || "MRP could not be lesser then selling price."
                                }
                                if ((currentEditing.type==="sellingPrice") && (+val > +currentEditing.mrp)){
                                    return false || "Selling price could not be higher then MRP."
                                }

                                return true
                            }
                        }
                    )}


                    defaultValue={currentEditing.type === "mrp" ? currentEditing.mrp : currentEditing.type === "sellingPrice" ? currentEditing.sellingPrice : currentEditing.currentValue}
                    name={currentEditing.type} />


                {loading ? <div className="spinner"></div> : <button type="submit" className="btn btn-primary">Update</button>}
            </form>
            {errors[currentEditing.type] ? <p className="text-danger mt-1">{errors[currentEditing.type].message}</p> : null}
            {error ? <span className="text-danger mt-1">Failed to update data</span> : null}

            <p className="my-3 text-muted">Your changes may take upto 30 mins to refelct on site.</p>


        </React.Fragment>
    )


}

export default QuickUpdate;
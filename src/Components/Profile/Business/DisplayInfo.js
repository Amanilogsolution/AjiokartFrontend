import React  from "react";
import { useForm } from "react-hook-form";


const DisplayInfoForm = ({sellerInfo, updateData}) => {

    const { handleSubmit, errors, register } = useForm();
    const onSubmit = data => {
        updateData(data)
    };
    return (
        <>

<form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="businessDisplayName" className="col-12 ">Business Display Name: </label>

                                <div className="col-12">
                                    <input type="text"
                                        className={`form-control ${errors.businessDisplayName ? "is-invalid " : " "}`}
                                        id="businessDisplayName"
                                        placeholder="Business Display Name:"
                                        name="businessDisplayName"
                                        defaultValue={sellerInfo.businessDisplayName?sellerInfo.businessDisplayName:""}
                                        ref={register({
                                            required: "This field is required",

                                        })}
                                    />
                                    <span className="text-danger">
                                        {errors.businessDisplayName && errors.businessDisplayName.message}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="businessDisplayDescription" className="col-12 ">Business Description: </label>

                                <div className="col-12">
                                    <textarea
                                        className={`form-control ${errors.businessDisplayDescription ? "is-invalid " : " "}`}
                                        id="businessDisplayDescription"
                                        placeholder="Business Description:"
                                        name="businessDisplayDescription"
                                        defaultValue={sellerInfo.businessDisplayDescription?sellerInfo.businessDisplayDescription:""}
                                        ref={register({
                                            required: "This field is required"
                                        })}
                                    ></textarea>
                                    <span className="text-danger">
                                        {errors.businessDisplayDescription && errors.businessDisplayDescription.message}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                        </div>
                    </div>
                </div>


                    </form>


        </>
    );
};
export default DisplayInfoForm;
import React  from "react";
import { useForm } from "react-hook-form";


const ContactInfoForm = ({ sellerInfo,updateData }) => {

    const { handleSubmit, errors, register } = useForm();
    const onSubmit = data => {
        updateData(data)
    };

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="name" className="col-12 ">Contact Person: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.name ? "is-invalid " : " "}`}
                                id="name"
                                placeholder="Contact Person:"
                                name="name"
                                defaultValue={sellerInfo ? sellerInfo.name : ""}
                                ref={register({
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                                        message: "Numbers and special characters"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Name Should be minimum 2 character long"
                                    }

                                })}
                            />
                            <span className="text-danger">
                                {errors.name && errors.name.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="businessName" className="col-12 ">Contact Email: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.email ? "is-invalid " : " "}`}
                                id="businessName"
                                placeholder="Contact Email:"
                                name="email"
                                defaultValue={sellerInfo.email}
                                ref={register({
                                    required: "This field is required",
                                    pattern: {
                                        value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                        message: "Please enter a valid email"
                                    }

                                })}
                                readOnly
                            />
                            <span className="text-danger">
                                {errors.email && errors.email.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="businessName" className="col-12 ">Mobile: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.mobile ? "is-invalid " : " "}`}
                                id="businessName"
                                placeholder="Mobile:"
                                name="mobile"
                                defaultValue={sellerInfo.mobile}
                                ref={register({
                                    required: "This field is required",
                                    minLength: {
                                        value: 10,
                                        message: "Mobile number should have 10 digits"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Mobile number should not have more then 10 digits"
                                    }
                                })}
                                readOnly
                            />
                            <span className="text-danger">
                                {errors.mobile && errors.mobile.message}
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
export default ContactInfoForm;
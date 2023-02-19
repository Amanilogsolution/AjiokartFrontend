import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SITEAPIURL } from "../../../cons";
//import useResponseHandler from "../../../Hooks/HandleError";

const MobileVerification = ({ sellerInfo, updateData }) => {
   // const [ErrorHandler]=useResponseHandler()

    const { handleSubmit, errors, register } = useForm();
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);


    const sendMobileVerification = (data) => {
        setEmailVerificationSent(true);
        axios.post(`${SITEAPIURL}/triggerMobileVerification`, { mobile: data.mobile })
            .then(res => {
                updateData(data);
            })
    }
    const verifyEmail = (data) => {

        axios.post(`${SITEAPIURL}/verifyEmail`, { mobile: sellerInfo.mobile, code: data.mobileVerificationCode })
            .then(res => { })

    }
    return (
        <>

            {!emailVerificationSent ? <>


                <form class="verify-modal" onSubmit={handleSubmit(sendMobileVerification)}>

                    <div class="form-group col-12">
                        <label for="mobile" class="visually-hidden">Mobile</label>
                        <input type="number" id="mobile"
                            className={`form-control ${errors.mobile ? "is-invalid " : " "}`}
                            placeholder="Contact Mobile:"
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
                               />
                    </div>
                    <div class="form-group col-12 text-center">
                        <button type="submit" class="btn btn-danger mb-5">SEND VERIFICATION CODE</button>
                    </div>
                </form>

            </> : null}

            {emailVerificationSent ? <>


                <form class="verify-modal" onSubmit={handleSubmit(verifyEmail)}>
                <h2>Please enter verifiction code send on mobile</h2>

                    <div class="form-group col-12">
                        <label for="email" class="visually-hidden">Mobile Verification Code</label>
                        <input type="text"
                            className={`form-control ${errors.name ? "is-invalid " : " "}`}
                            id="mobileVerificationCode"
                            placeholder="Email verification Code:"
                            name="mobileVerificationCode"
                            ref={register({
                                required: "This field is required",
                                minLength: {
                                    value: 5,
                                    message: "Please enter valid 5 digit code"
                                }

                            })} />
                        <span className="text-danger">
                            {errors.mobileVerificationCode && errors.mobileVerificationCode.message}
                        </span>
                    </div>
                    <div class="form-group col-12 text-center">
                        <button className="btn btn-danger" type="submit">Send Instructions</button>

                    </div>
                </form>



            </> : null
            }

        </>
    );
};
export default MobileVerification;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SITEAPIURL } from "../../../cons";
import useResponseHandler from "../../../Hooks/HandleError";


const EmailVerification = ({ sellerInfo, updateData }) => {
    const [ErrorHandler]=useResponseHandler()

    const { handleSubmit, errors, register } = useForm();
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);


    const sendEmailVerification = (data) => {
        setEmailVerificationSent(true);
        axios.post(`${SITEAPIURL}/triggerVerificationEmail`, { email: data.email })
            .then(res => {
                updateData(data);
            },err=>{
                ErrorHandler(err)
            })
    }
    const verifyEmail = (data) => {

        axios.post(`${SITEAPIURL}/verifyEmail`, { email: sellerInfo.email, code: data.emailVerificationCode })
            .then(res => {
            },err=>{
                ErrorHandler(err)
            })

    }
    return (
        <>

            {!emailVerificationSent ? <>


                <form class="verify-modal" onSubmit={handleSubmit(sendEmailVerification)}>

                    <div class="form-group col-12">
                        <label for="email" class="visually-hidden">email</label>
                        <input type="email" id="email"
                            className={`form-control ${errors.email ? "is-invalid " : " "}`}
                            placeholder="Contact Email:"
                            name="email"
                            defaultValue={sellerInfo.email}
                            ref={register({
                                required: "This field is required",
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                    message: "Please enter a valid email"
                                }

                            })} />
                    </div>
                    <div class="form-group col-12 text-center">
                        <button type="submit" class="btn btn-danger mb-5">SEND VERIFICATION CODE</button>
                    </div>
                </form>

            </> : null}

            {emailVerificationSent ? <>


                <form class="verify-modal" onSubmit={handleSubmit(verifyEmail)}>
                <h2>Please enter verifiction code send on email</h2>

                    <div class="form-group col-12">
                        <label for="email" class="visually-hidden">email</label>
                        <input type="text"
                            className={`form-control ${errors.name ? "is-invalid " : " "}`}
                            id="emailVerificationCode"
                            placeholder="Email verification Code:"
                            name="emailVerificationCode"
                            ref={register({
                                required: "This field is required",
                                minLength: {
                                    value: 5,
                                    message: "Please enter valid 5 digit code"
                                }

                            })} />
                        <span className="text-danger">
                            {errors.emailVerificationCode && errors.emailVerificationCode.message}
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
export default EmailVerification;
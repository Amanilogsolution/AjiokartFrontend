import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IMG_LOCATION, SITEGENAPIURL } from "../../../cons";
import FileUpload from "../../../UI/FileUpload/FileUpload";
import useResponseHandler from "../../../Hooks/HandleError";

const PaymentInfoForm = ({ sellerInfo, states, updateData }) => {
    const [ErrorHandler]=useResponseHandler()
    const { handleSubmit, errors, register, setValue } = useForm();
    const [files, setFiles] = useState([])
    const onSubmit = data => {

        files.forEach(file => {
            let formData = new FormData()
            formData.append('image', file.file)
            formData.append('folderName', "sellerDocs")
            formData.append('fileName', file.fileName)
            formData.append('type', file.fieldName)

            Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
                .then(res => {
                }).catch(err => {
                    ErrorHandler(err)
                })
        })
        updateData(data)
    };
    const fileToUpload = (file) => {
        let fileName = `sellerDocs/${file.fileName}`
        sellerInfo[file.fieldName] = fileName;
        setValue(file.fieldName, fileName, { shouldValidate: true })
        setFiles([file])
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <div className="row">
                        <label htmlFor="primaryPaymentOption" className="col-12 ">Primary Payment Option: </label>

                        <div className="col-12">
                            <select
                                className={`form-control ${errors.primaryPaymentOption ? "is-invalid " : " "}`}
                                id="primaryPaymentOption"
                                name="primaryPaymentOption"
                                defaultValue={sellerInfo.primaryPaymentOption}
                                ref={register({
                                    required: "This field is required"

                                })}
                            >
                                <option value="">Select</option>
                                <option value="UPI">UPI</option>
                                <option value="bankTransfer">Bank Transfer</option>
                            </select>
                            <span className="text-danger">
                                {errors.primaryPaymentOption && errors.primaryPaymentOption.message}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label htmlFor="UPI" className="col-12 ">UPI: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                id="UPI"
                                placeholder="UPI:"
                                name="UPI"
                                defaultValue={sellerInfo.UPI}
                                ref={register({})}
                            />
                            <span className="text-danger">
                                {errors.UPI && errors.UPI.message}
                            </span>
                        </div>
                    </div>
                </div>



                <div className="form-group">
                    <div className="row">
                        <label htmlFor="bankName" className="col-12 ">Bank Name: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                id="bankName"
                                placeholder="Bank Name:"
                                name="bankName"
                                defaultValue={sellerInfo.bankName}
                                ref={register({
                                    required: "This field is required"

                                })}
                            />
                            <span className="text-danger">
                                {errors.bankName && errors.bankName.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="accountHolder" className="col-12 ">Account Holder Name: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                id="accountHolder"
                                placeholder="Account Holder Name:"
                                name="accountHolder"
                                defaultValue={sellerInfo.accountHolder}
                                ref={register({
                                    required: "This field is required"

                                })}
                            />
                            <span className="text-danger">
                                {errors.accountHolder && errors.accountHolder.message}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label htmlFor="accountNumber" className="col-12 ">Account Number: </label>

                        <div className="col-12">
                            <input type="number"
                                className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                id="accountNumber"
                                placeholder="Account Number:"
                                name="accountNumber"
                                defaultValue={sellerInfo.accountNumber}
                                ref={register({
                                    required: "This field is required"

                                })}
                            />
                            <span className="text-danger">
                                {errors.accountNumber && errors.accountNumber.message}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="ifsc">IFSC: </label>

                            <div>
                                <input type="text"
                                    className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                    id="ifsc"
                                    placeholder="IFSC"
                                    name="ifsc"
                                    defaultValue={sellerInfo.ifsc}
                                    ref={register({
                                        required: "This field is required"

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.ifsc && errors.ifsc.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="bankBranch">Branch: </label>

                            <div>
                                <input type="text"
                                    className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                    id="bankBranch"
                                    placeholder="Branch:"
                                    name="bankBranch"
                                    defaultValue={sellerInfo.bankBranch}
                                    ref={register({
                                        required: "This field is required"

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.bankBranch && errors.bankBranch.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="bankCity">City: </label>

                            <div >
                                <input type="text"
                                    className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                    id="bankCity"
                                    placeholder="City:"
                                    name="bankCity"
                                    defaultValue={sellerInfo.bankCity}
                                    ref={register({
                                        required: "This field is required"

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.bankCity && errors.bankCity.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="bankState">State: </label>

                            <div>
                                <select
                                    className={`form-control ${errors.bankState ? "is-invalid " : " "}`}
                                    id="bankState"
                                    name="bankState"
                                    defaultValue={sellerInfo.bankState}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                >
                                    <option value="">Select</option>
                                    {states.length && states.map((item) => <option key={item.stateCode} value={item.stateCode}>{item.stateName}</option>)}
                                </select>
                                <span className="text-danger">
                                    {errors.bankState && errors.bankState.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="cancelledChequeFile" className="col-12 ">Cancelled Cheque: </label>

                        <div className="col-12">
                            <input type="hidden"
                                className={`form-control ${errors.UPI ? "is-invalid " : " "}`}
                                id="cancelledCheque"
                                placeholder="Cancelled Cheque:"
                                name="cancelledCheque"
                                defaultValue={sellerInfo.cancelledCheque}
                                ref={register({
                                    required: "This field is required"

                                })}
                            />
                            <FileUpload fieldName="cancelledChequeFile" fileToUpload={fileToUpload} accept="image/*,.pdf" value={sellerInfo.cancelledCheque ? `${IMG_LOCATION}/${sellerInfo.cancelledCheque}` : null} />
                            <span className="text-danger">
                                {errors.cancelledCheque && errors.cancelledCheque.message}
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
export default PaymentInfoForm;
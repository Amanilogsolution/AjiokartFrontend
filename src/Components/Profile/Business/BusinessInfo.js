import Axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IMG_LOCATION, SITEGENAPIURL } from "../../../cons";
import useResponseHandler from "../../../Hooks/HandleError";
import FileUpload from "../../../UI/FileUpload/FileUpload";

const BusinessInfoForm = React.forwardRef(({ sellerInfo, states, updateData }, ref) => {
   // const ref = useRef();
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
        sellerInfo[file.fieldName] = fileName
        setValue(file.fieldName, fileName, { shouldValidate: true })
        setFiles([...files, file])
    }


    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="companyName">Company Name: </label>

                            <div >
                                <input type="text"
                                    className={`form-control ${errors.companyName ? "is-invalid " : " "}`}
                                    id="companyName"
                                    placeholder="Business Display Name:"
                                    name="companyName"
                                    defaultValue={sellerInfo.companyName ? sellerInfo.companyName : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.companyName && errors.companyName.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="businessType">Business Type: </label>

                            <div >
                                <select
                                    className={`form-control ${errors.businessType ? "is-invalid " : " "}`}
                                    id="businessType"
                                    name="businessType"
                                    defaultValue={sellerInfo.businessType ? sellerInfo.businessType : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                >
                                    <option value="">Select</option>
                                    <option value="Public Limited Company">Public Limited Company</option>
                                    <option value="Private Limited Company">Private Limited Company</option>
                                    <option value="Joint-Venture Company">Joint-Venture Company</option>
                                    <option value="Partnership Firm">Partnership Firm</option>
                                    <option value="One Person Company">One Person Company</option>
                                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                                    <option value="Non-Government Organization (NGO)">Non-Government Organization (NGO)</option>
                                </select>
                                <span className="text-danger">
                                    {errors.businessType && errors.businessType.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="panNumber">PAN Number: </label>

                            <div >
                                <input type="text"
                                    className={`form-control ${errors.panNumber ? "is-invalid " : " "}`}
                                    id="panNumber"
                                    placeholder="PAN Number:"
                                    name="panNumber"
                                    onChange={e=>e.target.value=e.target.value.toUpperCase()}
                                    defaultValue={sellerInfo.panNumber ? sellerInfo.panNumber : ""}
                                    ref={register({
                                        required: "This field is required",
                                        maxLength:{
                                            value:10,
                                            message: "Please enter a valid PAN Number"
                                        },
                                        pattern: {
                                            value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
                                            message: "Please enter a valid PAN Number"
                                        }

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.panNumber && errors.panNumber.message}
                                </span>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label htmlFor="businessAddressLine1" className="col-12 ">Business Address Line1 </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.businessAddressLine1 ? "is-invalid " : " "}`}
                                id="businessAddressLine1"
                                placeholder="Business Address Line1"
                                name="businessAddressLine1"
                                defaultValue={sellerInfo.businessAddressLine1 ? sellerInfo.businessAddressLine1 : ""}
                                ref={register({
                                    required: "This field is required",

                                })}
                            />
                            <span className="text-danger">
                                {errors.businessAddressLine1 && errors.businessAddressLine1.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="businessAddressLine2" className="col-12 ">Business Address Line2: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.businessAddressLine2 ? "is-invalid " : " "}`}
                                id="businessName"
                                placeholder="Business Address Line2:"
                                name="businessAddressLine2"
                                defaultValue={sellerInfo.businessAddressLine2 ? sellerInfo.businessAddressLine2 : ""}
                                ref={register({
                                    required: "This field is required",

                                })}
                            />
                            <span className="text-danger">
                                {errors.businessAddressLine2 && errors.businessAddressLine2.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="businessLandmark">Landmark: </label>

                            <div>
                                <input type="text"
                                    className={`form-control ${errors.businessLandmark ? "is-invalid " : " "}`}
                                    id="businessName"
                                    placeholder="Landmark:"
                                    name="businessLandmark"
                                    defaultValue={sellerInfo.businessLandmark ? sellerInfo.businessLandmark : ""}
                                    ref={register()}
                                />
                                <span className="text-danger">
                                    {errors.businessLandmark && errors.businessLandmark.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="businessCity">City: </label>

                            <div >
                                <input type="text"
                                    className={`form-control ${errors.businessCity ? "is-invalid " : " "}`}
                                    id="businessCity"
                                    placeholder="City:"
                                    name="businessCity"
                                    defaultValue={sellerInfo.businessCity ? sellerInfo.businessCity : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.businessCity && errors.businessCity.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="businessState" className="col-12 ">State: </label>

                            <div >
                                <select
                                    className={`form-control ${errors.businessState ? "is-invalid " : " "}`}
                                    id="businessState"
                                    name="businessState"
                                    defaultValue={sellerInfo.businessState ? sellerInfo.businessState : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                >
                                    <option value="">Select</option>
                                    {states.length && states.map((item) => <option key={item.stateCode} value={item.stateCode}>{item.stateName}</option>)}
                                </select>
                                <span className="text-danger">
                                    {errors.businessState && errors.businessState.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="businessAddressPIN">PIN: </label>

                            <div>
                                <input type="text"
                                    className={`form-control ${errors.businessAddressPIN ? "is-invalid " : " "}`}
                                    id="businessAddressPIN"
                                    placeholder="PIN:"
                                    name="businessAddressPIN"
                                    defaultValue={sellerInfo.businessAddressPIN ? sellerInfo.businessAddressPIN : ""}
                                    ref={register({
                                        required: "This field is required",
                                        pattern: {
                                            value: /^[1-9][0-9]{5}$/,
                                            message: "Please enter valid PIN"
                                        }

                                    })} />
                                <span className="text-danger">
                                    {errors.businessAddressPIN && errors.businessAddressPIN.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-6 col-md-4">
                            <label htmlFor="businessAddressProof" >Address Proof: </label>

                            <div>
                                <input type="hidden"
                                    className={`form-control ${errors.businessAddressProof ? "is-invalid " : " "}`}
                                    id="businessAddressProof"
                                    placeholder="Address Proof:"
                                    name="businessAddressProof"
                                    defaultValue={sellerInfo.businessAddressProof ? sellerInfo.businessAddressProof : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                />
                                <FileUpload fieldName="businessAddressProofFile" fileToUpload={fileToUpload}  accept="image/*,.pdf" value={sellerInfo.businessAddressProof?`${IMG_LOCATION}/${sellerInfo.businessAddressProof}`:null}/>
                                <span className="text-danger">
                                    {errors.businessAddressProof && errors.businessAddressProof.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="authorisedSignature" >Signature: </label>

                            <div>
                                <input type="hidden"
                                    className={`form-control ${errors.authorisedSignature ? "is-invalid " : " "}`}
                                    id="authorisedSignature"
                                    placeholder="Signature:"
                                    name="authorisedSignature"

                                    defaultValue={sellerInfo.authorisedSignature ? sellerInfo.authorisedSignature : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                />
                                <FileUpload fieldName="authorisedSignatureFile" fileToUpload={fileToUpload} accept="image/*,.pdf" value={sellerInfo.authorisedSignature?`${IMG_LOCATION}/${sellerInfo.authorisedSignature}`:null}
                                />
                                <span className="text-danger">
                                    {errors.authorisedSignature && errors.authorisedSignature.message}
                                </span>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="panProof">PAN Proof: </label>

                            <div>
                                <input type="hidden"
                                    className={`form-control ${errors.panProof ? "is-invalid " : " "}`}
                                    id="panProof"
                                    placeholder="PAN Proof:"
                                    name="panProof"
                                    defaultValue={sellerInfo.panProof ? sellerInfo.panProof : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                />
                                <FileUpload fieldName="panProofFile" fileToUpload={fileToUpload} accept="image/*,.pdf" value={sellerInfo.panProof?`${IMG_LOCATION}/${sellerInfo.panProof}`:null}/>
                                <span className="text-danger">
                                    {errors.panProof && errors.panProof.message}
                                </span>

                            </div>
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
});
export default BusinessInfoForm;
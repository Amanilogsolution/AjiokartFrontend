import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IMG_LOCATION, SITEAPIURL, SITEGENAPIURL, ToastConfig } from "../../../cons";
import DashboardLayout from '../../../HOC/DashboardLayout';
import useResponseHandler from "../../../Hooks/HandleError";
import FileUpload from "../../../UI/FileUpload/FileUpload";

const AddNewBrand = (props) => {
    const [ErrorHandler]=useResponseHandler()
    const [files, setFiles] = useState([])
    const [uploads, setUploads] = useState({})
    const history = useNavigate()
    const [brandData, setBrandData] = useState()
    const { requestId } = useParams()

    useEffect(() => {

        if (requestId) {
            Axios.get(`${SITEAPIURL}/get-brand/${requestId}`)
                .then(res => {
                    setBrandData(res.data.data[0])
                })
                .catch(err => {
                    ErrorHandler(err)
                })
        }
    }, [requestId])

    const { handleSubmit, errors, register, setValue } = useForm();
    const onSubmit = (data) => {

        files.forEach(file => {
            let formData = new FormData()
            formData.append('image', file.file)
            formData.append('folderName', file.fieldName)
            formData.append('fileName', file.fileName)
            formData.append('type', file.fieldName)

            Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
                .then(res => {
                }).catch(err => {
                    ErrorHandler(err)

                })
        })
        if (requestId) {
            data.requestId = requestId;
            data.id=brandData.id;

            Axios.post(`${SITEAPIURL}/update-brand`, data)

                .then(res => {
                    toast.success(`Your request has been submitted for review`, ToastConfig);
                    history(`/manage-brands?message=Your request has been submitted for review`)
                    setFiles([])


                })
                .catch(err => {
                    ErrorHandler(err)
                })
        } else {
            Axios.post(`${SITEAPIURL}/add-brand`, data)

                .then(res => {
                    toast.success(`Your request ID (${res.data.requestId}) for add a new brand has been submitted ` || `Something went wrong`, ToastConfig);
                    history(`/manage-brands?message=Your request ID(${res.data.requestId}) for add a new brand has been submitted`)
                    setFiles([])


                })
                .catch(err => {
                    ErrorHandler(err)
                })
        }
    };

    const fileToUpload = (file) => {
        let fileName = file.fileName;
        let fieldName = file.fieldName;
        let temp = [...files];
        let findField = temp.filter(el => el.fieldName === file.fieldName)

        if (findField.length) {
            let fieldIdx = temp.findIndex(el => el.fieldName === file.fieldName);
            temp[fieldIdx] = file;
            setFiles(files => [...temp]);
        } else {
            setFiles(files => [...files, file])
        }

        let filet = {};
        filet[fieldName] = fileName;
        setUploads({ ...uploads, ...filet })
        setValue(file.fieldName, fileName, { shouldValidate: true })

    }

    const updateValue = (e)=>{
        if(brandData && brandData[e.target.name]){
            let obj={}
            obj[e.target.name]=e.target.value
            setBrandData({...brandData,...obj})
        }
    }

    return (
        <>
            <h1 className="sticky-head">Apply for Brand Approval</h1>

            <div className="panel-body addnew-brand">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group pt-5">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="brandName">Brand Name</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="text" className="form-control" id="brandName"
                                    name="brandName"
                                    defaultValue={brandData?.brandName || ""}
                                    readOnly={requestId ? true : false}
                                    ref={register({
                                        required: "Type a brand name"
                                    })}
                                    placeholder="Brand Name" />

                                {errors.brandName ? <span className="text-danger mb-1">{errors.brandName.message}  </span> : null}

                                <small>Brand name should be same as the Brand name mentioned in the supporting document(s) you upload (TM certificate/Authorization letter) Do not include any brand details such as colour or model number as it could lead to rejection of your Brand Approval request. (For example - "Samsung is a valid brand name, whereas Samsung S4 Black Phone" is an invalid brand name) To edit the Brand name - Go back and "Check for the Brand you want to sell".</small>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="brandSite">Brand Website</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="text" className="form-control" id="brandSite"
                                    name="brandSite"
                                    defaultValue={brandData?.brandSite || ""}
                                    ref={register(
                                        {
                                            pattern:/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
                                            message:"Please enter a valid URL"
                                        }
                                    )}
                                    placeholder="Brand Website" />

                                {errors.brandSite ? <span className="text-danger mb-1">{errors.brandSite.message}  </span> : null}

                                <small>Please share the link of your brand website, if available. For example: https://www.samsung.com/in/home/</small>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="isBrandOwner">Are you the brand owner?</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <select className="form-control" id="isBrandOwner"
                                    name="isBrandOwner"
                                    value={brandData?.isBrandOwner}
                                    ref={register({
                                        required: "Select an option"
                                    })}
                                    placeholder="Are you the brand owner?"
                                    onChange={e=>updateValue(e)}>
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>

                                {errors.isBrandOwner ? <span className="text-danger mb-1">{errors.isBrandOwner.message}  </span> : null}
                                <small>Please select "Yes" if you are the brand owner.</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="brandLogo">Logo</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="hidden" className="form-control" id="brandLogo"
                                    name="brandLogo"
                                    defaultValue={uploads?.brandLogo || brandData?.brandLogo}
                                    placeholder="Please upload brand logo image"
                                    ref={register()}
                                />
                                <FileUpload fieldName="brandLogoFile" fileToUpload={fileToUpload} accept="image/*" value={brandData && brandData.brandLogo ? `${IMG_LOCATION}/brandLogo/72-${brandData?.brandLogo}` : uploads.brandLogo} />


                                <span className="text-danger">
                                    {errors.brandLogo && errors.brandLogo.message}
                                </span>
                                <small>Uploaded logo must match the logo in supporting documents, if present</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="brandMRPTag">Sample MRP Tag</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="hidden" className="form-control" id="brandMRPTag"
                                    name="brandMRPTag"
                                    placeholder="Sample MRP Tag"
                                    defaultValue={uploads?.brandMRPTag || brandData?.brandMRPTag}
                                    ref={register()}
                                />
                                <FileUpload fieldName="brandMRPTagFile" fileToUpload={fileToUpload} accept="image/*" value={brandData && brandData.brandMRPTag ? `${IMG_LOCATION}/${brandData?.brandMRPTag}` : uploads.brandMRPTag} />

                                <span className="text-danger">
                                    {errors.brandMRPTag && errors.brandMRPTag.message}
                                </span>
                                <small>MRP tag for your products should be on the packaging of the product. You need to upload a sample image of the product with the MRP sticker/label.</small>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="brandAuthorizationLetter">Kindly upload any of the following document :Trademark Certificate , Brand Authorization Letter ( with trademark number if any ) or Invoice Copy*</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="hidden" className="form-control" id="brandAuthorizationLetter"
                                    name="brandAuthorizationLetter"
                                    placeholder="Upload Authorization letter"
                                    defaultValue={uploads?.brandAuthorizationLetter || brandData?.brandAuthorizationLetter}
                                    ref={register({
                                        required: "Please upload authorization letter"
                                    })}
                                />
                                <FileUpload fieldName="brandAuthorizationLetterFile" fileToUpload={fileToUpload} accept="image/*,.pdf,.doc" value={brandData && brandData.brandAuthorizationLetter ? `${IMG_LOCATION}/${brandData?.brandAuthorizationLetter}` : uploads.brandAuthorizationLetter} />


                                <span className="text-danger">
                                    {errors.brandAuthorizationLetter && errors.brandAuthorizationLetter.message}
                                </span>
                                <small>Kindly upload trade mark certificate If you are the brand owner, or a brand authorization with the trade mark number mentioned on it or an Invoice copy(Add the documents in zip file if its more than one document)</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-md-4 text-md-right">
                                <label htmlFor="brandRegistrationDocType">Select the document type</label>
                            </div>
                            <div className="col-12 col-md-6">
                                <select className="form-control" id="brandRegistrationDocType"
                                    name="brandRegistrationDocType"
                                    onChange={e=>updateValue(e)}
                                    value={brandData?.brandRegistrationDocType}
                                    ref={register({
                                        required: "Select a uploaded document type"
                                    })}
                                    placeholder="Search Name">
                                    <option value="">Select</option>
                                    <option value="Trademark Certificate">Trademark Certificate</option>
                                    <option value="Brand Authorization Letter">Brand Authorization Letter</option>
                                    <option value="Invoice">Invoice</option>
                                    <option value="Other">Other</option>
                                </select>

                                <span className="text-danger">
                                    {errors.brandRegistrationDocType && errors.brandRegistrationDocType.message}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-12 text-center">
                            <button className="btn btn-primary btn-lg" type="submit">Apply</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default DashboardLayout(AddNewBrand);
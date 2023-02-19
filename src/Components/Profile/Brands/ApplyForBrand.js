import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Popup from "../../../UI/Modal/Modal";
import FileUpload from "../../../UI/FileUpload/FileUpload";
import AutoSuggest from "../../../UI/AutoSuggest/AutoSuggest"
import Axios from "axios";
import { SITEAPIURL, SITEGENAPIURL, ToastConfig } from "../../../cons"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useResponseHandler from "../../../Hooks/HandleError";

const ApplyForBrand = (props) => {
    const [ErrorHandler]=useResponseHandler()
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState([])
    const [uploads, setUploads] = useState({})
    const [brandList, setBrandList] = useState([])
    const [ajaxLoading, setAjaxLoading] = useState(false)
    const history = useNavigate()

    const { handleSubmit, errors, register, setValue } = useForm();
    const onSubmit = data => {
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

        Axios.post(`${SITEAPIURL}/apply-brand`, data)
            .then(res => {

                toggleModal()

                history(`/manage-brands?message=Your request ID (${res.data.requestId}) for add a new brand has been submitted`)
                toast.success(res?.data?.message||"You request has been recieved", ToastConfig)
            })
            .catch(err => {
                ErrorHandler(err)
                toggleModal()
            })
    };
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const fileToUpload = (file) => {
        let fileName = `brandDocs/${file.fileName}`
        let fieldName = file.fieldName;

        setValue(file.fieldName, fileName, { shouldValidate: true })
        setFiles([...files, file])
        let filet = {};
        filet[fieldName] = fileName;
        setUploads({ ...uploads, ...filet })
    }
    const onChange = (text) => {
        if (text.lebgth < 2) {
            return
        }
        setAjaxLoading(true)
        Axios.get(`${SITEAPIURL}/findBrands?brand=${text}`)
            .then(res => {
                setBrandList(res.data.data);
                setAjaxLoading(false)
            }, err => {
                ErrorHandler(err)
                setAjaxLoading(false)
            })

    }


    return (
        <>

            <div>
                <p>
                    Authorised to sell in a already listed brand, apply here
            </p>
            </div>
            <button className="btn btn-primary" onClick={toggleModal}>Apply now</button>

            <Popup heading={"Add a new Brand"}
                showModal={showModal} showModalFunction={toggleModal}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <label htmlFor="brandName">Brand Name</label>
                            </div>
                            <div className="col-12 col-lg-8">
                                <input type="hidden" className="form-control" id="brandName"
                                    name="brands_id"
                                    ref={register({
                                        required: "Select a brand name"
                                    })}
                                    placeholder="Search Name" />
                                <AutoSuggest
                                    suggestions={brandList}
                                    chosenValue={(v) => setValue("brands_id", v.id, { shouldValidate: true })}
                                    placeHolder="Search For a Brand"
                                    onChange={onChange}
                                    fieldName="brandName"
                                    loading={ajaxLoading}
                                />

                                <span className="text-danger">
                                    {errors.brands_id && errors.brands_id.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <label htmlFor="brandAuthorizationLetter">Authorization Letter</label>
                            </div>
                            <div className="col-12 col-lg-8">

                                <input type="hidden" className="form-control" id="brandAuthorizationLetter"
                                    name="brandAuthorizationLetter"
                                    placeholder="Please upload authorisation letter"
                                    ref={register({
                                        required: "Please upload authorisation letter"
                                    })}

                                />

                                <FileUpload fieldName="brandAuthorizationLetterFile" fileToUpload={fileToUpload} accept="image/*,.pdf" value={uploads.brandAuthorizationLetter} />

                                <span className="text-danger">
                                    {errors.brandAuthorizationLetter && errors.brandAuthorizationLetter.message}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-12 text-center">
                            <button className="btn btn-primary" type="submit">Apply</button>
                        </div>
                    </div>

                </form>


            </Popup>
        </>
    );
};
export default ApplyForBrand;
import React, { useState } from 'react';
import { IMG_LOCATION, SITEGENAPIURL } from "../../../../cons"
import { useForm } from "react-hook-form";
import Axios from 'axios';
import FileUpload from '../../../../UI/FileUpload/FileUpload';

const SiteBranding = ({ updataData, brandingData }) => {
    const { handleSubmit, errors, register, setValue } = useForm();
    const [files, setFiles] = useState([])

    const onSubmit = data => {
        files.forEach(file => {
            let formData = new FormData()
            formData.append('image', file.file)
            formData.append('folderName', file.fieldName)
            formData.append('fileName', file.fileName)
            formData.append('type', file.fieldName)

            Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
                .then(res => {
                    setFiles([])
                }).catch(err => {
                })
        })

        updataData(data)

    }

    const fileToUpload = (file) => {
        let fileName = `${file.fileName}`
        brandingData[file.fieldName]=fileName
        setValue(file.fieldName, fileName, { shouldValidate: true })
        setFiles([...files, file])

    }

    return (
        <React.Fragment>



            <form onSubmit={handleSubmit(onSubmit)}>

                <h2 className="panel-heading">Site Settings</h2>
                <div className="panel-body pt-5">
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="siteTitle" className="col-12 col-sm-3 col-md-3">Site Title </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className={`form-control ${errors.siteTitle ? "is-invalid " : " "}`}
                                    id="siteTitle"
                                    placeholder="Site Title"
                                    name="siteTitle"
                                    defaultValue={brandingData?.siteTitle}
                                    ref={register({
                                        required: "Please enter site title"
                                    })}

                                />

                                <span className="text-danger">
                                    {errors.siteTitle && errors.siteTitle.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="siteLogo" className="col-12 col-sm-3 col-md-3">Site Logo: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="hidden"
                                    className="form-control"
                                    id="siteLogo"
                                    placeholder="Youtube Channel URL"
                                    name="siteLogo"
                                    defaultValue={brandingData?.siteLogo}
                                    ref={register()}

                                />
                                <FileUpload fieldName="siteLogoFile" fileToUpload={fileToUpload} accept="image/jpg,image/png,image/jpeg" value={`${IMG_LOCATION}/siteLogo/70-${brandingData?.siteLogo}`} />
                                <br />
                                <small className="form-text text-muted">Upload logo image for your site in JPG or PNG format. Max height 140px, Max size 10KB</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="appIcon" className="col-12 col-sm-3 col-md-3">App Icon </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="hidden"
                                    className="form-control"
                                    id="appIcon"
                                    placeholder="Youtube Channel URL"
                                    name="appIcon"
                                    defaultValue={brandingData?.appIcon}
                                    ref={register()}

                                />
                                <FileUpload fieldName="appIconFile" fileToUpload={fileToUpload} accept="image/jpg,image/png,image/jpeg" value={`${IMG_LOCATION}/appIcon/72-${brandingData?.appIcon}`} />
                                <br />
                                <small className="form-text text-muted">Upload icon image for your app in PNG format of size 512x512px</small>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 offset-md-3 col-md-9">
                                <button type="submit" className="btn btn-danger btn-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </React.Fragment >
    )

}

export default SiteBranding;

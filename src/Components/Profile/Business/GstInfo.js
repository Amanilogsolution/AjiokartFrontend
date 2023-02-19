import Axios from "axios";
import React,{useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../../../UI/FileUpload/FileUpload";
import {IMG_LOCATION, SITEGENAPIURL} from "../../../cons"
import useResponseHandler from "../../../Hooks/HandleError";



const GstInfoForm = ({ sellerInfo , updateData}) => {
    const [ErrorHandler]=useResponseHandler()
    const [noGSTInfo, setnoGSTInfo] = useState(true)
    const { handleSubmit, errors, register, setValue } = useForm();
    const [files, setFiles] = useState([])

    useEffect(() => {

        if(sellerInfo.gstIn === "haveGST"){
            setnoGSTInfo(false)
        }

    }, [sellerInfo.gstIn])

    const onSubmit = data => {
        files.forEach(file=>{
            let formData = new FormData()
            formData.append('image', file.file)
            formData.append('folderName', "sellerDocs")
            formData.append('fileName', file.fileName)
            formData.append('type', file.fieldName)

            Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
            .then(res=>{
            }).catch(err=>{
                ErrorHandler(err)
            })
        })
        updateData(data)
    };
    const fileToUpload=(file)=>{
        let fileName = `sellerDocs/${file.fileName}`
        sellerInfo[file.fieldName]=fileName
        setValue(file.fieldName, fileName, { shouldValidate: true })
        setFiles([file])
    }

    const setGSTval = (val) => {
        switch (val) {
            case "haveGST":
                setnoGSTInfo(false)
                break;
            case "ExemptGST":
                setnoGSTInfo(true)
                break;
            case "noGST":
                setnoGSTInfo(true)
                break;
             default:
                 return
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gstIn" id="inlineRadio1" value="haveGST"
                                    ref={register()}
                                    defaultChecked={"haveGST"=== sellerInfo.gstIn}
                                    onChange={e => setGSTval(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio1">I have a GSTIN</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gstIn" id="inlineRadio2" value="ExemptGST" ref={register()}
                                    onChange={e => setGSTval(e.target.value)}
                                    defaultChecked={"ExemptGST"=== sellerInfo.gstIn}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">I will sell only in GSTIN exempt categories like books</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gstIn" id="inlineRadio3" value="noGST" ref={register()}
                                    onChange={e => setGSTval(e.target.value)}
                                    defaultChecked={"noGST"=== sellerInfo.gstIn}/>
                                <label className="form-check-label" htmlFor="inlineRadio3">I have applied/will apply for GSTIN</label>
                            </div>
                        </div>
                    </div>
                </div>
                {!noGSTInfo && <div className="form-group">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="gstin">GSTIN Number: </label>

                            <div >
                                <input type="text"
                                    className={`form-control ${errors.gstNumber ? "is-invalid " : " "}`}
                                    id="gstNumber"
                                    placeholder="GSTIN Number:"
                                    name="gstNumber"
                                    defaultValue={sellerInfo.gstNumber ? sellerInfo.gstNumber : ""}
                                    onChange={e=>e.target.value=e.target.value.toUpperCase()}
                                    ref={register({
                                        required: "This field is required",
                                        pattern: {
                                            value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                            message: "Please enter valid GSTIN"

                                        }

                                    })}
                                />
                                <span className="text-danger">
                                    {errors.gstNumber && errors.gstNumber.message}
                                </span>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <label htmlFor="gstFile">GSTIN doc: </label>

                            <div >
                                <input type="hidden"
                                    className={`form-control ${errors.gstFile ? "is-invalid " : " "}`}
                                    id="gstFile"
                                    placeholder="GSTIN Docs:"
                                    name="gstFile"
                                    defaultValue={sellerInfo.gstFile ? sellerInfo.gstFile : ""}
                                    ref={register({
                                        required: "This field is required",

                                    })}
                                />

                                <FileUpload fieldName="gstFileFile" fileToUpload={fileToUpload} accept="image/*,.pdf" value={sellerInfo.gstFile?`${IMG_LOCATION}/${sellerInfo.gstFile}`:null}/>
                                <span className="text-danger">
                                    {errors.gstFile && errors.gstFile.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>}


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
export default GstInfoForm;
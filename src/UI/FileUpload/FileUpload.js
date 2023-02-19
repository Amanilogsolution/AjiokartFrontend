import React, {useState} from 'react'
import "./fileupload.scss"
import {FaFilePdf, FaUpload } from 'react-icons/fa';
import { ToastConfig } from '../../cons';
import {toast} from "react-toastify";

const FileUpload = ({ fieldName, fileToUpload, accept, value ,index}) => {
    const [localpath,setLocalpath]= useState()
    const onChangeHandler = event => {
        var file = event.target.files[0];
        if (validateSize(event)) {
            let fileName = new Date().getTime() + "-" + event.target.value.split("\\").pop();
            let fakePath= (window.URL ? window.URL : window.webkitURL).createObjectURL(event.target.files[0])
            setLocalpath(fakePath)
            fileToUpload({
                file: file,
                fieldName: event.target.name.substring(0, event.target.name.length - 4),
                fileName: fileName,
                fileFakepath:fakePath,
            },index)
        }
    }
    const validateSize = (event) => {
        let file = event.target.files[0];
        let size = 1024000;
        if (file.size > size) {
            toast.error(`Image should not be larger then 1000KB`, ToastConfig);
        }
        return true
    };
    return (
        <React.Fragment>
            {value ? <div className="file-place-holder">
                {value.split(".").pop() === "jpg" || value.split(".").pop() === "png" || value.split(".").pop() === "jpeg" ?
                    <img src={localpath||value} alt={fieldName} className="img-fluid" /> :  <FaFilePdf className="file-place-holder-icon"/>}
            </div> : null}

            <input type="file" id={fieldName} name={fieldName} placeholder="Upload Authorization letter"
                onChange={onChangeHandler} accept={accept} />
            <label htmlFor={fieldName} className={value ? "has-preview" : null}><FaUpload /> {value?"Change":"Upload"}</label>
        </React.Fragment>
    )
}
export default FileUpload;
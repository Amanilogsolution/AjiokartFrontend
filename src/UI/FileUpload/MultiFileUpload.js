import React from 'react'
import "./fileupload.scss"
import { FaUpload } from 'react-icons/fa';

const MultiFileUpload = ({ fieldName, mFileToUpload, accept, value }) => {
    const onChangeHandler = event => {
        var files = event.target.files;

        for (let i = 0, numFiles = files.length; i < numFiles; i++) {

            if (validateSize(event)) {
                let fakePath = (window.URL ? window.URL : window.webkitURL).createObjectURL(event.target.files[i])
                mFileToUpload({
                    file: files[i],
                    fieldName: event.target.name.substring(0, event.target.name.length - 4),
                    fileName: new Date().getTime() + "-" + files[i].name,
                    fileFakepath: fakePath,
                })
            }
        }
    }
    const validateSize = (event) => {
        let file = event.target.files[0];
        let size = 500000;
        let err = null;
        if (file.size > size) {
            err = file.type + 'is too large, please pick a smaller file\n';

        }
        return true
    };
    return (
        <React.Fragment>
            <input type="file" id={fieldName} name={fieldName} placeholder="Upload Authorization letter"
                onChange={onChangeHandler} accept={accept} multiple />
            <label htmlFor={fieldName} className={value ? "has-preview" : null}><FaUpload /> {value ? "Change" : "Upload"}</label>
        </React.Fragment>
    )
}
export default MultiFileUpload;
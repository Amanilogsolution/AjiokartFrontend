import Axios from "axios";
import React , {useState} from "react";
import { useForm } from "react-hook-form";
import { IMG_LOCATION, SITEGENAPIURL } from "../../../cons";
import FileUpload from "../../../UI/FileUpload/FileUpload";
import useResponseHandler from "../../../Hooks/HandleError";

const PickupAddressForm = ({ sellerInfo, states, updateData }) => {
    const[ErrorHandler]=useResponseHandler()
    const { handleSubmit, errors, register, setValue } = useForm();
    const [files, setFiles] = useState([])
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
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupAddress1" className="col-12 ">Address Line1 </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.pickupAddress1 ? "is-invalid " : " "}`}
                                id="pickupAddress1"
                                placeholder="Address Line1"
                                name="pickupAddress1"
                                defaultValue={sellerInfo.pickupAddress1 ? sellerInfo.pickupAddress1 : ""}
                                ref={register({
                                    required: "This field is required"

                                })}
                            />
                            <span className="text-danger">
                                {errors.pickupAddress1 && errors.pickupAddress1.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupAddress2" className="col-12 ">Address Line2: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.pickupAddress2 ? "is-invalid " : " "}`}
                                id="pickupAddress2"
                                placeholder="Address Line2:"
                                name="pickupAddress2"
                                defaultValue={sellerInfo.pickupAddress2 ? sellerInfo.pickupAddress2 : ""}
                                ref={register({
                                    required: "This field is required",

                                })}
                            />
                            <span className="text-danger">
                                {errors.pickupAddress2 && errors.pickupAddress2.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupLandmark" className="col-12 ">Landmark: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.displayName ? "is-invalid " : " "}`}
                                id="pickupLandmark"
                                placeholder="pickupLandmark:"
                                name="pickupLandmark"
                                defaultValue={sellerInfo.pickupLandmark ? sellerInfo.pickupLandmark : ""}
                                ref={register()}
                            />
                            <span className="text-danger">
                                {errors.pickupLandmark && errors.pickupLandmark.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupCity" className="col-12 ">City: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.pickupCity ? "is-invalid " : " "}`}
                                id="pickupCity"
                                placeholder="City:"
                                name="pickupCity"
                                defaultValue={sellerInfo.pickupCity ? sellerInfo.pickupCity : ""}
                                ref={register({
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                                        message: "Numbers and special characters"
                                    }

                                })}
                            />
                            <span className="text-danger">
                                {errors.pickupCity && errors.pickupCity.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupState" className="col-12 ">State: </label>

                        <div className="col-12">
                            <select
                                className={`form-control ${errors.pickupState ? "is-invalid " : " "}`}
                                id="pickupState"
                                placeholder="State:"
                                name="pickupState"
                                defaultValue={sellerInfo.pickupState ? sellerInfo.pickupState : ""}
                                ref={register({
                                    required: "This field is required",

                                })}
                            >
                                <option>Select</option>
                                {states.length && states.map((item) => <option key={item.stateCode} value={item.stateCode}>{item.stateName}</option>)}
                            </select>
                            <span className="text-danger">
                                {errors.pickupState && errors.pickupState.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupPin" className="col-12 ">PIN: </label>

                        <div className="col-12">
                            <input type="text"
                                className={`form-control ${errors.pickupPin ? "is-invalid " : " "}`}
                                id="pickupPin"
                                placeholder="PIN:"
                                name="pickupPin"
                                defaultValue={sellerInfo.pickupPin ? sellerInfo.pickupPin : ""}
                                ref={register({
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[1-9][0-9]{5}$/,
                                        message: "Please enter valid PIN"
                                    }

                                })}
                            />
                            <span className="text-danger">
                                {errors.pickupPin && errors.pickupPin.message}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="pickupAddressProofFile" className="col-12 ">Address Proof: </label>

                        <div className="col-12">
                            <input type="hidden"
                                id="pickupAddressProof"
                                placeholder="pickupAddressProof:"
                                name="pickupAddressProof"
                                defaultValue={sellerInfo.pickupAddressProof?sellerInfo.pickupAddressProof:null}

                                ref={register({
                                    required: "This field is required",

                                })}
                            />
                            {sellerInfo?.pickupAddressProof}
                            <FileUpload fieldName="pickupAddressProofFile" fileToUpload={fileToUpload} accept="image/*,.pdf" value={sellerInfo.pickupAddressProof?`${IMG_LOCATION}/${sellerInfo.pickupAddressProof}`:null}/>



                            <span className="text-danger">
                                {errors.pickupAddressProof && errors.pickupAddressProof.message}
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
export default PickupAddressForm;
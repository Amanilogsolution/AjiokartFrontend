import React, { useState, useEffect } from 'react';
import axios from "axios"
import { FaEdit, FaExclamationCircle, FaEye } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import "./Business.scss"

import DashboardLayout from '../../../HOC/DashboardLayout';
import Loader from "../../Loader/Loader"
import Popup from "../../../UI/Modal/Modal"
import { SITEAPIURL, SITEGENAPIURL,IMG_LOCATION } from "../../../cons"
import ContactInfoForm from './ContactInfo';
import PickupAddressForm from './PickupAddress';
import DisplayInfoForm from "./DisplayInfo"
import BusinessInfoForm from './BusinessInfo';
import GstInfoForm from './GstInfo';
import PaymentInfoForm from './PaymentInfo';
import EmailVerification from './EmailVerification';
import MobileVerification from './MobileVerification';
import { useSelector } from 'react-redux';
import useResponseHandler from '../../../Hooks/HandleError';

let conatctInfo = "conatctInfo"
let pickUpAddress = "pickUpAddress"
let businessInfo = "businessInfo"
let gstInfo = "gstInfo"
let businessDispalyInfo = "businessDispalyInfo"
let paymentInfo = "paymentInfo"
let verifyEmail = "verifyEmail"
let verifyMobile = "verifyMobile"
let pickupAddressProof = "pickupAddressProof"
let panProof = "panProof";
let businessAddressProof = "businessAddressProof";
let authorisedSignature = "authorisedSignature";
let gstproof = "gstproof";
let cancelledCheque = "cancelledCheque";

const Business = (props) => {
    const [ErrorHandler] =useResponseHandler()
    const [loading, setLoading] = useState(false)
    const [miniLoading, setMiniLoading] = useState(false)
    const [modalHeading, setModalHeading] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalClass, setModalClass] = useState("")
    const [editMode, setEditMode] = useState();
    const [sellerInfo, setsellerInfo] = useState();
    const [states, setStates] = useState();
    const { isAuthenticated } = useSelector(state => state.login);


    const updateData = (data) => {
        setMiniLoading(true)
        if (editMode === verifyEmail) {
            setsellerInfo({ ...sellerInfo, ...data })
            setShowModal(!showModal)

        } else if (editMode === verifyMobile) {
            setsellerInfo({ ...sellerInfo, ...data })
            setShowModal(!showModal)

        } else {
            axios.post(`${SITEAPIURL}/updateSellerDetails`, data)
                .then(res => {
                    setsellerInfo({ ...sellerInfo, ...data })
                    setShowModal(!showModal)
                    setMiniLoading(false)
                },
                err => {
                    ErrorHandler(err)
                    setMiniLoading(false)
                })
        }
    }

    useEffect(() => {

        axios.get(`${SITEGENAPIURL}/states`).then(res => {
            setStates(res.data.data)
        },err=>{
            ErrorHandler(err)
        })

    }, [])



    useEffect(() => {
        if(isAuthenticated){
        setLoading(true)
        axios.get(`${SITEAPIURL}/getSellerDetails`)
            .then(res => {
                setsellerInfo(res.data)
                setLoading(false)


            })
            .catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })
        }
    }, [isAuthenticated])
    const handleShowModalFunction = (editMode) => {
        setShowModal(!showModal)
        setModalClass("")

        switch (editMode) {
            case conatctInfo:
                setEditMode(editMode)
                setModalHeading("Primary Contact Information");
                break;
            case pickUpAddress:
                setEditMode(editMode)
                setModalHeading("Pickup Address");
                break;
            case businessInfo:
                setEditMode(editMode)
                setModalHeading("Business Info Information");
                break
            case businessDispalyInfo:
                setEditMode(editMode)
                setModalHeading("Business display Information");
                break;
            case gstInfo:
                setEditMode(editMode)
                setModalHeading("GST Information");
                break
            case paymentInfo:
                setEditMode(editMode)
                setModalHeading("Payment Information");
                break
            case verifyEmail:
                setEditMode(editMode)
                setModalHeading("Verify email");
                break
            case verifyMobile:
                setEditMode(editMode)
                setModalHeading("Verify mobile");
                break
            case pickupAddressProof:
                setEditMode(editMode)
                setModalClass("modal-lg")
                setModalHeading("Pickup address verification document");
                break
            case panProof:
                setEditMode(editMode)
                setModalClass("modal-lg")
                setModalHeading("PAN verification document");
                break
            case businessAddressProof:
                setEditMode(editMode)
                setModalClass("modal-lg")
                setModalHeading("Business verification document");
                break
            case authorisedSignature:
                setEditMode(editMode)
                setModalClass("modal-lg")
                setModalHeading("Authorised signature");
                break
            case gstproof:
                setEditMode(editMode)
                setModalClass("modal-lg")
                setModalHeading("GSTIN document");
                break
            case cancelledCheque:
                setEditMode(editMode)
                setModalClass("modal-lg")
                setModalHeading("Bank cancelled cheque");
                break
            default:
                return;
            // code block
        }



        setShowModal(!showModal)
    }

    if (loading) {
        return <Loader />
    }
    return (
        <React.Fragment>
            <h1 className="sticky-head">Manage Business Profile</h1>
            <div className="profile">
                <div className="row">
                    <div className="col-12">
                        <div className="panel-body ">
                            <h2 className="panel-heading">Contact Info</h2>
                            <button className="btn edit" onClick={() => handleShowModalFunction(conatctInfo)}><FaEdit /><span className="visually-hidden">Edit</span></button>
                            <p>
                                <strong className="d-block">Contact Person:</strong>
                                {sellerInfo?.name ? sellerInfo?.name : "-"}
                            </p>
                            <p>
                                <strong className="d-block">Contact Email:

                                </strong>
                                {!sellerInfo?.isEmailVerified ? <>


                                    <OverlayTrigger
                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip1`}>
                                                Email is not verified

                                </Tooltip>
                                        }
                                    >
                                        <FaExclamationCircle className="red" />

                                    </OverlayTrigger>

                                </> : null}

                                {sellerInfo?.email ? sellerInfo?.email : "-"}

                                {/* {!sellerInfo.isEmailVerified ? <button className="btn btn-link" onClick={() => handleShowModalFunction(verifyEmail)}>Verify now</button> : null} */}


                            </p>
                            <p>
                                <strong className="d-block">Mobile:</strong>
                                {!sellerInfo?.isMobileVerified ? <>
                                    <OverlayTrigger
                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip1`}>
                                                Mobile Number is not verified

                                        </Tooltip>
                                        }
                                    >
                                        <FaExclamationCircle className="red" />
                                    </OverlayTrigger>
                                </> : null}
                                {sellerInfo?.mobile ? sellerInfo?.mobile : "-"}


                                {/* {!sellerInfo.isMobileVerified ? <>
                                    <button className="btn btn-link" onClick={() => handleShowModalFunction(verifyMobile)}>Send OTP</button></> : null} */}
                            </p>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="panel-body ">

                            <h2 className="panel-heading">Pickup Address

                            </h2>


                            <button className="btn edit" onClick={() => handleShowModalFunction(pickUpAddress)}><FaEdit /><span className="visually-hidden">Edit</span></button>

                            <p>
                                {sellerInfo?.pickupAddress1 ? <span className="d-block">{sellerInfo.pickupAddress1}</span> : null}
                                {sellerInfo?.pickupAddress2 ? <span className="d-block">{sellerInfo.pickupAddress2} </span> : null}
                                {sellerInfo?.pickupLandmark ? <span className="d-block">{sellerInfo.pickupLandmark}</span> : null}
                                {sellerInfo?.pickupCity ? <span className="d-block">{sellerInfo.pickupCity} </span> : null}
                                {sellerInfo?.pickupState ? <span className="d-block">{sellerInfo.pickupState}</span> : null}
                                {sellerInfo?.pickupPin ? <span className="d-block">{sellerInfo.pickupPin}</span> : null}
                            </p>
                            <p><strong className="d-block">Address Proof:</strong></p>
                            {sellerInfo?.pickupAddressProof ? <div> Done  <button className="btn" onClick={() => handleShowModalFunction(pickupAddressProof)}><FaEye /></button></div> : null}

                            {!sellerInfo?.isAddressVerified ? <>
                                <OverlayTrigger
                                    key={"top"}
                                    placement={"top"}
                                    overlay={
                                        <Tooltip id={`tooltip1`}>
                                            Pickup address verification pending
                                            </Tooltip>
                                    }
                                >
                                    <FaExclamationCircle className="red" />
                                </OverlayTrigger>
                            </> : null}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="panel-body ">
                            <h2 className="panel-heading">Display Info</h2>
                            <button className="btn edit" onClick={() => handleShowModalFunction(businessDispalyInfo)}><FaEdit /><span className="visually-hidden">Edit</span></button>
                            <p><strong className="d-block">Business Display Name</strong>
                                {sellerInfo?.businessDisplayName ? sellerInfo.businessDisplayName : "-"}</p>
                            <p><strong className="d-block">Business Description</strong>
                                {sellerInfo?.businessDisplayDescription ? sellerInfo.businessDisplayDescription : "-"}</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="panel-body ">
                            <h2 className="panel-heading">Business Info</h2>
                            <button className="btn edit" onClick={() => handleShowModalFunction(businessInfo)}><FaEdit /><span className="visually-hidden">Edit</span></button>
                            <p><strong className="d-block">Company Name</strong>{sellerInfo?.companyName ? sellerInfo.companyName : ""}</p>
                            <p><strong className="d-block">PAN Number</strong>{sellerInfo?.panNumber ? sellerInfo.panNumber : ""}</p>

                            <p><strong className="d-block">Business Type:</strong>{sellerInfo?.businessType ? sellerInfo.businessType : ""}</p>
                            <p><strong className="d-block">Address</strong>

                                {sellerInfo?.businessAddressLine1 ? <span className="d-block">{sellerInfo.businessAddressLine1}</span> : null}
                                {sellerInfo?.businessAddressLine2 ? <span className="d-block">{sellerInfo.businessAddressLine2} </span> : null}
                                {sellerInfo?.businessLandmark ? <span className="d-block">{sellerInfo.businessLandmark}</span> : null}
                                {sellerInfo?.businessCity ? <span className="d-block">{sellerInfo.businessCity} </span> : null}
                                {sellerInfo?.businessState ? <span className="d-block">{sellerInfo.businessState}</span> : null}
                                {sellerInfo?.businessAddressPIN ? <span className="d-block">{sellerInfo.businessAddressPIN}</span> : null}
                            </p>
                            <p className="mb-0"><strong>PAN Proof</strong>{sellerInfo?.panProof ? <> Done  <button className="btn p-0" onClick={() => handleShowModalFunction(panProof)}><FaEye /></button></> : ""}</p>
                            <p className="mb-0"><strong>Address Proof:</strong>{sellerInfo?.businessAddressProof ? <> Done  <button className="btn p-0" onClick={() => handleShowModalFunction(businessAddressProof)}><FaEye /></button></> : ""}
                            </p><p className="mb-0"> <strong>Signature:</strong>{sellerInfo?.authorisedSignature ? <> Done  <button className="btn p-0" onClick={() => handleShowModalFunction(authorisedSignature)}><FaEye /></button></> : ""}</p>


                        </div>
                    </div>
                    <div className="col-12">
                        <div className="panel-body ">
                            <h2 className="panel-heading">GSTIN Info</h2>
                            <button className="btn edit" onClick={() => handleShowModalFunction(gstInfo)}><FaEdit /><span className="visually-hidden">Edit</span></button>
                            <p><strong className="d-block">GSTIN Number</strong>
                                {sellerInfo?.gstIn === "haveGST" ? sellerInfo.gstNumber : "-"}</p>
                            <p><strong className="d-block">GSTIN Proof</strong>
                                {sellerInfo?.gstFile ? <> Done  <button className="btn" onClick={() => handleShowModalFunction(gstproof)}><FaEye /></button></> : "-"}</p>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="panel-body ">
                            <h2 className="panel-heading">Payment Info</h2>
                            <button className="btn edit" onClick={() => handleShowModalFunction(paymentInfo)}><FaEdit /><span className="visually-hidden">Edit</span></button>
                            <p><strong className="d-block">Primary Payment Option</strong> {sellerInfo?.primaryPaymentOption ? sellerInfo.primaryPaymentOption : ""}</p>
                            <p><strong className="d-block">UPI</strong>{sellerInfo?.UPI ? sellerInfo.UPI : ""}</p>
                            <p><strong className="d-block">Bank Details</strong>
                            Account Holder: {sellerInfo?.accountHolder ? sellerInfo.accountHolder : ""} <br />
                            Bank Name: {sellerInfo?.bankName ? sellerInfo.bankName : ""}<br />
                            Account Number: {sellerInfo?.accountNumber ? sellerInfo.accountNumber : ""}<br />
                            IFSC: {sellerInfo?.ifsc ? sellerInfo.ifsc : ""}<br />
                            Branch: {sellerInfo?.bankBranch ? sellerInfo.bankBranch : ""}<br />
                            City: {sellerInfo?.bankCity ? sellerInfo.bankCity : ""}<br />
                            State: {sellerInfo?.bankState ? sellerInfo.bankState : ""}<br />
                            Cancelled Cheque: {sellerInfo?.cancelledCheque ? <> Done  <button className="btn" onClick={() => handleShowModalFunction(cancelledCheque)}><FaEye /></button></> : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Popup heading={modalHeading} showModal={showModal} showModalFunction={() => handleShowModalFunction()} modalClass={modalClass}>
                {miniLoading ? <Loader mini="true" /> : null}
                {editMode === conatctInfo ? <ContactInfoForm sellerInfo={sellerInfo} updateData={updateData} /> : null}
                {editMode === pickUpAddress ? <PickupAddressForm sellerInfo={sellerInfo} states={states} updateData={updateData} /> : null}
                {editMode === businessDispalyInfo ? <DisplayInfoForm sellerInfo={sellerInfo} updateData={updateData} /> : null}
                {editMode === gstInfo ? <GstInfoForm sellerInfo={sellerInfo} updateData={updateData} /> : null}
                {editMode === businessInfo ? <BusinessInfoForm sellerInfo={sellerInfo} states={states} updateData={updateData} /> : null}
                {editMode === paymentInfo ? <PaymentInfoForm sellerInfo={sellerInfo} states={states} updateData={updateData} /> : null}
                {editMode === verifyEmail ? <EmailVerification sellerInfo={sellerInfo} updateData={updateData} /> : null}
                {editMode === verifyMobile ? <MobileVerification sellerInfo={sellerInfo} updateData={updateData} /> : null}
                {editMode === gstproof ? <img src={`${IMG_LOCATION}/${sellerInfo.gstFile}`} alt="GST Document" className="img-fluid m-auto d-block"/>:null}
                {editMode === pickupAddressProof ? <img src={`${IMG_LOCATION}/${sellerInfo.pickupAddressProof}`} alt="Pickup address Document" className="img-fluid m-auto d-block"/>:null}
                {editMode === cancelledCheque ? <img src={`${IMG_LOCATION}/${sellerInfo.cancelledCheque}`} alt="Cancelled Cheque" className="img-fluid m-auto d-block"/>:null}
                {editMode === panProof ? <img src={`${IMG_LOCATION}/${sellerInfo.panProof}`} alt="PAN Card" className="img-fluid"/>:null}
                {editMode === businessAddressProof ? <img src={`${IMG_LOCATION}/${sellerInfo.businessAddressProof}`} alt="Registered office" className="img-fluid m-auto d-block"/>:null}
                {editMode === authorisedSignature ? <img src={`${IMG_LOCATION}/${sellerInfo.authorisedSignature}`} alt="Authorised Signature" className="img-fluid m-auto d-block"/>:null}
            </Popup>
        </React.Fragment>
    )
}
export default DashboardLayout(Business);
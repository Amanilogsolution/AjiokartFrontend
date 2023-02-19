import React from "react";
import DashboardLayout from "../../HOC/DashboardLayout";
import { FaTag, FaInfoCircle, FaPizzaSlice } from "react-icons/fa";
import Popover from "../../UI/Popover/Popover";


const PromotionDetails = () => {



    return (
        <React.Fragment>
            <h1 class="sticky-head">Promotion: 10% off upto ₹100: Fashion</h1>

            <div className="panel-body">
                <div className="container-fluid px-0">
                    <div className="row">


                        <div className="col-12">
                        <div className="promotion-info clearfix">
                                <div className="info">
                                    <p> Extra Discount</p>
                                    <FaTag className="icon" />
                                    <span className="share">10%</span>
                                    <Popover

                                        btnText={<FaInfoCircle />}

                                        hintText="It is extra discount given to the buyer on MRP. For e.g. If MRP is Rs 1000, and MRP discount is 30%, then discount would be Rs 300 and final price would be 700, for order above value 1000, max discount will be Rs 100" />
                                </div>
                                <div className="info">
                                    <p>  Discount Share</p>
                                    <FaPizzaSlice className="icon" />
                                    <span className="share">100%</span>
                                    <Popover

                                        btnText={<FaInfoCircle />}
                                        hintText="This is the % of total discount to be borne by you." />
                                </div>
                            </div>

                            <p>Promotion description here</p>
                            <p><span>Offer Type:</span> Basket Discount</p>
                            <p><span>Promotion Status:</span>  Ongoing ( 2 months left)</p>
                            <p><span>Promotion Duration:</span>   Tuesday, 12 Nov, 20196:00:00 AM - Tuesday, 31 Mar, 2020 11:59:59 PM</p>

                            <div className="d-opt">
                                <div className="opt-promotion">
                                    <div className="optin-all">
                                        <p>Select Listing IDs to run promotion on using <button className="btn btn-link">Eligible Listing IDs</button></p>
                                        <button className="btn btn-danger">Upload</button>
                                    </div>

                                </div>
                                <div className="div-or"><span>OR</span></div>
                                <div className="opt-promotion">
                                    <div className="optin-all">
                                        <p>Optin for all eligible categories and listing</p>
                                        <button className="btn btn-danger">Optin for all</button>
                                    </div>

                                </div>
                            </div>

                            <p>*By Uploading file/Optin you are agree to all promotion terms and optin for products</p>


                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    )

}

export default DashboardLayout(PromotionDetails)
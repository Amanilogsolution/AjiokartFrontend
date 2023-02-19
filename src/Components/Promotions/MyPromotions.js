import React, { useState } from "react";
import DashboardLayout from "../../HOC/DashboardLayout";

import MultiSelect from "../../UI/MultiSelect/MultiSelect";
import DatePicker from "react-datepicker";
import FileUpload from "../../UI/FileUpload/FileUpload"



const MyPromotions = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (180 * 24 * 60 * 60 * 1000)));


    return (
        <React.Fragment>
            <h1 class="sticky-head">Create own Promotions</h1>

            <div className="panel-body">
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="exampleInputEmail1" className="col col-12 col-sm-3 col-md-3">
                            Promotion Type: </label>
                        <div className="col-3 col-sm-2 col-md-2">
                            <select className="custom-select">
                                <option selected>Promotion Type</option>
                                <option value="1">Freebies</option>
                                <option value="2">Coupon Code</option>
                                <option value="3">Additional Discount</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">

                    <div className="row">
                        <label htmlFor="exampleInputEmail1" className="col col-12 col-sm-3 col-md-3">
                            Select Freebies: </label>
                        <div className="col-3 col-sm-4 col-md-4">
                            <MultiSelect />
                            <small>Select Freebies using listing ID or SKU, Maximum 2 Freebies allowed per product</small>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                <div className="row">
                    <div class="col col-12 col-sm-3 col-md-3">
                        Offer duration
                                 </div>
                    <div class="col col-sm-4">
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            showTimeSelect
                            timeIntervals={15}
                            timeFormat="p"
                            dateFormat="Pp"
                            className="form-control"
                        />
                    </div>
                    <div class="col col-sm-4">
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={endDate}
                            showTimeSelect
                            timeIntervals={15}
                            timeFormat="p"
                            dateFormat="Pp"
                            className="form-control"
                        />


                    </div>
                    </div>

                </div>

                <div className="form-group">

                    <div className="row">
                        <label htmlFor="exampleInputEmail1" className="col col-12 col-sm-3 col-md-3">
                            Upload Listing ID </label>
                        <div className="col-3 col-sm-4 col-md-4">
                            <FileUpload placeholder="upload listing id" showPreview={false} />
                        </div>
                        <div className="col-3 col-sm-4 col-md-4">
                            <button className="btn btn-light">Download Sample</button>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    )

}

export default DashboardLayout(MyPromotions)
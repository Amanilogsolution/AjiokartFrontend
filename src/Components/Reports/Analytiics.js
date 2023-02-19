import React, { useState } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Analytics = () => {

    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    return (
        <React.Fragment>
            <h1 class="sticky-head">Analytics</h1>

            <div className="panel-body">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter">
                                <div className="row">
                                    <div className="col-12 col-md-12">

                                        <form class="form-inline">
                                            <label className="label  mb-2 me-sm-2">  Select Date Range</label>

                                            <DatePicker
                                                selected={startDate}
                                                onChange={date => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                className="form-control mb-2 me-sm-2"
                                            />
                                            <DatePicker
                                                selected={endDate}
                                                onChange={date => setEndDate(date)}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                className="form-control mb-2 me-sm-2"
                                            />
                                              <button className="btn btn-danger">Show</button>&nbsp;
                                <button className="btn btn-danger">Downlaod Report</button>
                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-12">


                            <div class=" table-responsive">
                                <table class="table table-bordered  table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Listing ID</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Search Impression</th>
                                            <th scope="col">Page Viewed</th>
                                            <th scope="col">Added to cart</th>
                                            <th scope="col">Check out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1233</td>
                                            <td>Men thsirt</td>
                                            <td>500</td>
                                            <td> 134</td>
                                            <td> 34</td>
                                            <td> 4</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>




                    <div className="row">

                        <div className="col col-12">
                            Nothing to display here
                    </div>

                    </div>

                    <div className="row order-header">

                        <div className="col col-12 align-self-center">
                            <nav aria-label="Page navigation example">
                                {/* <ul class="pagination">
                                    <li class="page-item"><a class="page-link">Previous</a></li>
                                    <li class="page-item"><a class="page-link"  >1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul> */}
                            </nav>
                        </div>

                    </div>



                </div>


            </div>
        </React.Fragment>
    )



}

export default DashboardLayout(Analytics);

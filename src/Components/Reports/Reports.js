import React, { useState } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reports = () => {
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
   // const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    return (
        <React.Fragment>
            <h1 class="sticky-head">Reports</h1>

            <div className="panel-body">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter">
                                <div className="row">
                                    <div className="col-12 col-md-6">

                                        <form class="form-inline">
                                            <label class="visually-hidden" for="searchbyorderid">Search by order ID</label>

                                            <select class="form-control mb-2 me-sm-2" >
                                                <option>Select Report Type</option>
                                                <option>Commision Invoice</option>
                                                <option>Payment Report</option>
                                                <option>Sales Report</option>
                                            </select>

                                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="MM/yyyy" showMonthYearPicker className="form-control mb-2 me-sm-2" />


                                            <button type="submit" class="btn btn-primary mb-2">Generate</button>
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
                                            <th scope="col">Name</th>
                                            <th scope="col">Month</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Date Created</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Payment report</td>
                                            <td>May, 2020</td>
                                            <td> 10 mb</td>
                                            <td>12-12-2020</td>
                                            <td>
                                                <button>Download</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2commision invoice</td>
                                            <td>May, 2020</td>
                                            <td> 10 mb</td>
                                            <td>12-12-2020</td>
                                            <td>
                                                <button>Download</button>
                                            </td>
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
                                <ul class="pagination">
                                    {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
                                </ul>
                            </nav>
                        </div>

                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}
export default DashboardLayout(Reports);
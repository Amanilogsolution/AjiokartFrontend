import React, { useState } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import { Dropdown, ButtonToolbar } from "react-bootstrap"
import { FaEye, FaTruck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const WithDraw = () => {
    const history = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [perPage, setPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const itemsPerPage = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setPerPage(e.target.value)
    }
    const changePage = (e, idx) => {
        e.preventDefault()
        setCurrentPage(idx)
        history({
            search: `page=${idx}`
        })
    }

    return (
        <React.Fragment>
            <h1 className="sticky-head">Payments</h1>

            <div className="container-fluid px-0 withdraw">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Ready To withdraw
                                </h2>
                                <div className="amount">0</div>
                                <button className="btn btn-danger" disabled>withdraw</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">
                                    On Hold
                                </h2>
                                <div className="amount">0</div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className="row ">
                    <div className="col-12">

                        <div className="panel-body">

                            <div className="order-list-tool">
                                <div className="container-fluid py-2">

                                    <div className="row justify-content-right">


                                        <div className="col-12 col-sm-6 d-none d-sm-flex align-items-center">
                                            <div className='filterbox'>
                                                <div className='container'>
                                                    <div className="row gy-1 gx-1 align-items-center">
                                                        <div className="col-auto px-1 align-self-center">
                                                            <label className="label mb-0"> Filter by Date</label>
                                                        </div>
                                                        <div className="col-auto px-1">
                                                            <label className="visually-hidden" htmlFor="startDate">Start date</label>
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={date => setStartDate(date)}
                                                                selectsStart
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                className="form-control"
                                                                id="startDate"
                                                            />
                                                        </div>
                                                        <div className="col-auto px-1">
                                                            <label className="visually-hidden" htmlFor="endDate">End date</label>
                                                            <DatePicker
                                                                selected={endDate}
                                                                onChange={date => setEndDate(date)}
                                                                selectsEnd
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                minDate={startDate}
                                                                className="form-control"
                                                                id="endDate"
                                                            />
                                                        </div>
                                                        <div className="col-auto px-1">
                                                            {/* <button type="submit" onClick={() => this.getDateOrder()} className="btn btn-primary btn-lg mb-5">Filter</button> */}
                                                            <button type="submit" onClick={"getDateOrder"} className="btn btn-primary">Filter</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="col-12 col-sm-6 d-flex justify-content-end py-1">
                                            <ButtonToolbar>
                                                <select className="custom-select" onChange={(e) => itemsPerPage(e)}>

                                                    <option value="10" defaultValue>10</option>
                                                    <option value="20">20</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                <p>Items per page</p>
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class=" table-responsive">
                                <table class="table table-bordered  table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Marketplace Fee</th>
                                            <th scope="col">Fixed Fee</th>
                                            <th scope="col">Collection Fee</th>
                                            <th scope="col">Shipping Fee</th>
                                            <th scope="col">COD Charges</th>
                                            <th scope="col">Order Reverse charges </th>
                                            <th scope="col">Affliate Fee </th>
                                            <th scope="col">GST (18%)</th>
                                            <th scope="col">Selletlement Amount</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td>123</td>
                                            <td>men's shit (28)</td>
                                            <td>500</td>
                                            <td>(100)</td>
                                            <td>(10)</td>
                                            <td>(15)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>(10)</td>
                                            <td>315</td>
                                            <td>Ready to withdraw</td>
                                        </tr>
                                        <tr>
                                            <td>123</td>
                                            <td>men's shit (28)</td>
                                            <td>500</td>
                                            <td>(100)</td>
                                            <td>(10)</td>
                                            <td>(15)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>0</td>
                                            <td>(10)</td>
                                            <td>315</td>
                                            <td>Withdraw in 1 day</td>
                                        </tr>
                                        <tr>
                                            <td>123</td>
                                            <td>men's shit (28)</td>
                                            <td>500</td>
                                            <td>(100)</td>
                                            <td>(10)</td>
                                            <td>(15)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>(50)</td>
                                            <td>0</td>
                                            <td>(10)</td>
                                            <td>315</td>
                                            <td>Paid</td>
                                        </tr>*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </React.Fragment >
    )



}

export default DashboardLayout(WithDraw);

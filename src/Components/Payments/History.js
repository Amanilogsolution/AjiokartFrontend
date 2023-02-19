import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import { Dropdown, ButtonToolbar } from "react-bootstrap"
import { FaDeviantart, FaEye, FaTruck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { SITEAPIURL } from '../../cons';
import useResponseHandler from '../../Hooks/HandleError';
import Loader from '../Loader/Loader';
import {GetDate } from "../../Common/Common"

const OrderInTransit = () => {
    const history = useNavigate()
    const [ErrorHandler, ShowSuccess] = useResponseHandler();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [perPage, setPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([]);



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
    const getDateOrder=()=>{

    }

    const transationHistory=()=>{

        setLoading(true);
        let page= (history.location.search.substring(0).split("=")[1]);
        axios.get(`${SITEAPIURL}/transaction-history?perPage=${perPage}&page=${page || 1}`)
        .then(res => {
            setOrders(res.data.data);
            setTotalPages(res.data.paginate.last_page)
            setLoading(false)
        }).catch(err => {
            ErrorHandler(err)
            setLoading(false)
        })
    }

    useEffect(()=>{
        transationHistory()
    },[])

    return (
        <React.Fragment>
            <h1 className="sticky-head">Orders Transit Completed</h1>
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
                </div>
            <div className="order-list-tool">
                <div className="container-fluid py-2">

                    <div className="row justify-content-right">


                        <div className="col-12 col-sm-7 d-none d-sm-flex align-items-center">
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
                                            <button type="submit" onClick={getDateOrder} className="btn btn-primary">Filter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="col-12 col-sm-5 d-flex justify-content-end py-1">
                            <div>
                            <p>Items per page</p>
                                <select className="custom-select form-control" onChange={(e) => itemsPerPage(e)}>

                                    <option value="10" defaultValue>10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel-body">
                <div className="container-fluid px-0">
                    <div className="row justify-content-right">


                        <div className="col-12">


                            <div className=" table-responsive">
                                <table className="table table-bordered  table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Invoice No</th>
                                            <th scope="col">Order Date</th>
                                            <th scope="col">Order Value</th>
                                            <th scope="col">Order Status</th>
                                            <th scope="col">Settlement Amount</th>
                                            <th scope="col">Settlement Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map(order =>  <tr key={order.invoice_no}>
                                            <td>{order.invoice_no}</td>
                                            <td>{GetDate(order.created_at)}</td>
                                            <td>{order.selling_price}</td>
                                            <td>{order.order_status}</td>
                                            <td> {
                                            (order.selling_price - 
                                            (order.fixed_fee*1.8 + (order.selling_price*order.market_place_fee)/100  )*1.8 - order.shipping_fee
                                                
                                            ).toFixed(2)} <FaEye /></td>
                                            <td>{order.deliveryDate}</td>
                                        </tr>
                                    )}

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

                        {totalPages > 1 ? <div className="col col-12 align-self-center px-0">
                            <nav aria-label="Page navigation example">

                                <ul className="pagination">
                                    {Array.from(Array(totalPages), (e, i) => {
                                        return <li className={`page-item ${currentPage == i + 1 ? "active" : null}`} key={i} ><a href="/" className="page-link" onClick={e => changePage(e, i + 1)}>{i + 1}</a></li>;
                                    })}
                                </ul>
                            </nav>
                        </div> : null}

                    </div>




                </div>


            </div>
            {loading ? <Loader /> : null}
        </React.Fragment >
    )



}

export default DashboardLayout(OrderInTransit);

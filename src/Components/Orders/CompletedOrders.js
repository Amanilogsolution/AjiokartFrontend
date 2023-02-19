import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import { Dropdown, ButtonToolbar } from "react-bootstrap"
import { FaEye, FaTruck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { SITEAPIURL, IMG_LOCATION } from '../../cons';
import useResponseHandler from '../../Hooks/HandleError';
import Loader from '../Loader/Loader';
import { GetDate } from "../../Common/Common"
import Popup from "../../UI/Modal/Modal";

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
    const [orderDetailInfo, setOrderDetailInfo] = useState({
        open: false,
        invoice_no: null,
        modalTitle: null
    });
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [query, setQuery] = useState({
        page: 1,
        perPage: 10,
        type: "intransit"
    })

    const getDateOrder = () => {
        setQuery({ ...query, startDate: dateRange.startDate, endDate: dateRange.endDate, page: 1 })
    }


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
    const getOrders = () => {

        setLoading(true);
        let page = (history.location.search.substring(0).split("=")[1]);
        axios.get(`${SITEAPIURL}/orders?type=completed&perPage=${perPage}&page=${page || 1}`)
            .then(res => {
                setOrders(res.data.data);
                setTotalPages(res.data.paginate.last_page)
                setLoading(false)
            }).catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getOrders()
    }, [])
    const viewOrderDetails = (invoice_no) => {
        setLoading(true);
        axios.get(`${SITEAPIURL}/order/${invoice_no}`)
            .then(res => {
                console.log(res)
                setOrderDetailInfo({
                    ...orderDetailInfo, open: true, invoice_no: invoice_no, modalTitle: `Order Detail for Invoice: ${invoice_no}`
                })
                setLoading(false)
            }).catch(err => {
                ErrorHandler(err)

                setLoading(false)
            })
        setOrderDetailInfo({
            ...orderDetailInfo, open: true, invoice_no: invoice_no, modalTitle: `Order Detail For Invoice: ${invoice_no}`
        })
    }
    const handleShowModalFunction = () => {
        setOrderDetailInfo({ ...orderDetailInfo, open: false, invoice_no: null, modalTitle: null })
    }
    return (
        <>
            <Popup
                heading={orderDetailInfo.modalTitle}
                showModal={orderDetailInfo.open}
                showModalFunction={() => handleShowModalFunction()}
            >
                <h1 className='h6'>
                    Product title
                </h1>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <img src="" className='img-fluid' />
                    </div>
                    <div className='col-12 col-md-9'>
                        <div className='col-12'>SKU:</div>
                        <div className='col-12'>DIN:</div>
                        <div className='col-12'>Attributes:</div>
                        <div className='col-12'>Order Value:</div>
                        <div className='col-12'>Order Date:</div>
                        <div className='col-12'>Payment Type:prepaid/cod</div>
                        <div className='col-12'>Dispatch Date:</div>
                        <div className='col-12'>Current Status:</div>
                    </div>
                </div>


            </Popup>
            <h1 className="sticky-head">Orders Transit Completed</h1>
            <div className="order-list-tool">
                <div className="container-fluid py-2">

                    <div className="row justify-content-right">


                        <div className="col-12 col-sm-7 d-none d-sm-flex align-items-center py-3">
                            <div className='filterbox'>
                                <div className='container'>
                                    <div className="row gy-1 gx-1 align-items-center">
                                        <div className="col-auto px-1 align-self-center">
                                            <label className="label mb-0"> Filter by Date</label>
                                        </div>
                                        <div className="col-auto px-1">
                                            <label className="visually-hidden" htmlFor="startDate">Start date</label>
                                            <DatePicker
                                                selected={dateRange.startDate}
                                                onChange={date => setDateRange({ ...dateRange, startDate: date })}
                                                selectsStart
                                                startDate={query.startDate}
                                                endDate={(new Date())}
                                                className="form-control"
                                                id="startDate"
                                                maxDate={(new Date())}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                        <div className="col-auto px-1">
                                            <label className="visually-hidden" htmlFor="endDate">End date</label>
                                            <DatePicker
                                                selected={dateRange.endDate}
                                                onChange={date => setDateRange({ ...dateRange, endDate: date })}
                                                selectsEnd
                                                startDate={dateRange.startDate}
                                                maxDate={(new Date())}
                                                className="form-control"
                                                id="endDate"
                                                dateFormat="dd/MM/yyyy"
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




                        <div className="col-12 col-sm-5 py-3">
                            <div className='d-flex justify-content-end align-items-center'>

                                <label htmlFor='itemsPerPage' className='mb-0 me-1'>Items Per Page: </label>
                                <select id="itemsPerPage" className="form-control" style={{ width: 100 }} onChange={(e) => itemsPerPage(e)}>

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
                                            <th scope="col" colSpan={3}>Product Information</th>
                                            <th scope="col">Order Date</th>
                                            <th scope="col">Order Value</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Last Updated</th>
                                            <th scope="col">View Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => <tr key={order.invoice_no}>
                                            <td>{order.invoice_no}</td>
                                            <td>
                                                <img src={`${IMG_LOCATION}/productImages/ThumbNail-${order.images[0]}`} alt={order.productTitle} className="img-fluid" />
                                            </td>
                                            <td>
                                                <div className='d-inline-block'>
                                                    {order.productTitle}<br />
                                                    <span className='v-label'>SKU: </span><span className='v-val'></span>
                                                    <span className='v-label'>DIN: </span><span className='v-val'></span>
                                                    {order.varitions.map((va, i) => Object.entries(va).map(([key, val], j) => <span key={i + j}>
                                                        <span className='v-label'>{i === 0 ? "" : ","}{key}: </span>
                                                        <span className='v-val'>{val}
                                                        </span>
                                                    </span>))}
                                                </div>
                                            </td>
                                            <td>
                                                Quantity:1<br />
                                                Promotion Applied<br />
                                                Affiliate Sell<br />
                                            </td>
                                            <td>{GetDate(order.created_at)}</td>

                                            <td>{order.selling_price}</td>
                                            <td>{order.order_status === 'Cancelled' ?
                                                order.cancel_by === 'seller' ? "Cancelled by you" : "Cancelled by Customer"
                                                : order.order_status
                                            } </td>
                                            <td>{GetDate(order.updated_at)}</td>
                                            <td>
                                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <button onClick={() => viewOrderDetails(order.invoice_no)} className='btn btn-primary' aria-label='view order detail'><FaEye /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>




                    {!orders.length ? <div className="row">

                        <div className="col col-12">
                            No orders to display
                        </div>

                    </div> : null}

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
        </>
    )



}

export default DashboardLayout(OrderInTransit);

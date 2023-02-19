import React, { useState, useEffect } from 'react';

import DashboardLayout from '../../HOC/DashboardLayout';
import { Dropdown, ButtonToolbar } from "react-bootstrap"
import { FaTimes, FaShippingFast, FaPrint, FaList, FaFileAlt } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./orders.scss";
import useResponseHandler from '../../Hooks/HandleError';
import Axios from "axios";
import { IMG_LOCATION, SITEAPIURL } from "../../cons"
import { useNavigate } from "react-router-dom";
import Popup from "../../UI/Modal/Modal";
import Loader from '../Loader/Loader';
import { DownloadFile, GetDate } from "../../Common/Common";

const NewOrder = () => {
    const [ErrorHandler, ShowSuccess] = useResponseHandler();
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false)
    const [orderCancelAlert, setOrderCancelAlert] = useState({
        open: false,
        invoice_no: null,
        modalTitle: "Cancel Order"
    });
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [totalPages, setTotalPages] = useState(0);
    const history = useNavigate();
    const [checkedOrders, setCheckedOrder] = useState([])
    const [query, setQuery] = useState({
        page: 1,
        sortBy: "default",
        perPage: 10,
        type: "active"
    })

    useEffect(async () => {
        setQuery({ ...query, page: 1 })
    }, []);

    const getOrders = (page, s) => {
        setLoading(true)
        let urlQuery = new URLSearchParams(query).toString();
        console.log(urlQuery)
        Axios.get(`${SITEAPIURL}/orders?${urlQuery}`)
            .then(res => {
                setOrder(res.data.data);
                setTotalPages(res.data.paginate.last_page)
                setLoading(false)
            }).catch(err => {
                ErrorHandler(err)
                setLoading(false)
            })
    }
    const changePage = (e, idx) => {
        e.preventDefault()
        setQuery({ ...query, page: idx })
        history.push({
            search: `page=${idx}`
        })
    }
    useEffect(() => {
        getOrders(query.page, query.sortBy)
    }, [query.perPage, query.sortBy, query.page, query.startDate, query.endDate])


    const getDateOrder = () => {
        setQuery({ ...query, startDate: dateRange.startDate.toLocaleDateString(), endDate: dateRange.endDate.toLocaleDateString(), page: 1 })
    }
    const changeSorting = (type) => {
        setQuery({ ...query, page: 1, sortBy: type })

    }


    const cancelOrder = (invoice_no) => {
        setOrderCancelAlert({
            ...orderCancelAlert,
            open: true,
            invoice_no

        })

    }
    const confirmCancel = () => {
        Axios.put(`${SITEAPIURL}/orders/cancel/${orderCancelAlert.invoice_no}`)
            .then(res => {
                handleShowModalFunction()
                ShowSuccess(res?.data?.message)
                getOrders((history.location.search.substring(0).split("=")[1]), query.sortBy)
            }).catch(err => {
                ErrorHandler(err)
            })
    }

    const handleShowModalFunction = () => {
        setOrderCancelAlert({ ...orderCancelAlert, open: false, invoice_no: null })
    }
    const printInvoice = (invoice_no) => {
        let invoices = typeof invoice_no === 'string' ? [invoice_no] : invoice_no

        Axios.post(`${SITEAPIURL}/orders/invoice`, {
            invoice_no: invoices
        })
            .then(res => {
                res.data.path.forEach(file => {
                    let filePath = `${IMG_LOCATION}/invoices/${file}`;
                    DownloadFile(filePath, file)
                })


            }).catch(err => {
                ErrorHandler(err)
            })
    }
    const downloadBulkInvoice = () => {
        let orders = [...checkedOrders]
        printInvoice(orders)
    }
    const printPackagingSlip = (invoice_no) => {
        let invoices = typeof invoice_no === 'string' ? [invoice_no] : invoice_no
        Axios.post(`${SITEAPIURL}/orders/packagingslip`, {
            invoice_no: invoices
        })
            .then(res => {
                let filePath = `${IMG_LOCATION}/packaging_slips/${res.data.path}`;
                DownloadFile(filePath, res.data.path)
            }).catch(err => {
                ErrorHandler(err)
            })

    }
    const downloadBulkPackagingSlip = () => {
        let orders = [...checkedOrders]
        printPackagingSlip(orders)
    }
    const readyForDispatch = (invoice_no) => {
        Axios.post(`${SITEAPIURL}/orders/readyfordispatch`, {
            invoice_no
        })
            .then(res => {
                console.log(res)
            }).catch(err => {
                ErrorHandler(err)
            })

    }
    const bulkReadyToShip = () => {
        let orders = [...checkedOrders]
        readyForDispatch(orders)
    }
    const generateManifest = (invoice_no) => {
        Axios.post(`${SITEAPIURL}/orders/generateManifest`, {
            invoice_no
        })
            .then(res => {
                console.log(res)
            }).catch(err => {
                ErrorHandler(err)
            })

    }
    const bulkGenerateManifest = () => {
        let orders = [...checkedOrders]
        generateManifest(orders)
    }
    const itemsPerPage = (e) => {
        e.preventDefault()
        setQuery({ ...query, page: 1, perPage: e.target.value })
    }
    const getSla = (date) => {
        let day = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
        return `${day}`
    }
    const toggleAll = (e) => {
        let checked = []
        document.querySelectorAll('.order-checkbox').forEach(it => {
            it.checked = e.target.checked;
            if (e.target.checked) {
                checked.push(it.dataset.invoice_no)
            }
        })

        setCheckedOrder(checked)
    }
    const toogleSingle = (e) => {
        let checkedItems = [...checkedOrders]
        let inarray = checkedItems.filter(el => el === e.target.dataset.invoice_no)

        if (e.target.checked && !inarray.length) {
            checkedItems = [...checkedItems, e.target.dataset.invoice_no]

        } else {
            let findidx = checkedItems.findIndex(el => el === e.target.dataset.invoice_no)
            checkedItems.splice(findidx, 1);
        }
        console.log(checkedItems)
        setCheckedOrder(checkedItems)
    }
    useEffect(() => {
        document.querySelector('.checkAll').checked = false
        if (checkedOrders.length > 0 && checkedOrders.length == document.querySelectorAll('.order-checkbox').length) {
            document.querySelector('.checkAll').checked = true
        }

    }, [checkedOrders])
    return (
        <React.Fragment>

            <Popup
                heading={orderCancelAlert.modalTitle}
                showModal={orderCancelAlert.open}
                showModalFunction={() => handleShowModalFunction()}
            >
                <p>
                    Canceling order will cost 10% processing fee of total order value.
                </p>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 text-right">
                            <button type="submit" className="btn btn-success me-2" onClick={() => handleShowModalFunction()}>Cancel</button>
                            <button type="submit" className="btn btn-danger" onClick={confirmCancel}>I Agree</button>
                        </div>
                    </div>
                </div>

            </Popup>

            <h1 className="sticky-head">Orders</h1>
            <div className="order-list-tool">
                <div className="container-fluid">

                    <div className="row justify-content-right">


                        <div className="col-12 col-sm-12 justify-content-end d-none d-sm-flex align-items-center">
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


                        <div className="col-12 col-sm-6 py-3">
                        <div className='d-flex justify-content-start align-items-center'>

                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    Bulk Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={downloadBulkInvoice}>Download Invoices</Dropdown.Item>
                                    <Dropdown.Item onClick={downloadBulkPackagingSlip}>Download Packaging Slips</Dropdown.Item>
                                    <Dropdown.Item onClick={bulkGenerateManifest}>Download Manifest</Dropdown.Item>
                                    <Dropdown.Item onClick={bulkReadyToShip}>Ready To Ship</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </div>


                        <div className="col-12 col-sm-6 py-3">
                            <div className='d-flex justify-content-end align-items-center'>
                                <label htmlFor='itemsPerPage' className='mb-0 me-1'>Sort By: </label>
                                <select className="form-control me-5" style={{ width: 100 }} onChange={(e) => changeSorting(e.target.value)}>
                                    <option value="default" defaultValue>Default</option>
                                    <option value="sla" defaultValue>SLA</option>
                                </select>


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
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12 px-0">
                            <div className="table-responsive">
                                <table className="table  table-bordered table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>
                                                <label>
                                                    <input
                                                        className="form-check-input checkAll"

                                                        type="checkbox"
                                                        onChange={e => toggleAll(e)}
                                                        defaultChecked={false}
                                                    />
                                                    <span className="visually-hidden"> Select all</span>
                                                </label>
                                            </th>
                                            <th> Invoice No</th>
                                            <th colSpan={3}>Product Information</th>
                                            <th>Buyer Details</th>
                                            <th>Amount</th>
                                            <th>Order Date</th>
                                            <th>SLA</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((item) =>

                                            <tr key={item.invoice_no} className={getSla(item.SLA_date) <= 0 ? "table-danger" : ""}>
                                                <td>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input order-checkbox"
                                                            data-invoice_no={item.invoice_no}
                                                            type="checkbox"
                                                            onChange={e => toogleSingle(e)}
                                                            id={`label_${item.invoice_no}`}
                                                        />

                                                        <label className="form-check-label visually-hidden" htmlFor={`label_${item.invoice_no}`}>{`select invoice ${item.invoice_no}`}</label>
                                                    </div>
                                                </td>
                                                <td>

                                                    {item.invoice_no}
                                                </td>
                                                <td>
                                                    <img src={`${IMG_LOCATION}/productImages/ThumbNail-${item.images[0]}`} alt={item.productTitle} className="img-fluid" />
                                                </td>
                                                <td>
                                                    <div className='d-inline-block'>
                                                        {item.productTitle}<br />
                                                        <span className='v-label'>SKU: </span><span className='v-val'></span>
                                                        <span className='v-label'>DIN: </span><span className='v-val'></span>
                                                        {item.varitions.map((va, i) => Object.entries(va).map(([key, val], j) => <span key={i + j}>
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
                                                <td> <strong>{item.buyer_name}</strong>,<br />
                                                    {item.city} <br />
                                                    {item.state}-{item.pin}, <br />
                                                </td>



                                                <td>     ₹ {item.selling_price}</td>
                                                <td> {GetDate(item.created_at)}</td>
                                                <td>
                                                    {getSla(item.SLA_date)} {getSla(item.SLA_date) > 1 ? "Days" : "Day"}
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                                        <button className="btn btn-danger" onClick={() => cancelOrder(item.invoice_no)}><FaTimes /> <span className="visually-hidden"> Cancel Order</span></button>
                                                        <button className="btn btn-primary" onClick={() => printInvoice(item.invoice_no)}><FaFileAlt /> <span className="visually-hidden"> Print Invoice</span></button>
                                                        <button className="btn btn-warning" onClick={() => printPackagingSlip(item.invoice_no)}><FaPrint /> <span className="visually-hidden"> Print Invoice</span></button>


                                                        <button className="btn btn-success" onClick={() => readyForDispatch(item.invoice_no)}> <FaShippingFast /> <span className="visually-hidden">Ready to Dispatch</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>




                                </table>

                            </div>
                        </div>

                    </div>







                    {!order.length ? <div className="row">

                        <div className="col col-12">
                            No orders to display
                        </div>

                    </div> : null}

                    <div className="row order-header">

                        {totalPages > 1 ? <div className="col col-12 align-self-center px-0">
                            <nav aria-label="Page navigation example">

                                <ul className="pagination">
                                    {Array.from(Array(totalPages), (e, i) => {
                                        return <li className={`page-item ${query.page == i + 1 ? "active" : null}`} key={i} ><a href="/" className="page-link" onClick={e => changePage(e, i + 1)}>{i + 1}</a></li>;
                                    })}
                                </ul>
                            </nav>
                        </div> : null}

                    </div>



                </div>
            </div>

            {loading ? <Loader /> : null}
        </React.Fragment>
    )

}



export default DashboardLayout(NewOrder);

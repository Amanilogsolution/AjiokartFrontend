import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { IMG_LOCATION, SITEAPIURL } from '../../../cons';
import DashboardLayout from '../../../HOC/DashboardLayout';
import ApplyForBrand from "./ApplyForBrand"
import "./Brand.scss"
import Loader from '../../Loader/Loader';
import useResponseHandler from '../../../Hooks/HandleError';
const Brands = (props) => {
    const [ErrorHandler]=useResponseHandler()
    const [brandList, setBrandList] = useState([]);
    const [message, setMessage] = useState();
    const [listLoading, setListLoading] = useState(false);
    const [perPage, setPerPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [toRecords, setToRecords] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);
    const [fromRecords, setFromRecords] = useState(1);


    useEffect(() => {
        setMessage(props.location.search.split("=")[1])
    }, [props.location.search])

    const loadData = useCallback((page) => {
        window.scrollTo(0, 0)
        if (page !== 1) {
            setFromRecords(page * perPage - perPage + 1)
        }


        setListLoading(true)
        axios.get(`${SITEAPIURL}/brand-list?page=${page}`)
            .then(res => {
                setBrandList(res.data.data)
                setPerPage(res.data.per_page)
                setTotalRecords(res.data.total)
                setToRecords(res.data.to)
                setNoOfPages(res.data.links.length - 2)
                setListLoading(false)
            })
            .catch(err => {
                ErrorHandler(err)
                setListLoading(false)
            })

    }, [perPage])

    useEffect(() => {
        loadData(1)

    }, [])

    return (
        <React.Fragment>
            <h1 className="sticky-head">Manage Brand</h1>

            {message ? <p className="alert alert-success" role="alert">{decodeURI(message)}</p> : null}

            <div className="container-fluid mb-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-6 p-0">
                        <div className="brand-req">
                            <p>
                                Apply for Brand Approval
            </p>
                            <NavLink to="/add-new-brand" className="btn btn-primary">Add New Brand</NavLink>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 p-0">
                        <div className="brand-req">
                            <ApplyForBrand />
                        </div>
                    </div>
                </div>
            </div>

            {listLoading && <Loader />}
            {brandList.length ? <>
                <h2 className="panel-heading">My Brands</h2>
                <div className="panel-body">

                    <div className="form-group">

                        <div className="table-responsive">
                            <table className="table table-bordered  table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ minWidth: 85 }}>Brand ID</th>
                                        <th scope="col" className="text-center text-sm-left">Brand</th>
                                        <th scope="col" style={{ minWidth: 180 }}>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {brandList.map(brand => <tr key={brand.id}>
                                        <th scope="row">{brand.id}</th>
                                        <td className="text-center text-sm-left">{brand.brandLogo ? <img src={`${IMG_LOCATION}/brandLogo/50-${brand.brandLogo}`} alt={brand.brandName} width="70" /> : null} {brand.brandName}</td>
                                        <td className="brand-status">

                                            <p className="mb-0"><span>Request Id: </span>
                                                {brand.requestId}</p>
                                            <p className="mb-0"><span>Status: </span>
                                                {brand.status === 0 ? "Pending" : brand.status === 1 ? "Approved" : brand.status === 2 ? "Rejected" : "Blocked"}</p>
                                            {(brand.reasondescription) ? <p className="mb-0"><span>Reason: </span>{brand.reasondescription}</p> : null}
                                            {brand.status === 2? <NavLink className="btn-link" to={`add-new-brand/${brand.requestId}`}>Reapply</NavLink>:null}


                                        </td>

                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <p>showing {fromRecords} - {toRecords} of {totalRecords}</p>

                        <nav aria-label="Page navigation ml-5">
                            <ul className="pagination">
                                {Array.from(Array(noOfPages), (e, i) => {
                                    return <li className="page-item" key={i} ><a href="/" className="page-link" onClick={e => loadData(i + 1)}>{i + 1}</a></li>;
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>

            </> : null}





        </React.Fragment>
    )



}

export default DashboardLayout(Brands);

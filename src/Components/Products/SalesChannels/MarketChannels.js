import React, { useState, useEffect } from 'react';
import { FaDownload, FaEdit, FaStoreAlt, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import DashboardLayout from '../../../HOC/DashboardLayout';
import { SITEAPIURL, IMG_LOCATION } from '../../../cons';
import "./Markets.scss";
import Popup from "../../../UI/Modal/Modal";
import useResponseHandler from '../../../Hooks/HandleError';
import UpdateMarkets from "./UpdateMarkets"
import Loader from "../../Loader/Loader";

const MarketChannels = () => {
    const [ErrorHandler] = useResponseHandler()
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    const [compState, setCompstate] = useState({
        showModal: false,
        markets: [],
        enabledMarkets: [],
        enablingMarket: false,
        userMarkets: [],
        showEditModal: false,
        currentEditing: null
    })


    const toggleEditModal = () => {
        setCompstate({ ...compState, showEditModal: !compState.showEditModal })
    }
    const toggleModal = () => {
        setCompstate({ ...compState, showModal: !compState.showModal })
    }

    const setEnabledMarket = (e) => {
        let market = e.target.value;
        setCompstate(compState => ({ ...compState, enablingMarket: true }))
        let obj = {}
        obj[market] = e.target.checked
        axios.post(`${SITEAPIURL}/enableMarket`, obj)
            .then(res => {
                getMarketsList()

                setCompstate(compState => ({ ...compState, enablingMarket: false, showModal: false }))
            }, err => {
                setCompstate(compState => ({ ...compState, enablingMarket: false }))
            })
    }
    const downloadExcel = () => {
        axios.get(`${SITEAPIURL}/manage-markets`)
            .then(res => {
                let a = document.createElement("a");
                a.href = res.data.path;
                a.download = true;
                document.body.append(a);
                a.click();
                a.remove();

            },
                err => {
                    ErrorHandler(err)
                })
    }
    const uploadExcel = (e) => {
        const formData = new FormData();
        formData.append("excel", e.target.files[0])
        formData.append("name", e.target.files[0])

        axios.post(`${SITEAPIURL}/manage-markets`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            },

        })
            .then(res => {

                // e.target.value = ""

            },
                err => {
                    ErrorHandler(err)
                })
    }
    const changePage = (e, idx) => {
        e.preventDefault()
        setPageNumber(pageNumber => idx)

    }
    const getMarketsList = () => {
        setLoading(true)
        axios.get(`${SITEAPIURL}/maketMapping?pageNumber=${pageNumber}&perPage=10`)
            .then(res => {
                window.scrollTo(0, 0)
                let temp = { ...compState }
                let pages = 1;
                for (let i = 1; i < (+res.data.totalRecords) / 10; i++) {
                    pages = pages + 1;
                }

                setCompstate(compState => ({ ...temp, userMarkets: res.data.data, totalPages: pages }))
                getAvilableMarkets()
                setLoading(false)

            }, err => {
                ErrorHandler(err)
                getAvilableMarkets()
                setLoading(false)
            })
    }

    const getAvilableMarkets = () => {
        axios.get(`${SITEAPIURL}/getAvilablaeMarket`)
            .then(res => {
                if (res) {
                    setTimeout(() => {
                        let enabledMarkets = res.data.data.filter(el => el.isEnabled === true)
                        setCompstate(compState => ({ ...compState, markets: res.data.data, enabledMarkets: enabledMarkets }))

                    }, 500);
                }

            }, err => {
                ErrorHandler(err)
            })
    }

    useEffect(() => {
        getMarketsList()

    }, [pageNumber])
    const edit = (name, din, value, productId, marketId) => {
        setCompstate({
            ...compState, currentEditing: {
                name, din, value, productId, marketId
            }, showEditModal: true
        })

    }
    const QuickupdateData = (data) => {
        let temp = { ...compState }
        let pro = temp.userMarkets.filter(el => el.din === data.din)[0]
        pro.markets.filter(el => el.id === data.marketId)[0].value = data.identifier;
        setCompstate(compState => ({ ...temp, showEditModal: false }))
    }


    return (
        <React.Fragment>
            < Popup heading={"Enable/Disable Markets"}
                showModal={compState.showModal} showModalFunction={toggleModal}>
                <div className="row">
                    {compState.markets.map((market) => <div className="col-12 col-sm-6" key={market.name}>

                        <input type="checkbox" onChange={e => setEnabledMarket(e)} value={market.name} id={market.name}
                            checked={market.isEnabled || false}

                        /> <label htmlFor={market.name}>{market.displayName.toUpperCase()}</label>
                    </div>)}
                </div>
                {compState.enablingMarket ? <div className="spinner mx-auto my-3"></div> : null}

            </Popup>
            <h1 className="sticky-head">Map Products Across Markets   </h1>
            <div className="row">
                <div className="col-12 text-center">
                    <div className="marketsBanner mb-3">
                        <p className="h5">Build the trust amoung your customers by showing your avilablity across the markets.</p>
                        <p className="h6">Enable your markets by clicking manage markets and choose the markets you want to map</p>
                        <p className="p">You can map your products in bulk by import/export excel sheets.</p>

                        <div className="text-center mt-4">
                            <button className="btn btn-primary mx-2" onClick={toggleModal}><FaStoreAlt /> Manage Markets</button>
                            <button className="btn btn-danger mx-2" onClick={downloadExcel}><FaDownload /> Export</button>
                            <input type="file" id="uploadMarketfile" onChange={uploadExcel} />
                            <label htmlFor="uploadMarketfile" className="btn btn-success mx-2"><FaUpload /> Import</label>
                        </div>
                    </div>
                </div>
            </div>


            <div className="panel-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th style={{ minWidth: 255 }}>Product</th>
                                <th style={{ minWidth: 155 }}>DIN</th>
                                {compState.userMarkets && compState.userMarkets.length ? compState.userMarkets[0].markets.map((el, i) => <th key={i} style={{ minWidth: 158 }}>{el.displayName} {el.identifierName.replace(/_/g, " ")}</th>) : null}


                            </tr>
                        </thead>
                        <tbody>
                            {compState.userMarkets && compState.userMarkets.map((m, i) => <tr key={m.din + '_' + i} data-din="123">

                                <td>
                                    <div className="proInfo">
                                    <img src={`${IMG_LOCATION}/productImages/${m.thumbnail}`} width="70" alt={m.productTitle} className="img-fluid" />
                                    <p className="mb-0 product-title">{m.productTitle}<br />


                                        {m.variations.map((el, i) => <strong key={i}>{i == 0 ? "" : ", "}{el.name}:{el.value}</strong>)}


                                    </p>
                                    </div></td>
                                <td>{m.din}</td>



                                {m.markets.map((el, i) => <td key={m.din + '-' + i}>
                                    <div className="marketbox">
                                        {el.value ? el.value : "-"}
                                        <button className="btn btn-link" onClick={e => edit(el.name, m.din, el.value, m.productId, el.id)}><FaEdit /></button>
                                    </div>

                                </td>)}



                            </tr>)}
                        </tbody>


                    </table>
                </div>

                <div className="row order-header">
                    {compState.totalPages > 1 ? <div className="col col-12 align-self-center">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {Array.from(Array(compState.totalPages), (e, i) => {
                                    return <li className="page-item" key={i} ><a href="/" className="page-link" onClick={e => changePage(e, i + 1)}>{i + 1}</a></li>;
                                })}
                            </ul>
                        </nav>
                    </div> : null}

                </div>
            </div>
            < Popup heading={"Update Market Identifier"}

                showModal={compState.showEditModal} showModalFunction={toggleEditModal}>
                <UpdateMarkets currentEditing={compState.currentEditing} QuickupdateData={QuickupdateData} />

            </Popup>
            {loading ? <Loader /> : null}

        </React.Fragment>
    )



}

export default DashboardLayout(MarketChannels);

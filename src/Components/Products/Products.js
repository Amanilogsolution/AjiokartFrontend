import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import { Dropdown } from "react-bootstrap";
import { FaPencilAlt, FaEllipsisV } from 'react-icons/fa';
import Popup from "../../UI/Modal/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { IMG_LOCATION, SITEAPIURL } from '../../cons';
import Loader from "../Loader/Loader";
import QuickUpdate from "./QuickUpdate/QuickUpdate";
import useResponseHandler from '../../Hooks/HandleError';

const AllProducts = () => {
    const [ErrorHandler, ShowWarning] = useResponseHandler()
    const [bulkActionError, setBulkActionError] = useState([])
    const history = useNavigate()
    const [currentEditing, setCurrentEditing] = useState({
        modalTitle: "",
        currentValue: "",
        sku: "",
        din: "",
        type: ""

    })
    const [compState, setCompState] = useState({
        showModal: false,
        currentListing: 'active',
        itemPerPage: 15,
        currentPage: 1,
        loading: false,
        checkedItems: [],
        searchProductError: false,
        products: [],
        productsStatus: null,
        totalPages: 0,
    })



    const QuickupdateData = (data) => {
        let tempState = { ...compState }
        let findItem = tempState.products.data.filter(el => el.din === data.din)
        let findItemIdx = tempState.products.data.findIndex(el => el.din === data.din)
        tempState.products.data[findItemIdx] = { ...findItem[0], ...data };
        setCompState(compState => ({ ...compState, ...tempState, showModal: false }))
    }


    useEffect(() => {

        let search = history.location.search.substring(1);
        let obj;
        if (search) {
            obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        }
        setCompState(compState => ({ ...compState, currentListing: (obj?.products || "active"), currentPage: (obj?.currentPage || 1) }))

    }, [history.location.search])
    const modalShowUpdatePrice = (type, mrp, sku, din, sellingPrice) => {


        switch (type) {
            case "mrp":

                setCurrentEditing({ ...currentEditing, modalTitle: "Update MRP", mrp, sku, din, sellingPrice, type });

                break;
            case "sellingPrice":
                setCurrentEditing({ ...currentEditing, modalTitle: "Update Selling Price", mrp, sku, din, sellingPrice, type });
                break;
            default:
                return
        }

        setCompState({ ...compState, showModal: true })
    }

    const modalShow = (type, currentValue, sku, din) => {
        setCurrentEditing({ ...currentEditing, modalTitle: "Update Stock Inventory", currentValue: currentValue, sku: sku, din: din, type });



        setCompState({ ...compState, showModal: true })
    }
    const handleShowModalFunction = () => {
        setCompState({ ...compState, showModal: false })
    }
    const getFreshList = (e, listType) => {
        history({
            search: `?products=${listType}&currentPage=1`
        })
        setCompState(compState => ({ ...compState, currentListing: listType, currentPage: 1 }))
        getData(listType, 1);
    }
    const getData = (currentListing, currentPage) => {
        setCompState(compState => ({ ...compState, loading: true }))
        Axios.get(`${SITEAPIURL}/getProducts?status=${currentListing}&itemPerPage=${compState.itemPerPage}&currentPage=${currentPage}&sortBy=DESC`)
            .then(res => {
                let pages = 1;
                for (let i = 1; i < (+res.data.totalRecords) / compState.itemPerPage; i++) {
                    pages = pages + 1;
                }
                setCompState(compState => ({ ...compState, loading: false, products: res.data, totalPages: pages }))

            },
                err => {
                    ErrorHandler(err)
                    setCompState(compState => ({ ...compState, loading: false, products: [], totalPages: 0 }))
                })
    }
    const toggleAll = (e) => {
        let checkItem = [];
        document.querySelectorAll('.product-checkbox').forEach(it => {
            it.checked = e.target.checked;
            if (e.target.checked) {
                checkItem.push(it.dataset.din)
            }
        })
        setCompState({ ...compState, checkedItems: [...checkItem] })
    }
    const toogleSingle = (e) => {
        let checkedItems = [...compState.checkedItems]
        let inarray = checkedItems.filter(el => el === e.target.dataset.din)

        if (e.target.checked && !inarray.length) {
            checkedItems = [...checkedItems, e.target.dataset.din]



        } else {
            let findidx = checkedItems.findIndex(el => el === e.target.dataset.din)

            checkedItems.splice(findidx, 1);


        }
        setCompState({ ...compState, checkedItems: [...checkedItems] })


    }
    useEffect(() => {
        if (compState.checkedItems.length > 1 && compState.checkedItems.length == document.querySelectorAll('.product-checkbox').length) {
            document.querySelector('.checkall').checked = true
        } else {
            document.querySelector('.checkall').checked = false
        }
    }, [compState.checkedItems])
    useEffect(() => {

        if (!compState.currentListing) {
            setCompState(compState => ({ ...compState, currentListing: "active" }))
        }
        getFreshList(null, (compState.currentListing || "active"))


    }, [])

    const changePage = (e, idx) => {
        e.preventDefault()
        history({
            search: `?products=${compState.currentListing}&currentPage=${idx}`
        })
        setCompState(compState => ({ ...compState, currentPage: idx, }))
        getData(compState.currentListing, idx)

    }
    const copyListing = (e) => {

    }
    const addVariantToListing = (e) => {

    }


    const searchProduct = (e) => {
        e.preventDefault()


        setCompState(compState => ({ ...compState, loading: true, currentListing: null }));

        let value = document.querySelector('#findProd').value.trim();
        document.querySelectorAll('input[name=options]').forEach(el => el.checked = false)

        if (!value) {
            setCompState({ ...compState, searchProductError: true });
            return;
        }
        Axios.post(`${SITEAPIURL}/findProuct`, {
            term: value,
            searchFor: ["din", "title", "sku"]
        }).then(res => {
            let pages = 1;
            for (let i = 1; i < (+res.data.totalRecords) / compState.itemPerPage; i++) {
                pages = pages + 1;
            }
            setCompState(compState => ({ ...compState, loading: false, products: res.data, totalPages: pages }))
        }, err => {
            setCompState(compState => ({ ...compState, loading: false }));
            ErrorHandler(err);
        })
    }
    const BulkAction = (e) => {
        e.preventDefault()
        let err = [];
        setBulkActionError(bulkActionError => ([]))
        if (!document.querySelector(".actionToPerform").value) {
            err.push('Please select an action to perform')
        }

        let din = [], url = "";
        document.querySelectorAll('.product-checkbox').forEach(it => {

            if (it.checked) {
                din.push(it.dataset.din)
            }
        })
        if (!din.length) {
            err.push('Please select products')


        }
        setBulkActionError(err)
        if (err.length) {
            return
        }
        if (document.querySelector(".actionToPerform").value === "deactivate") {

            url = "decativateListing"
        }
        if (document.querySelector(".actionToPerform").value === "archive") {
            url = "archiveListing"

        }
        updateProductStatus(din, url)
    }
    const updateProductStatus = (din, url) => {
        Axios.post(`${SITEAPIURL}/${url}`, {
            din
        })
            .then(res => {
                let temp = { ...compState }
                din.forEach((el) => {
                    let idx = temp.products.data.findIndex(elm => elm.din == el)
                    temp.products.data.splice(idx, 1)
                })
                if (url === "archiveListing") {
                    temp.products.total.archivedProducts += din.length;

                }
                if (url === "decativateListing") {
                    temp.products.total.deactiveProducts += din.length
                }
                if (!compState.productsStatus) {
                    temp.products.total.activeProducts -= din.length
                } else {
                    alert(compState.productsStatus)
                }
                setCompState(compState => ({ ...compState, ...temp }))
                ShowWarning(`Your request has been processed`)
            }, err => {
                ErrorHandler(err)
            })

    }
    const archiveListing = (e, productId, dinNumber) => {
        e.preventDefault();
        let din = []
        din.push(dinNumber)
        updateProductStatus(din, "archiveListing")

    }
    const deactivateListing = (e, productId, dinNumber) => {
        e.preventDefault()
        let din = []
        din.push(dinNumber)

        updateProductStatus(din, "decativateListing")


    }

    return (
        <React.Fragment>
            <h1 className="sticky-head">Products</h1>
            < Popup heading={currentEditing.modalTitle}
                showModal={compState.showModal} showModalFunction={() => handleShowModalFunction()}>
                <QuickUpdate currentEditing={currentEditing} QuickupdateData={QuickupdateData} />
            </Popup>
            <div className="table-responsive">
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <div className="collapse navbar-collapse listingtype-group" id="navbarSupportedContent">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={`btn btn-secondary ${compState.currentListing === "active" ? "active" : null}`}>
                                <input type="radio" name="options" id="option1" className='visually-hidden'
                                    onChange={e => getFreshList(e, 'active')} />
                                {compState?.products?.total?.activeProducts || 0}
                                <br />
                                Active listing
                            </label>

                            <label className={`btn btn-secondary ${compState.currentListing === "pending" ? "active" : null}`}>
                                <input type="radio" name="options" id="option3"  className='visually-hidden'
                                    onChange={e => getFreshList(e, 'pending')} /> {compState?.products?.total?.pendingProducts || 0} <br />Under Review
                            </label>
                            <label className={`btn btn-secondary ${compState.currentListing === "rejeted" ? "active" : null}`}>
                                <input type="radio" name="options" id="option2"  className='visually-hidden'
                                    onChange={e => getFreshList(e, 'rejeted')}

                                />  {compState?.products?.total?.rejetedProducts || 0} <br />Rejected
                            </label>

                            <label className={`btn btn-secondary ${compState.currentListing === "archived" ? "active" : null}`}>
                                <input type="radio" name="options" id="option3"  className='visually-hidden'
                                    onChange={e => getFreshList(e, 'archived')}

                                /> {compState?.products?.total?.archivedProducts || 0} <br />Archived listing
                            </label>

                            <label className={`btn btn-secondary ${compState.currentListing === "blocked;inactive" ? "active" : null}`}>
                                <input type="radio" name="options" id="option3"  className='visually-hidden'
                                    onChange={e => getFreshList(e, 'blocked;inactive')}
                                />{(compState?.products?.total?.blockedProducts + compState?.products?.total?.inactiveProducts) || 0} <br />Inactive Or Blocked
                            </label>

                        </div>
                    </div>
                </nav>
            </div>
            <div className="panel-body">
                <div className="filter">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <form className="form-inline" onSubmit={BulkAction}>
                                <select className="form-control mb-2 me-sm-2 actionToPerform" name="actionToPerform">
                                    <option value="">Bulk Actions</option>
                                    <option value="deactivate">Deactivate Listing</option>
                                    <option value="archive">Archive Listing</option>
                                </select>
                                <button type="submit" className="btn btn-primary mb-2">Apply </button>
                            </form>
                            {bulkActionError.map((err, i) => <span className="d-block text-danger">
                                {err}
                            </span>)}
                        </div>
                        <div className="col-12 col-sm-6">
                            <form className="form-inline" onSubmit={searchProduct}>
                                <label className="visually-hidden" htmlFor="findProd">Search for DIN, Title or SKU ID</label>
                                <input type="text"
                                    className="form-control mb-2 me-sm-2"
                                    id="findProd"
                                    placeholder="Search for DIN, Title or SKU ID"
                                    onChange={e => setCompState({ ...compState, searchProductError: false })} />
                                <button type="submit" className="btn btn-primary mb-2">Submit</button>
                                {compState.searchProductError ? <span className="help-text text-danger d-block">Please enter search term</span> : null}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="product-list">
                    <div className="row">
                        <div className="col col-sm-12">
                            <div className="table-responsive">
                                <table className="table  table-bordered table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col" width="40px"><label className="mb-0">
                                                <input type="checkbox" className="checkall" name="selectAll"
                                                    onChange={e => toggleAll(e)}
                                                /><span className="visually-hidden"> Select all</span></label></th>
                                            <th scope="col">Product Details</th>
                                            <th scope="col">Category</th>
                                            <th scope="col" width="115">Fulfillment By</th>
                                            <th scope="col" width="145px">MRP</th>
                                            <th scope="col" width="145px">Selling Price</th>
                                            <th scope="col" width="145px">Inventory</th>
                                            <th scope="col" width="40px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {compState.products && compState.products.data && compState.products.data.map((product, inx) => <tr key={inx}>
                                            <td>
                                                <label>
                                                    <input type="checkbox" className="product-checkbox" data-din={product.din}
                                                        onChange={e => toogleSingle(e)} />
                                                    <span className="visually-hidden"> Select SKU</span>
                                                </label>
                                            </td>
                                            <td>
                                                <div className="proInfo">
                                                    <div className="img">
                                                        <img src={`${IMG_LOCATION}/productImages/ThumbNail-${product.image}`} alt={product.productTitle} className="img-fluid" />
                                                    </div>
                                                    <p className="mb-0 product-title">{product.productTitle}<br />
                                                        {product.varitions.map((v, i) => <strong key={i}>
                                                            {i == 0 ? "" : ","} {v.name}: {v.value}
                                                        </strong>)}<br />
                                                        <small>SKU: {product.sku}</small> <small>DIN: {product.din}</small>
                                                    </p>
                                                </div>

                                            </td>
                                            <td>{product.category.map((el, id) => <span key={id}>{el}</span>)}</td>
                                            <td>
                                                {product.fulFilledBy ? product.fulFilledBy : "Seller"}
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center ">
                                                    <label className="mb-0">₹ {product.mrp}</label>
                                                    {product.status !== "inactive" && product.status !== "blocked" ? <button className="btn btn-link ml-1" onClick={() => modalShowUpdatePrice("mrp", product.mrp, product.sku, product.din, product.sellingPrice)}>
                                                        <FaPencilAlt />
                                                    </button> : null}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center ">
                                                    <label className="mb-0">₹ {product.sellingPrice}</label>
                                                    {product.status !== "inactive" && product.status !== "blocked" ? <button className="btn btn-link ml-1" onClick={() => modalShowUpdatePrice("sellingPrice", product.mrp, product.sku, product.din, product.sellingPrice)}>
                                                        <FaPencilAlt />
                                                    </button> : null}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center ">
                                                    <label className="mb-0">{product.stock}</label>
                                                    {product.status !== "inactive" && product.status !== "blocked" ? <button className="btn btn-link ml-1" onClick={() => modalShow("stock", product.stock, product.sku, product.din)}>
                                                        <FaPencilAlt />
                                                    </button> : null}
                                                </div>
                                            </td>
                                            <td>

                                                {product.status !== "inactive" && product.status !== "blocked" ? <Dropdown drop={"left"}>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <FaEllipsisV />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu >
                                                        <NavLink className="dropdown-item" to={`add-edit-products/${product.ProductId}`}>Edit Listing</NavLink>
                                                        {/* {product.status !== "Pending" ? <button className="dropdown-item" onClick={e => copyListing(e)}>Copy Listing</button> : null} */}
                                                        {product.status !== "Pending" && product.status !== "archived" ? <button className="dropdown-item" onClick={e => archiveListing(e, product.ProductId, product.din)}>Archive Listing</button> : null}
                                                        {/* {product.status !== "Pending" ? <button className="dropdown-item" onClick={e => addVariantToListing(e)}>Add Variants</button> : null} */}
                                                        {(product.status !== "Pending") ? <button className="dropdown-item" onClick={e => deactivateListing(e, product.ProductId, product.din)}>Deactivate Listing</button> : null}
                                                    </Dropdown.Menu>
                                                </Dropdown> : null}
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>

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

                                {!compState.loading && !compState.products.data?.length ? <p className="text-danger h5">You do not have any product to view</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {compState?.loading ? <Loader /> : null}
        </React.Fragment >
    )



}



export default DashboardLayout(AllProducts);

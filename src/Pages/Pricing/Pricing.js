import React, { useEffect, useState } from 'react';
import PageLayout from '../../HOC/PageLayout';
import './Pricing.scss';
import { IconContext } from "react-icons";
import { FaStore, FaShippingFast, FaCapsules, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from "react-router-dom";
import SeoTags from "../../Components/SEOTags/SeoTags";
import { SITEGENAPIURL, SITEURL, PRICINGTITLE, PRICINGDESC } from "../../cons"
import Axios from 'axios';
import AutoSuggest from "../../UI/AutoSuggest/AutoSuggest"
const jsonLdProps = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": `${SITEURL}`,
        "logo": `${SITEURL}/icons/logo.png`
    },

    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": `Sellers Home`,
                "item": `${SITEURL}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `Pricing`,
                "item":  `${window.location.href}`
            }
        ]
    }

];
const seoTags = {
    "pageTitle": `${PRICINGTITLE}`,
    "PageMetaTitle": `${PRICINGTITLE}`,
    "pageMetaDesc": `${PRICINGDESC}`,
    pageType: "page",
    pageUrl: `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

};
const Pricing = (props) => {
    const [categoryData, setCategoryData] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [ajaxLoading, setAjaxLoading]=useState(false)
    useEffect(() => {
        setAjaxLoading(true)
        Axios.post(`${SITEGENAPIURL}/getCategoryData`).then(res => {

            setCategoryData(res.data);
            setAjaxLoading(false)
        },err=>{
            setAjaxLoading(false)
        })
    }, [])



    const setCategory = (v) => {
        setSelectedCategory(v)
    }
    return (
        <React.Fragment>
            <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
            <div className="pricing">
                <div className="banner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <h1 className="sr-only">Sell online at AJIOKART and get maximum profit with 0% marketplace fee</h1>
                            </div>
                            <div className="col col-6 col-sm-6 col-md-3">
                                <div className="card" >
                                    <a href="#marketPlaceFee">
                                        <IconContext.Provider value={{ color: "maroon", className: "p-icons" }}>
                                            <FaStore />
                                        </IconContext.Provider>
                                        <div className="card-body">

                                            <p className="card-title"> Marketplace fee</p>
                                            <p className="card-text">Percentage of Order item value ( depends on category & sub-category)</p>

                                        </div></a>
                                </div>

                            </div>
                            <div className="col col-6 col-sm-6 col-md-3">
                                <div className="card" >
                                    <a href="#shippingFee">
                                        <IconContext.Provider value={{ color: "maroon", className: "p-icons" }}>
                                            <FaShippingFast />
                                        </IconContext.Provider>
                                        <div className="card-body">
                                            <p className="card-title">  Shipping fee</p>
                                            <p className="card-text">Calculated on the basis of product weight and shipping distance</p>

                                        </div>
                                    </a>
                                </div>

                            </div>
                            <div className="col col-6 col-sm-6 col-md-3">
                                <div className="card" >
                                    <a href="#collectionFee">
                                        <IconContext.Provider value={{ color: "maroon", className: "p-icons" }}>
                                            <FaMoneyBillWave />
                                        </IconContext.Provider>
                                        <div className="card-body">
                                            <p className="card-title">Collection fee</p>
                                            <p className="card-text">Online/COD payment collection chages</p>

                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col col-6 col-sm-6 col-md-3">
                                <div className="card" >
                                    <a href="#fixedFee">
                                        <IconContext.Provider value={{ color: "maroon", className: "p-icons" }}>
                                            <FaCapsules />
                                        </IconContext.Provider>
                                        <div className="card-body">
                                            <p className="card-title">Fixed Fee</p>
                                            <p className="card-text">A small fee for each order</p>

                                        </div>
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>


                </div>

                <div className="price-rate" id="marketPlaceFee">

                    <div className="container-fluid">
                        <div className="row justify-content-center">

                            <div className="col col-sm-8 col-md-6">
                                <label htmlFor="select-category">Choose from the list below to see the regular marketplace fee rate:</label>
                                <AutoSuggest
                                    suggestions={categoryData && categoryData.data}
                                    chosenValue={(v) => setCategory(v)}
                                    placeHolder="Type product category type"
                                    fieldName="categoryName"
                                    loading={ajaxLoading}
                                />
                                {!selectedCategory && <div> <p className="fee-percent">Please type a revelenet product category</p></div>}
                                {selectedCategory && <> <p className="fee-percent">Marketplace fee: {selectedCategory.percentageFee}%</p>

                                </>
                                }
                            </div>
                        </div>
                        <div className="seller-offer ">
                            <div className="row justify-content-center">

                                <div className="col-12 col-sm-7">
                                    {!selectedCategory && <h2 className="offer">
                                        <span>Special Offer</span> Marketplace fee starts for 0%, valid for limited period

                                    </h2>
                                    }

                                    {selectedCategory && selectedCategory.offerFee && <>  <h2 className="offer">
                                        {selectedCategory.offerFee}%  <span style={{ textDecoration: "line-through" }}>{selectedCategory.percentageFee}%</span>  Marketplace.
                                    </h2>
                                    <div className="text-center">
                                        <p > *Offer Valid Till   <span>{new Date(selectedCategory.offerDate).toLocaleDateString("en-in")}</span></p>
                                        <Link to="/register" className="btn btn-lg btn-success">Register as a seller </Link>
                                        </div>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shipping-fee text-center" id="shippingFee">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col col-sm-8 col-md-6">
                                <h3>Shipping Fee</h3>
                                <p> Shipping fee starts from ₹40 + GST </p>
                                <p><small>* This may vary based on package weight, volume and distance</small> </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collection-fee text-center" >
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-8 col-md-6" id="collectionFee">
                                <div className="wrap">
                                    <h3>Collection Fee</h3>
                                    <table className="table table-bordered text-left">

                                        <tbody>
                                            <tr>
                                                <th scope="row">Cash on Delivery</th>
                                                <td>₹50 or 2% of the value, Whichever is higher + GST</td>

                                            </tr>
                                            <tr>
                                                <th scope="row">Payment Collection Charges</th>
                                                <td>2.5% + GST</td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-12 col-sm-8 col-md-6" id="fixedFee">
                                <div className="wrap">
                                    <h3>Fixed Fee</h3>
                                    <p>
                                        There is small fixed fee for each order, which is ₹ 10 for order below ₹ 250 and ₹ 20 for ₹ 250 and more
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )



}

export default PageLayout(Pricing);

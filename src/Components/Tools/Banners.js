import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import "react-datepicker/dist/react-datepicker.css";

const Banners = (props) => {
    const [bannerData, setBannerData] = useState(null);
    const [bannerHeading, setBannerHeading] = useState("Buy exclusive products");
    const [bannerText, setBannerText] = useState("Why waiting for? buy your favaroute brands at AJIOKART");
    useEffect(() => {

        const resData = {
            "sellerid": '1234',
            "sellerStoreURL": 'https://www.AJIOKART.in/1234/seller/store-slug',
            "defaultImage":'https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png',
            "products":[
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                },
                {
                    productTitle:"product name",
                    productThumbnail:"https://www.AJIOKART.in/wp-content/uploads/2018/07/AJIOKART-icon.png",
                    productLink:"https://www.AJIOKART.in/product/123"
                }
            ]


        }

        setBannerData(resData)
    },
        []);

    return (
        <React.Fragment>
            <h1 class="sticky-head">Banners</h1>

            <div className="panel-body">
                <div className="filter">
                    <div className="row">
                        <div className="col-12 col-sm-12">

                            <form class="form-inline">
                                <label for="searchbyorderid">Banner Heading </label>&nbsp;&nbsp;
                                <input type="text" class="form-control mb-2 me-sm-2" id="searchbyorderid" placeholder="Banner Heading"
                                    value={bannerHeading}
                                    onChange={(e) => setBannerHeading(e.target.value)} />&nbsp;&nbsp;&nbsp;
                                <label for="searchbyorderid1">Banner Text </label>&nbsp;&nbsp;
                                <input type="text" class="form-control mb-2 me-sm-2" id="searchbyorderid1" placeholder="Banner Text"
                                    value={bannerText}
                                    onChange={(e) => setBannerText(e.target.value)} />






                            </form>

                        </div>
                    </div>
                </div>




                <div className="container-fluid">



                    <div className="row">
                        <div className="col-3"><strong>Banner Type</strong></div>
                        <div className="col-6"><strong>Preview</strong>


                        </div>
                        <div className="col-3">
                            <strong> Code</strong>


                        </div>
                    </div>


                    <div className="row">
                        <div className="col-3">Square</div>
                        <div className="col-6">
                            {bannerData &&
                                <div style={{
                                    width: "100%", "max-width": "300px", height: "300px",
                                    "font-family": "arial, helvetica", border: "1px solid #ccc", "margin": "10px", "overflow": "hidden"
                                }}>
                                    <div style={{ "background": "#fff", "padding": "13px", "height": "241px", "display": "table-cell", "vertical-align": " middle" }}>
                                        <a style={{ "color": "#000" }}
                                            href={bannerData.sellerStoreURL}> <p style={{ "font-size": "20px", "margin": "0 0 10px", "font-weight": "bold" }}>
                                                {bannerHeading}
                                            </p>
                                        </a>
                                        <a style={{ "color": "#000" }} href={bannerData.sellerStoreURL}><p>
                                            {bannerText}
                                        </p>
                                        </a>
                                    </div>
                                    <div style={{ "background": "#eee", "padding": "10px 15px", "text-align": "center" }}>
                                        <a style={{ "background": "#0088ff", "padding": "10px 40px", "border-radius": "30px", "color": "#fff", "font-weight": "bold", "display": "inline-block" }}
                                            href={bannerData.sellerStoreURL}>SHOP NOW</a>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-3"> <code className="bannercode">
                            {bannerData && `

<div style='width: "100%"; "max-width": "300px"; height: "300px";"font-family": "arial, helvetica"; border: "1px solid #ccc"; "margin": "10px"; "overflow": "hidden"'>
    <div style='"background": "#fff";"padding": "13px"; "height": "241px";"display": "table-cell";"vertical-align": " middle"'>
        <a style='"color": "#000"'
            href="${bannerData.sellerStoreURL}">
            <p style='font-size": "20px"; "margin": "0 0 10px"; "font-weight": "bold"'>
                ${bannerHeading}
            </p>
        </a>
        <a style='"color": "#000"' href="${bannerData.sellerStoreURL}"><p>
            ${bannerText}
        </p>
        </a>
    </div>
    <div style='"background": "#eee"; "padding": "10px 15px"; "text-align": "center"'>
        <a style='"background": "#0088ff"; "padding": "10px 40px"; "border-radius": "30px"; "color": "#fff"; "font-weight": "bold"; "display": "inline-block"'
            href="${bannerData.sellerStoreURL}">SHOP NOW</a>
    </div>
</div>

                              `}</code>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-3">Square with Image</div>
                        <div className="col-6">
                            {bannerData &&
                                <div style={{
                                    width: "100%", "max-width": "300px", height: "300px",
                                    "font-family": "arial, helvetica", border: "1px solid #ccc", "margin": "10px", "overflow": "hidden"
                                }}>
                                    <div style={{ "background": "#fff", "padding": "13px", "height": "241px", "display": "table-cell", "vertical-align": " middle" }}>
                                        <a style={{ "color": "#000" }}
                                            href={bannerData.sellerStoreURL}> <p style={{ "font-size": "20px", "margin": "0 0 10px", "font-weight": "bold" }}>
                                                {bannerHeading}
                                            </p>
                                        </a>
                                        <a style={{ "color": "#000" }} href={bannerData.sellerStoreURL}><p>
                                            {bannerText}
                                        </p>
                                        </a>
                                    </div>
                                    <div style={{ "background": "#eee", "padding": "10px 15px", "text-align": "center" }}>
                                        <a style={{ "background": "#0088ff", "padding": "10px 40px", "border-radius": "30px", "color": "#fff", "font-weight": "bold", "display": "inline-block" }}
                                            href={bannerData.sellerStoreURL}>SHOP NOW</a>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-3"> <code className="bannercode">
                            {bannerData && `

<div style='width: "100%"; "max-width": "300px"; height: "300px";"font-family": "arial, helvetica"; border: "1px solid #ccc"; "margin": "10px"; "overflow": "hidden"'>
    <div style='"background": "#fff";"padding": "13px"; "height": "241px";"display": "table-cell";"vertical-align": " middle"'>
        <a style='"color": "#000"'
            href="${bannerData.sellerStoreURL}">
            <p style='font-size": "20px"; "margin": "0 0 10px"; "font-weight": "bold"'>
                ${bannerHeading}
            </p>
        </a>
        <a style='"color": "#000"' href="${bannerData.sellerStoreURL}"><p>
            ${bannerText}
        </p>
        </a>
    </div>
    <div style='"background": "#eee"; "padding": "10px 15px"; "text-align": "center"'>
        <a style='"background": "#0088ff"; "padding": "10px 40px"; "border-radius": "30px"; "color": "#fff"; "font-weight": "bold"; "display": "inline-block"'
            href="${bannerData.sellerStoreURL}">SHOP NOW</a>
    </div>
</div>

                              `}</code>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Vertical</div>
                        <div className="col-6">
                            {bannerData &&
                                <div style={{
                                    width: "100%", "max-width": "300px", height: "300px",
                                    "font-family": "arial, helvetica", border: "1px solid #ccc", "margin": "10px", "overflow": "hidden"
                                }}>
                                    <div style={{ "background": "#fff", "padding": "13px", "height": "241px", "display": "table-cell", "vertical-align": " middle" }}>
                                        <a style={{ "color": "#000" }}
                                            href={bannerData.sellerStoreURL}> <p style={{ "font-size": "20px", "margin": "0 0 10px", "font-weight": "bold" }}>
                                                {bannerHeading}
                                            </p>
                                        </a>
                                        <a style={{ "color": "#000" }} href={bannerData.sellerStoreURL}><p>
                                            {bannerText}
                                        </p>
                                        </a>
                                    </div>
                                    <div style={{ "background": "#eee", "padding": "10px 15px", "text-align": "center" }}>
                                        <a style={{ "background": "#0088ff", "padding": "10px 40px", "border-radius": "30px", "color": "#fff", "font-weight": "bold", "display": "inline-block" }}
                                            href={bannerData.sellerStoreURL}>SHOP NOW</a>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-3"> <code className="bannercode">
                            {bannerData && `

<div style='width: "100%"; "max-width": "300px"; height: "300px";"font-family": "arial, helvetica"; border: "1px solid #ccc"; "margin": "10px"; "overflow": "hidden"'>
    <div style='"background": "#fff";"padding": "13px"; "height": "241px";"display": "table-cell";"vertical-align": " middle"'>
        <a style='"color": "#000"'
            href="${bannerData.sellerStoreURL}">
            <p style='font-size": "20px"; "margin": "0 0 10px"; "font-weight": "bold"'>
                ${bannerHeading}
            </p>
        </a>
        <a style='"color": "#000"' href="${bannerData.sellerStoreURL}"><p>
            ${bannerText}
        </p>
        </a>
    </div>
    <div style='"background": "#eee"; "padding": "10px 15px"; "text-align": "center"'>
        <a style='"background": "#0088ff"; "padding": "10px 40px"; "border-radius": "30px"; "color": "#fff"; "font-weight": "bold"; "display": "inline-block"'
            href="${bannerData.sellerStoreURL}">SHOP NOW</a>
    </div>
</div>

                              `}</code>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Vertical with Image</div>
                        <div className="col-6">
                            {bannerData &&
                                <div style={{
                                    width: "100%", "max-width": "300px", height: "300px",
                                    "font-family": "arial, helvetica", border: "1px solid #ccc", "margin": "10px", "overflow": "hidden"
                                }}>
                                    <div style={{ "background": "#fff", "padding": "13px", "height": "241px", "display": "table-cell", "vertical-align": " middle" }}>
                                        <a style={{ "color": "#000" }}
                                            href={bannerData.sellerStoreURL}> <p style={{ "font-size": "20px", "margin": "0 0 10px", "font-weight": "bold" }}>
                                                {bannerHeading}
                                            </p>
                                        </a>
                                        <a style={{ "color": "#000" }} href={bannerData.sellerStoreURL}><p>
                                            {bannerText}
                                        </p>
                                        </a>
                                    </div>
                                    <div style={{ "background": "#eee", "padding": "10px 15px", "text-align": "center" }}>
                                        <a style={{ "background": "#0088ff", "padding": "10px 40px", "border-radius": "30px", "color": "#fff", "font-weight": "bold", "display": "inline-block" }}
                                            href={bannerData.sellerStoreURL}>SHOP NOW</a>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-3"> <code className="bannercode">
                            {bannerData && `

<div style='width: "100%"; "max-width": "300px"; height: "300px";"font-family": "arial, helvetica"; border: "1px solid #ccc"; "margin": "10px"; "overflow": "hidden"'>
    <div style='"background": "#fff";"padding": "13px"; "height": "241px";"display": "table-cell";"vertical-align": " middle"'>
        <a style='"color": "#000"'
            href="${bannerData.sellerStoreURL}">
            <p style='font-size": "20px"; "margin": "0 0 10px"; "font-weight": "bold"'>
                ${bannerHeading}
            </p>
        </a>
        <a style='"color": "#000"' href="${bannerData.sellerStoreURL}"><p>
            ${bannerText}
        </p>
        </a>
    </div>
    <div style='"background": "#eee"; "padding": "10px 15px"; "text-align": "center"'>
        <a style='"background": "#0088ff"; "padding": "10px 40px"; "border-radius": "30px"; "color": "#fff"; "font-weight": "bold"; "display": "inline-block"'
            href="${bannerData.sellerStoreURL}">SHOP NOW</a>
    </div>
</div>

                              `}</code>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Product List</div>
                        <div className="col-6">
                            {bannerData &&
                                <div style={{
                                    width: "100%", "max-width": "300px", height: "300px",
                                    "font-family": "arial, helvetica", border: "1px solid #ccc", "margin": "10px", "overflow": "hidden"
                                }}>
                                    <div style={{ "background": "#fff", "padding": "13px", "height": "241px", "display": "table-cell", "vertical-align": " middle" }}>
                                        <a style={{ "color": "#000" }}
                                            href={bannerData.sellerStoreURL}> <p style={{ "font-size": "20px", "margin": "0 0 10px", "font-weight": "bold" }}>
                                                {bannerHeading}
                                            </p>
                                        </a>
                                        <a style={{ "color": "#000" }} href={bannerData.sellerStoreURL}><p>
                                            {bannerText}
                                        </p>
                                        </a>
                                    </div>
                                    <div style={{ "background": "#eee", "padding": "10px 15px", "text-align": "center" }}>
                                        <a style={{ "background": "#0088ff", "padding": "10px 40px", "border-radius": "30px", "color": "#fff", "font-weight": "bold", "display": "inline-block" }}
                                            href={bannerData.sellerStoreURL}>SHOP NOW</a>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-3"> <code className="bannercode">
                            {bannerData && `

<div style='width: "100%"; "max-width": "300px"; height: "300px";"font-family": "arial, helvetica"; border: "1px solid #ccc"; "margin": "10px"; "overflow": "hidden"'>
    <div style='"background": "#fff";"padding": "13px"; "height": "241px";"display": "table-cell";"vertical-align": " middle"'>
        <a style='"color": "#000"'
            href="${bannerData.sellerStoreURL}">
            <p style='font-size": "20px"; "margin": "0 0 10px"; "font-weight": "bold"'>
                ${bannerHeading}
            </p>
        </a>
        <a style='"color": "#000"' href="${bannerData.sellerStoreURL}"><p>
            ${bannerText}
        </p>
        </a>
    </div>
    <div style='"background": "#eee"; "padding": "10px 15px"; "text-align": "center"'>
        <a style='"background": "#0088ff"; "padding": "10px 40px"; "border-radius": "30px"; "color": "#fff"; "font-weight": "bold"; "display": "inline-block"'
            href="${bannerData.sellerStoreURL}">SHOP NOW</a>
    </div>
</div>

                              `}</code>
                        </div>
                    </div>
                     </div>

            </div>
        </React.Fragment>
    )
}
export default DashboardLayout(Banners);
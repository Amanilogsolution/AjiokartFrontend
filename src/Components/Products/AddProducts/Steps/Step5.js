import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SITEAPIURL, SITEGENAPIURL, ToastConfig } from "../../../../cons";
import {toast} from "react-toastify";
import "./Step1.scss";
import * as actionCreator from "../../../../Store/actions/index"
import useResponseHandler from "../../../../Hooks/HandleError";

const Step6 = () => {
    const [ErrorHandler]=useResponseHandler()
    const history = useNavigate()
    const dispatch = useDispatch()
    const { currentProductSelectedCategories, currentProduct, categoryList } = useSelector(state => state.product)
    const [catInfo, setCatInfo] = useState()
    const [sellingPrice, setSellingPrice] = useState()
    const [charges, setCharges] = useState({})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const prevStep = () => {
        history.push("/add-products/step4");
    }
    const submitProduct = () => {
        setLoading(true)
        currentProduct.images.forEach(el=>{
            el.files.forEach((img,i)=>{
                    let formData = new FormData()
                    formData.append('image', img.file)
                    formData.append('folderName', "productImages")
                    formData.append('fileName', img.fileName)
                    formData.append('type', img.fieldName)

                    Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
                        .then(res => {
                          //  toast.success(res?.data?.message|| `${i+1}/${el.files.length} Image uploaded`, ToastConfig);


                        }).catch(err => {
                            ErrorHandler(err, `${img.fileName} failed to upload`)
                        })

            })
        })
        delete currentProduct.shippingToNationalOrig;
        delete currentProduct.shippingToLocalOrig;
        delete currentProduct.shippingToZonalOrig;
        delete currentProduct.images;
        delete currentProduct.deliveryChargesActual;
        Axios.post(`${SITEAPIURL}/add-product`, currentProduct)
            .then(res => {
                dispatch(actionCreator.clearCurrentEditingProduct())
                setLoading(false)
                history.push(`/add-products`)
                toast.success(`Product has been added successfully and currently under review`, ToastConfig);
            },err=>{
                ErrorHandler(err)
                setLoading(false)
            })
    }
    useEffect(() => {
        if (!currentProductSelectedCategories.length) {
            history.push("/add-products");
        }
    }, [currentProductSelectedCategories.length, history]);
    useEffect(() => {
        if (catInfo) {
                console.log(currentProduct)
            const obj = {}
            obj["marketPlaceFee"] = ((sellingPrice * catInfo?.percentageFee) / 100).toFixed(2);
            obj["fixedFee"] = (sellingPrice < 250 ? 10 : 20).toFixed(2);
            obj["localShippingFee"] = (+currentProduct.deliveryChargesActual?.local - (+currentProduct.shippingChargesToCustomer?.local || 0)).toFixed(2);
            obj["zonalShippingFee"] = (+currentProduct.deliveryChargesActual?.zonal - (+currentProduct.shippingChargesToCustomer?.zonal || 0)).toFixed(2);
            obj["nationalShippingFee"] = (currentProduct.deliveryChargesActual.national - (+currentProduct.shippingChargesToCustomer?.national || 0)).toFixed(2);
            obj["collectionFee"] = ((sellingPrice * 0.025)).toFixed(2);

            obj["gstLocal"] = ((+obj.marketPlaceFee + +obj.fixedFee + +obj.localShippingFee + +obj.collectionFee) * 0.18).toFixed(2);
            obj["gstZonal"] = ((+obj.marketPlaceFee + +obj.fixedFee + +obj.zonalShippingFee + +obj.collectionFee) * 0.18).toFixed(2);
            obj["gstNational"] = ((+obj.marketPlaceFee + +obj.fixedFee + +obj.nationalShippingFee + +obj.collectionFee) * 0.18).toFixed(2);


            obj["totalLocalDeduction"] = (+obj.marketPlaceFee + +obj.fixedFee + +obj.localShippingFee + +obj.collectionFee + +obj.gstLocal).toFixed(2);
            obj["totalZonalDeduction"] = (+obj.marketPlaceFee + +obj.fixedFee + +obj.zonalShippingFee + +obj.collectionFee + +obj.gstZonal).toFixed(2);
            obj["totalNationalDeduction"] = (+obj.marketPlaceFee + +obj.fixedFee + +obj.nationalShippingFee + +obj.collectionFee + +obj.gstNational).toFixed(2);

            setCharges(charges=>({ ...charges, ...obj }))
        }

    }, [sellingPrice, currentProduct, catInfo])

    useEffect(() => {
        let cat = categoryList.filter(el => el.id === currentProductSelectedCategories[currentProductSelectedCategories.length - 1]);
        setCatInfo(cat[0])
        setSellingPrice(+currentProduct.inventory[0]?.sellingPrice)
    }, [currentProductSelectedCategories, currentProduct.inventory,categoryList])
    return (
        <>
            <h2 className="panel-heading">Calculations</h2>
            <div className="panel-body pt-4">


                <div className="form-group">
                    <div className="row ">
                        <div className="col-4 col-md-2 col-lg-1">
                            <label htmlFor="sp">Selling Price
                     </label>
                        </div>
                        <div className="col-8 col-md-3">
                            <input type="number" id="sp" value={sellingPrice || 0} className="form-control" placeholder="Selling Price"
                                onChange={e => setSellingPrice(e.target.value)} style={{ width: 140 }} />

                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Local</th>
                                <th scope="col">Zonal</th>
                                <th scope="col">National</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <th>Market Place fee ({catInfo?.percentageFee}%)</th>
                                <td colSpan="3" className="text-center">- {+charges.marketPlaceFee}</td>
                            </tr>
                            <tr>
                                <th>Fixed fee</th>
                                <td colSpan="3" className="text-center">- {+charges.fixedFee}</td>
                            </tr>
                            <tr>
                                <th>Collection fee (2.5%)</th>
                                <td colSpan="3" className="text-center">- {+charges.collectionFee}</td>
                            </tr>
                            <tr>
                                <th>Shipping fee</th>
                                <td>- {charges.localShippingFee}</td>
                                <td>- {charges.zonalShippingFee}</td>
                                <td>- {charges.nationalShippingFee}</td>
                            </tr>

                            <tr>
                                <th>GST ( 18% on fee deduction)</th>
                                <td>- {charges.gstLocal}</td>
                                <td>- {charges.gstZonal}</td>
                                <td>- {charges.gstNational}</td>
                            </tr>

                            <tr>
                                <th>Total deduction</th>
                                <th>- {charges.totalLocalDeduction}</th>
                                <th>- {charges.totalZonalDeduction}</th>
                                <th>- {charges.totalNationalDeduction}</th>
                            </tr>
                            <tr className="table-success">
                                <th>Settlement Amount</th>
                                <th>{(sellingPrice - charges.totalLocalDeduction).toFixed(2)}</th>
                                <th>{(sellingPrice - charges.totalZonalDeduction).toFixed(2)}</th>
                                <th>{(sellingPrice - charges.totalNationalDeduction).toFixed(2)}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <p className="form-text text-muted mb-0">* This is sample charges calculation for a prepaid orders</p>
                <p className="form-text text-muted mb-0">* COD charges will be applicable for all cash on delivery orders. (₹50 or 2% of the value, Whichever is higher + GST)</p>
                <p className="form-text text-muted mb-0">* Reverse logistic charges will be applicable, if buyer return/replace the product</p>
                <p className="form-text text-muted mb-0">* Any sell which is not direct from AJIOKART.com, will be consider as affiliate sell. For example sell made from Google ads or from your super site</p>
                <p className="form-text text-muted mb-0">* Affiliate selling fee will be applicable for all affiliate sell</p>
                <p className="form-text text-muted pb-4">** By submitting the products, you agree to all privacy & payment policies</p>




            </div>
            <div className="d-flex justify-content-between">

                <button type="button" className="btn btn-danger btn-lg mb-5" onClick={prevStep}>Step 4</button>

                {loading? <div className="spinner mx-5"></div>:
                <button type="button" onClick={submitProduct} className="btn btn-danger btn-lg mb-5" >SUBMIT</button>
        }
            </div>
        </>
    );
};
export default Step6;
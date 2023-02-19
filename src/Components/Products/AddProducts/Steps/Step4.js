import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SITEGENAPIURL } from "../../../../cons";
import useResponseHandler from "../../../../Hooks/HandleError";
import * as actionCreator from "../../../../Store/actions/index"
import "./Step1.scss";

const Step5 = ({ activateStep }) => {
    const [shippingChargesToCustomer, setShippingChargesToCutomer] = useState({
        local: 0,
        zonal: 0,
        national: 0
    })
    const [ErrorHandler] = useResponseHandler()
    const { currentProductSelectedCategories, currentProduct } = useSelector(state => state.product)
    const history = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, errors, register, getValues } = useForm();
    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])

    const onchangeShipPrice = (e) => { 
        shippingChargesToCustomer[e.target.name] = e.target.value
        dispatch(actionCreator.updateCurrentEditingProduct({ ...shippingChargesToCustomer }))
    }

    const onSubmit = data => {
        history.push("/add-products/step5");
        dispatch(actionCreator.updateCurrentEditingProduct(data))
        activateStep("step5")
    };
    const prevStep = () => {
        history.push("/add-products/step3");
    }
    const checkCharges = () => {
        if (getValues("packetWeight")) {
            Axios.post(`${SITEGENAPIURL}/sampleShippingCharges`, {
                packetWeight: getValues("packetWeight")

            }).then(res => {
                console.log(res)
                setShippingChargesToCutomer(res.data);

                dispatch(actionCreator.updateCurrentEditingProduct({
                    deliveryChargesActual: {
                        local: res.data.local,
                        zonal: res.data.zonal,
                        national: res.data.national
                    }
                }))

            },
                err => {
                    ErrorHandler(err)
                })
        }

    }
    useEffect(() => {
        if (!currentProductSelectedCategories.length) {
            history.push("/add-products");
        }
    }, [currentProductSelectedCategories.length, history])
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="panel-heading">Parcel Information</h2>
                <div className="panel-body pt-4">
                    <p className="form-text text-muted pb-4">* Please enter parcel weight and dimensions, the shipping charges will be calcuated based on it</p>
                    <div className="form-group">

                        <div className="row">
                            <label htmlFor="packetWeight" className="col-12  col-sm-3">Packaging Weight (Grams) <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">

                                <input type="number"
                                    placeholder="Packaging Weight (Grams)"
                                    className={`form-control ${errors.packetWeight ? "is-invalid " : " "}`}
                                    name="packetWeight"
                                    id="packetWeight"
                                    defaultValue={currentProduct.packetWeight}
                                    onBlur={checkCharges}
                                    ref={register({
                                        required: "Package weight is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                />
                                {errors.packetWeight ? <span className="text-danger mb-1">{errors.packetWeight.message}  </span> : null}
                            </div>

                        </div>
                    </div>
                    <div className="form-group">

                        <div className="row">
                            <label htmlFor="packetWidth" className="col-12  col-sm-3">Packaging Width (cm) <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">

                                <input type="number"
                                    className={`form-control ${errors.packetWidth ? "is-invalid " : " "}`}

                                    placeholder="Packaging Width (cm)"
                                    name="packetWidth"
                                    id="packetWidth"
                                    defaultValue={currentProduct.packetWidth}
                                    ref={register({
                                        required: "Package weight is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                />
                                {errors.packetWidth ? <span className="text-danger mb-1">{errors.packetWidth.message}  </span> : null}
                            </div>

                        </div>
                    </div>
                    <div className="form-group">

                        <div className="row">
                            <label htmlFor="packetHeight" className="col-12  col-sm-3">Packaging Height (cm) <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">

                                <input type="number"
                                    className={`form-control ${errors.packetHeight ? "is-invalid " : " "}`}
                                    placeholder="Packaging Height (cm)"
                                    name="packetHeight"
                                    defaultValue={currentProduct.packetHeight}
                                    ref={register({
                                        required: "Package height is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                />
                                {errors.packetHeight ? <span className="text-danger mb-1">{errors.packetHeight.message}  </span> : null}
                            </div>

                        </div>
                    </div>
                    <div className="form-group">

                        <div className="row">
                            <label htmlFor="packetLength" className="col-12  col-sm-3">Packaging Length (cm) <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">

                                <input type="number"
                                    className={`form-control ${errors.packetLength ? "is-invalid " : " "}`}
                                    placeholder="Packaging Length (cm)"
                                    name="packetLength"
                                    defaultValue={currentProduct.packetLength}
                                    ref={register({
                                        required: "Package length is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                />
                                {errors.packetLength ? <span className="text-danger mb-1">{errors.packetLength.message}  </span> : null}
                            </div>

                        </div>
                    </div>
                </div>
                <h2 className="panel-heading">Shipping Charges</h2>
                <div className="panel-body pt-4">

                    <p className="form-text text-muted mb-0">
                        * By default customer will not be charged any shipping charges. and a Free shipping badge will be shown at product info page</p>

                    <p className="form-text text-muted pb-4">
                        ** You can choose here to charge complete shipping charges from customer or split it between you and customer</p>


                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Local</th>
                                <th scope="col">Zonal</th>
                                <th scope="col">National</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Cost</td>
                                <td>{currentProduct.deliveryChargesActual?.local}</td>
                                <td>{currentProduct.deliveryChargesActual?.zonal}</td>
                                <td>{currentProduct.deliveryChargesActual?.national}</td>
                            </tr>
                            <tr>
                                <td>Cost to you</td>
                                <td>{currentProduct.deliveryChargesActual?.local - shippingChargesToCustomer?.local }</td>
                                <td>{currentProduct.deliveryChargesActual?.zonal -  shippingChargesToCustomer?.zonal }</td>
                                <td>{currentProduct.deliveryChargesActual?.national - shippingChargesToCustomer?.national }</td>
                            </tr>
                            <tr>
                                <td>Charge from customer <span className="required-astriek">*</span></td>
                                <td>

                                    <input
                                        type="number"
                                        placeholder="Local"
                                        className={`form-control ${errors.local ? "is-invalid " : " "}`}
                                        name="local"
                                        id="local"
                                        defaultValue={currentProduct?.shippingChargesToCustomer?.local ?? 0}
                                        onChange={(e) => onchangeShipPrice(e)}
                                        ref={register({
                                            required: "Package weight is required for shipping charges calculations",
                                            pattern: {
                                                value: /^\d+$/,
                                                message: "Please enter numbers only"
                                            }
                                        })}
                                    />

                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Zonal"
                                        className={`form-control ${errors.zonal ? "is-invalid " : " "}`}
                                        name="zonal"
                                        id="zonal"
                                        defaultValue={currentProduct?.shippingChargesToCustomer?.zonal || 0}
                                        onChange={(e) => onchangeShipPrice(e)}
                                        ref={register({
                                            required: "Package weight is required for shipping charges calculations",
                                            pattern: {
                                                value: /^\d+$/,
                                                message: "Please enter numbers only"
                                            }
                                        })}
                                    />

                                </td>
                                <td><input
                                    type="number"
                                    placeholder="National"
                                    className={`form-control ${errors.national ? "is-invalid " : " "}`}
                                    name="national"
                                    id="national"
                                    defaultValue={currentProduct?.shippingChargesToCustomer?.national || 0}
                                    onChange={(e) => onchangeShipPrice(e)}
                                    ref={register({
                                        required: "Package weight is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                />

                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">
                                    {errors.local ? <span className="text-danger mb-1">{errors.local.message}  </span> : null}

                                    {errors.zonal ? <span className="text-danger mb-1">{errors.zonal.message}  </span> : null}

                                    {errors.national ? <span className="text-danger mb-1">{errors.national.message}  </span> : null}</td>
                            </tr>

                        </tbody></table>



                </div>
                <div className="d-flex justify-content-between">

                    <button type="button" className="btn btn-danger btn-lg mb-5" onClick={prevStep}>Step 3</button>

                    <button type="submit" className="btn btn-danger btn-lg mb-5" >Next Step</button>
                </div>
            </form>
        </>
    );
};
export default Step5;
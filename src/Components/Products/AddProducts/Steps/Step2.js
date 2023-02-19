import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector, useDispatch } from "react-redux";
import * as actionCreator from "../../../../Store/actions/index";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const Step2 = ({ activateStep, productId, countryList, ...props }) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, errors, register, setValue } = useForm();
    const [compState, setCompState] = useState({
        prodFeatures: "",
        prodDescription: ""
    })
    const updateEditorData = (data, field) => {
        let obj = {}
        obj[field] = data;
        setCompState({ ...compState, ...obj })

    }
    const { currentProductSelectedCategories, currentProduct } = useSelector(state => state.product)
    const prevStep = useCallback(() => {
        history("/add-products");
    }, [history])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!currentProductSelectedCategories.length) {
            history("/add-products");
        }

    }, [currentProductSelectedCategories, prevStep, history])

    const onSubmit = data => {
        data.prodDescription = compState.prodDescription;
        data.prodFeatures = compState.prodFeatures;
        currentProduct.attributes.forEach(el => delete data[el.attribute.attributeName])
        activateStep("step3")
        dispatch(actionCreator.updateCurrentEditingProduct(data))
        history("/add-products/step3");

    };

    const onChange = (e, attributeId, attributeName, isTag) => {
        let data;
        let fieldType = null;
        let attributes = [...currentProduct.attributes];
        let selectedAttributeIndex;
        let selectedAttribute;
        let termToUpdate;
        let termToUpdateIdx;
        if (!e.target && !isTag) {
            setHiddenValue(attributeName, e.length ? e : null)
            data = e;
            fieldType = "multi"
        } else if (e.target && e.target.type !== "text") {

            data = JSON.parse(e.target.value);
        } else if (!e.target && isTag) {
            fieldType = "tags"

        }

        if (fieldType === "multi") {
            data.forEach((d, i) => {
                selectedAttribute = attributes.filter(item => item.attribute.attributeId === d.attributeId);
                selectedAttributeIndex = attributes.findIndex(item => item.attribute.attributeId === d.attributeId);
                termToUpdate = selectedAttribute[0].attributeTerms.filter(item => item.id === d.id);
                termToUpdateIdx = selectedAttribute[0].attributeTerms.findIndex(item => item.id === d.id);
                selectedAttribute[0].attributeTerms.forEach(item => {
                    let itemIndata = data.find(el => el.id === item.id)

                    if (itemIndata) {
                        item["values"] = true;
                    } else {
                        item["values"] = false;
                    }

                })

            })
        } else if (fieldType === "tags") {
            selectedAttribute = attributes.filter(item => item.attribute.attributeId === attributeId);
            selectedAttributeIndex = attributes.findIndex(item => item.attribute.attributeId === attributeId);

            termToUpdate = selectedAttribute[0].attributeTerms;
            termToUpdateIdx = 0;

            termToUpdate[0] = {
                values: e,
                attributeId: attributeId,
                attributeName: attributeName
            }

        }
        else if (e.target && e.target.type !== "text") {
            selectedAttribute = attributes.filter(item => item.attribute.attributeId === data.attributeId);
            selectedAttributeIndex = attributes.findIndex(item => item.attribute.attributeId === data.attributeId);
            termToUpdate = selectedAttribute[0].attributeTerms.filter(item => item.id === data.id);
            termToUpdateIdx = selectedAttribute[0].attributeTerms.findIndex(item => item.id === data.id);

            if (e.target.type === "select-one" || e.target.type === "radio") {
                selectedAttribute[0].attributeTerms.forEach(item => {
                    item["values"] = false
                })
                termToUpdate[0]["values"] = true
            }
            if (e.target.type === "checkbox") {
                termToUpdate[0]["values"] = e.target.checked
            }
        } else if (e.target && e.target.type === "text") {
            selectedAttribute = attributes.filter(item => item.attribute.attributeId === attributeId);
            selectedAttributeIndex = attributes.findIndex(item => item.attribute.attributeId === attributeId);

            termToUpdate = selectedAttribute[0].attributeTerms;
            termToUpdateIdx = 0;


            termToUpdate[0] = {
                values: e.target.value, attributeId: attributeId,
                attributeName: attributeName
            }

        }

        if (selectedAttribute && termToUpdate) {

            selectedAttribute[0].attributeTerms[termToUpdateIdx] = termToUpdate[0];
            attributes[selectedAttributeIndex] = selectedAttribute[0];
        } else {
            attributes[selectedAttributeIndex] = {}
        }
        dispatch(actionCreator.updateCurrentProductAttributes(attributes))
    }
    const getSelectedValues = (attributeId, attributeName) => {
        let getAttribute = [...currentProduct.attributes].filter(item => {
            if (item.attribute) {
                return item.attribute.attributeId === attributeId
            }

        });
        let value = getAttribute[0].attributeTerms.filter(el => {
            return el.values === true
        })
        setHiddenValue(attributeName, value)
        return value
    }

    const setHiddenValue = (attributeName, value) => {
        let field = `${attributeName}-hidden`;
        setValue(field, value, {
            shouldValidate: true,
            shouldDirty: true
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="panel-heading">General Information</h2>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="productTitle" className="col-12  col-sm-3">Product Title <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <input type="text"
                                    className={`form-control ${errors.productTitle ? "is-invalid " : " "}`}
                                    placeholder=" Product Title"
                                    name="productTitle"
                                    id="productTitle"
                                    defaultValue={currentProduct.productTitle}
                                    ref={register({
                                        required: "Please enter product title"
                                    })} />

                                {errors.productTitle ? <span className="text-danger mb-1">{errors.productTitle.message}  </span> : null}
                                <small className="form-text text-muted">Do not include brand name in product name</small>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="desc" className="col-12  col-sm-3">Product Description  </label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={compState?.prodDescription || currentProduct?.prodDescription || ""}
                                    onChange={(event, editor) => {
                                        updateEditorData(editor.getData(), "prodDescription")
                                    }}
                                />
                                <small className="form-text text-muted">Let buyers know why your product is better. We recomonned not to copy paste product description from other sites. It should be unique, as your product</small>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="gstRate" className="col-12  col-sm-3">GST Rate <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <select name="gstRate" id="gstRate"
                                    className={`custom-select ${errors.productTitle ? "is-invalid " : " "}`}
                                    defaultValue={currentProduct.gstRate}
                                    ref={register({
                                        required: "Please select approprite GSTIN Slab for this product"
                                    })}
                                >
                                    <option value="">Select </option>
                                    <option value="0">No Tax (Exempted)</option>
                                    <option value="0.25">0.25%</option>
                                    <option value="5">5%</option>
                                    <option value="12">12%</option>
                                    <option value="18">18%</option>
                                    <option value="28">28%</option>
                                </select>

                                {errors.gstRate ? <span className="text-danger mb-1">{errors.gstRate.message}  </span> : null}
                                <small className="form-text text-muted">What is the GSTIN amout to be reflected in invoice. This should be included in your selling price.</small>
                            </div>
                        </div>
                    </div>
                </div>
                {currentProduct.attributes.length ? <>
                    <h2 className="panel-heading">Attributes</h2>
                    <div className="panel-body">
                        {currentProduct.attributes.map((at, i) => {
                            return <div className="form-group" key={at.attribute.attributeId}>
                                <div className="row">
                                <label htmlFor="title" className="col-12  col-sm-3">{at.attribute.attributeName} <span className="required-astriek">*</span></label>
                                <div className="col-12  col-sm-9 col-md-6">
                                    {at.displayType === "SelectMulti" && <>
                                        <div className={`${errors[`${at.attribute.attributeName}-hidden`] ? "is-invalid " : " "}`}>
                                     
                                        </div>

                                        <input type="hidden"
                                            name={`${at.attribute.attributeName}-hidden`}
                                            ref={register({
                                                required: "This field is required"
                                            })} />

                                        {errors[`${at.attribute.attributeName}-hidden`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}-hidden`].message}  </span> : null}
                                    </>}
                                    {at.displayType === "SelectSingle" && <>
                                        <select

                                            className={`form-control ${errors[`${at.attribute.attributeName}`] ? "is-invalid " : " "}`}
                                            name={at.attribute.attributeName}
                                            id={at.attribute.attributeId}
                                            ref={register({
                                                required: "This field is required"
                                            })}
                                            onChange={(e) => onChange(e, at.attribute.attributeId)}
                                            value={JSON.stringify(at.attributeTerms.filter(el => el.values === true)[0])}
                                        >

                                            <option value="">Select</option>
                                            {at.attributeTerms.filter(el => el.isAllowed).map((v, i) => <option value={JSON.stringify(v)} key={v.id}
                                            >
                                                {v.attributeValue}
                                            </option>)}



                                        </select>

                                        {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null}
                                    </>}

                                    {at.displayType === "Input" && <>
                                        <input type="text"
                                            className={`form-control ${errors[`${at.attribute.attributeName}`] ? "is-invalid " : " "}`}
                                            placeholder={at.attribute.attributeName} name={at.attribute.attributeName} id={at.attribute.attributeId}
                                            onChange={(e) => onChange(e, at.attribute.attributeId)}
                                            ref={register({
                                                required: "This field is required"
                                            })}
                                            defaultValue={at?.attributeTerms[0]?.values}
                                        />

                                        {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null}
                                    </>}

                                    {at.displayType === "tagInput" && <>

                                        <ReactTagInput
                                            tags={at.attributeTerms[0]?.values || []}
                                            placeholder="Type and press enter"
                                            maxTags={10}
                                            editable={true}
                                            readOnly={false}
                                            removeOnBackspace={true}
                                            onChange={(newTags) => onChange(newTags, at.attribute.attributeId, at.attribute.attributeName, "isTag")}
                                        />
                        
                                    </>}


                                    {at.displayType === "Checkbox" && <>
                                        <div className="row mx-0">

                                            {at.attributeTerms.filter(el => el.isAllowed).map((v, i) => <div className="form-check col-12 col-sm-6 col-md-4 col-lg-3" key={v.id}>
                                                <input className="form-check-input" type="checkbox" value={JSON.stringify(v)} name={at.attribute.attributeName} id={v.id}
                                                    onChange={(e) => onChange(e, at.attribute.attributeId)}
                                                    defaultChecked={v.values === true}

                                                    ref={register({
                                                        required: "This field is required"
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor={v.id}>{v.attributeValue}</label>
                                            </div>)}

                                        </div>

                                        {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null}
                                    </>}

                                    {at.displayType === "Radio" && <>
                                        <div className="row mx-0">

                                            {at.attributeTerms.filter(el => el.isAllowed).map((v, i) => <div className="form-check col-12 col-sm-6 col-md-4 col-lg-3" key={v.id}>
                                                <input className="form-check-input" type="radio" value={JSON.stringify(v)} name={at.attribute.attributeName} id={v.id}
                                                    onChange={(e) => onChange(e, at.attribute.attributeId)}
                                                    defaultChecked={v.values === true}
                                                    ref={register({
                                                        required: "This field is required"
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor={v.id}>{v.attributeValue}</label>
                                            </div>)}

                                        </div>

                                        {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null}
                                    </>}





                                    {/*
                                <input type="text" className="form-control" placeholder=" Product Title" name={at.name} id="title"
                                    ref={register({
                                        required: "Please select approprite GSTIN Slab for this product"
                                    })} /> */}
                                    {errors[at.name] ? <span className="text-danger mb-1">{errors[at.name].message}  </span> : null}
                                </div>
                            </div></div>
                        })}

                        <div className="form-group"><div className="row">
                            <label htmlFor="countryOfOrigin" className="col-12  col-sm-3">
                                Country Of Origin <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <select
                                    name="countryOfOrigin"
                                    ref={register({
                                        required: "Please select country of origin"
                                    })}
                                    className={`form-control ${errors.countryOfOrigin ? "is-invalid " : " "}`}
                                    value={currentProduct.countryOfOrigin}
                                >
                                    <option value="">Select</option>
                                    {countryList.map(el => <option key={el.code} value={el.name}>{el.name}</option>)}

                                </select>

                                {errors.countryOfOrigin ? <span className="text-danger mb-1">{errors.countryOfOrigin.message}  </span> : null}
                            </div>
                        </div>
                        </div>
                    </div>
                </>
                 :
                <div>
                    <h2 className="panel-heading">Attributes</h2>
                    <div className="panel-body">

                        <div className="form-group"><div className="row">
                            <label htmlFor="countryOfOrigin" className="col-12  col-sm-3">
                                Country Of Origin <span className="required-astriek">*</span></label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <select
                                    name="countryOfOrigin"
                                    ref={register({
                                        required: "Please select country of origin"
                                    })}
                                    className={`form-control ${errors.countryOfOrigin ? "is-invalid " : " "}`}
                                >
                                    <option value="">Select</option>
                                    {countryList.map(el => <option key={el.code} value={el.name}>{el.name}</option>)}

                                </select>

                                {errors.countryOfOrigin ? <span className="text-danger mb-1">{errors.countryOfOrigin.message}  </span> : null}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                }
                <h2 className="panel-heading">Other Information</h2>
                <div className="panel-body">

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="handlingTime" className="col-12  col-sm-3">Handeling Time (Days) <span className="required-astriek">*</span></label>
                            <div className="col-12 col-sm-9 col-md-6">
                                <select name="handlingTime" id="handlingTime"
                                    style={{ width: '150px' }}
                                    className={`custom-select ${errors.handlingTime ? "is-invalid " : " "}`}
                                    value={currentProduct.handlingTime}
                                    ref={register({
                                        required: "Please select approprite GSTIN Slab for this product"
                                    })}
                                    onChange={e => { }}
                                >
                                    <option value="">Select </option>
                                    <option value="day">1 day</option>
                                    {[2, 3, 4, 5, 7, 10, 12, 15].map((day) => <option value={day} key={day}>{day} days</option>)}

                                </select>

                                {errors.handlingTime ? <span className="text-danger mb-1">{errors.handlingTime.message}  </span> : null}

                                <small className="form-text text-muted">How much time will you take to mark this product ready to ship, when you recieve an order.</small>
                            </div></div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="fulFilledBy" className="col-12  col-sm-3">Fulfilled By <span className="required-astriek">*</span></label>
                            <div className="col-12 col-sm-9 col-md-6">
                                <select name="fulFilledBy" id="fulFilledBy"
                                    style={{ width: '150px' }}
                                    className={`custom-select ${errors.fulFilledBy ? "is-invalid " : " "}`}
                                    defaultValue={"Seller"}
                                    ref={register({
                                        required: "This field is required"
                                    })}
                                >
                                    <option value="">Select </option>
                                    <option value="Seller">Seller</option>

                                </select>

                                {errors.fulFilledBy ? <span className="text-danger mb-1">{errors.fulFilledBy.message}  </span> : null}

                            </div></div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="" className="col-12  col-sm-3">Features:</label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={compState?.prodFeatures || currentProduct?.prodFeatures || ""}

                                    onChange={(event, editor) => {
                                        updateEditorData(editor.getData(), "prodFeatures")
                                    }}

                                />

                                <small className="form-text text-muted">What are the unique features your product have?</small>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="legalDisclaimer" className="col-12  col-sm-3">Legal Disclaimer Description</label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <textarea className="form-control"
                                    placeholder="Ex: For residents of NJ, VT, MA, and MI, must be at least 18 & over to purchase."

                                    name="legalDisclaimer"
                                    id="legalDisclaimer"
                                    defaultValue={currentProduct.legalDisclaimer}
                                    ref={register()}
                                ></textarea>

                                {errors.legalDisclaimer ? <span className="text-danger mb-1">{errors.legalDisclaimer.message}  </span> : null}

                                <small className="form-text text-muted">Any disclaimer text, which you want to tell your buyers before they make a purchase. i.e. Product Color May Slightly Vary Due to Photographic Lighting Sources or Your Monitor Settings </small>
                            </div></div>
                    </div>


                </div>
                <h2 className="panel-heading">SEO</h2>
                <div className="panel-body">

                    <p className="form-text text-muted mb-0">* AJIOKART will use this data on your super site as well AJIOKARTn India to provide you best search results. </p>
                    <p className="form-text text-muted mb-3">**Please leave it blank if you are not familier with these terms, Our system will automatically generate it, if these are left blank</p>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="metaTitle" className="col-12  col-sm-3">Meta Title</label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <input type="text"

                                    className={`form-control ${errors.metaTitle ? "is-invalid " : " "}`}
                                    placeholder=" Product Title"
                                    name="metaTitle"
                                    id="metaTitle"
                                    defaultValue={currentProduct.metaTitle}
                                    ref={register({
                                        maxLength: {
                                            value: 55,
                                            message: "Meta Title should not exceed 55 character limit"
                                        }
                                    })} />

                                {errors.metaTitle ? <span className="text-danger mb-1">{errors.metaTitle.message}  </span> : null}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="metaDescription" className="col-12  col-sm-3">Meta Description</label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <textarea
                                    className={`form-control ${errors.metaDescription ? "is-invalid " : " "}`}
                                    placeholder=" Product Title"
                                    name="metaDescription"
                                    id="metaDescription"
                                    defaultValue={currentProduct.metaDescription}
                                    ref={register({
                                        maxLength: {
                                            value: 155,
                                            message: "Meta Title should not exceed 155 character limit"
                                        }
                                    })} ></textarea>

                                {errors.metaDescription ? <span className="text-danger mb-1">{errors.metaDescription.message}  </span> : null}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="searchKeywords" className="col-12  col-sm-3">Keywords</label>
                            <div className="col-12  col-sm-9 col-md-6">
                                <input className={`form-control ${errors.searchKeywords ? "is-invalid " : " "}`}
                                    placeholder="Product Keywords"
                                    name="searchKeywords"
                                    id="searchKeywords"
                                    defaultValue={currentProduct.searchKeywords}
                                    ref={register({
                                    })} />

                                {errors.searchKeywords ? <span className="text-danger mb-1">{errors.searchKeywords.message}  </span> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">

                    <button type="button" className="btn btn-danger btn-lg mb-5" onClick={prevStep}>Step 1</button>

                    <button type="submit" className="btn btn-danger btn-lg mb-5" >Next Step</button>
                </div>

            </form>
        </>
    )
}

export default Step2
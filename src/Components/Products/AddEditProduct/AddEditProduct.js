import React, { useEffect, useState, useCallback } from "react"
import DashboardLayout from '../../../HOC/DashboardLayout';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as actionCreator from "../../..//Store/actions/index"
import { useNavigate, useParams } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SITEAPIURL, SITEGENAPIURL } from '../../../cons';
import Axios from 'axios';
import useResponseHandler from "../../../Hooks/HandleError";
import Multiselect from 'multiselect-react-dropdown';

const AddEditProduct = () => {
    const { categoryList, currentProductSelectedCategories, authorizeBrands, authBrandsLoading } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { handleSubmit, errors, register, setValue, getValues } = useForm(
        {
            mode: "onBlur",
          }
    );
    const { handleSubmit:handleSubmit2, errors:errors2, register:register2, setValue:setValue2, getValues:getValues2 } = useForm({
        mode: "onBlur",
      });
    const [productData, setProductData] = useState({
        deliveryChargesActual: {
            local: 40,
            zonal: 60,
            national: 90
        },
        shippingChargesToCustomer: {
            local: 0,
            zonal: 0,
            national: 0
        }
    });
    const [parentCat, setParentCat] = useState([])
    const [firstChild, setFirstChild] = useState([])
    const [secondChild, setSecondChild] = useState([])
    const [thirdChild, setThirdChild] = useState([])
    const [fourthChild, setFourthChild] = useState([])
    const [showOptions, setShowOptions] = useState(false);
    const { productId } = useParams()
    const [countryList, setCountryList] = useState([]);
    const [allowedAttributes, setAllowedAttributes] = useState([]);
    const [ErrorHandler] = useResponseHandler()


    useEffect(() => {
        Axios.get(`${SITEGENAPIURL}/countryList`)
            .then(res => {
                setCountryList(res.data.data)
            })
    }, []);

    useEffect(()=>{
        checkCharges()
    },[productData.productId])

    useEffect(() => {

        if (productId) {
            Axios.get(`${SITEAPIURL}/getProduct/${productId}`)
                .then(res => {
                    if (res.data) {
                        setProductData({...res.data.data, productId:productId})
                    }
                })
        }
    }, [productId]);

    const onSubmit = data => {
        setProductData({ ...productData, ...data })
    };
    const onSubmit2 = data2 => {
        alert(JSON.stringify(data2))
    }
    const checkCharges = async () => {
        if (getValues2("packetWeight")) {
            await Axios.post(`${SITEGENAPIURL}/sampleShippingCharges`, {
                packetWeight: getValues("packetWeight")

            }).then(res => {
                setProductData({
                    ...productData,
                    deliveryChargesActual: {
                        ...productData.deliveryChargesActual,
                        local: res.data.local,
                        zonal: res.data.zonal,
                        national: res.data.national
                    }   
                });
            },
                err => {
                    ErrorHandler(err)
                })
        }

    }
    const onchangeShipPrice = (e) => {
      //  productData.shippingChargesToCustomer[e.target.name] = e.target.value


        setProductData({
            ...productData,
            shippingChargesToCustomer: {
                ...productData.shippingChargesToCustomer,
                [e.target.name]:e.target.value
            }   
        });

    }
    const getSelectedValues = (attributeId, attributeName) => {
        let getAttribute = productData && productData.attributes && [...productData.attributes].filter(item => {
            if (item.attribute) {
                return item.attribute.attributeId === attributeId
            }

        });
        let value = getAttribute && getAttribute.length && getAttribute[0].attributeTerms.filter(el => {
            return el.values === true
        })
        setHiddenValue(attributeName, value)
        return value
    }
    const updateEditorData = (data, field) => {
        let obj = {}
        obj[field] = data;
        setProductData({ ...productData, ...obj })

    }

    const setHiddenValue = (attributeName, value) => {
        let field = `${attributeName}-hidden`;
        setValue(field, value, {
            shouldValidate: true,
            shouldDirty: true
        })
    }
    const onChange = (e, attributeId, attributeName, isTag) => {
        let data;
        let fieldType = null;
        let attributes = [...allowedAttributes];
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
        setProductData({ ...productData, ...attributes })
    }
    useEffect(() => {
        if (!categoryList.length) {
            dispatch(actionCreator.fetchCategoryList());
        }
        if (categoryList.length) {
            let parentcat = categoryList.filter((item) => item.parent_id === 0)
            setParentCat(parentcat)
        }
    }, [categoryList, dispatch])
    const setCategory = useCallback(async (e, id, setChild) => {
        if (e) {
            e.preventDefault();
        }
        setShowOptions(false);

        let childCats = categoryList.filter((item) => item.parent_id === id)
        if (setChild === 1) {
            setFirstChild(childCats)
            setSecondChild([])
            setThirdChild([])
            setFourthChild([])

        }
        if (setChild === 2) {
            setSecondChild(childCats)
            setThirdChild([])
            setFourthChild([])
        }
        if (setChild === 3) {
            setThirdChild(childCats)
            setFourthChild([])
        }
        if (setChild === 4) {
            setFourthChild(childCats)
        }
        if (!childCats.length) {
            setShowOptions(true)
            setValue('category_id', id);
            await Axios.post(`${SITEAPIURL}/getProductAttributes`, { catId: id })
                .then(
                    res => {
                        setAllowedAttributes(res.data.data)
                    }
                )
        }
        let data = [...currentProductSelectedCategories]
        data[setChild - 1] = id;
        dispatch(actionCreator.setSelectedCategory(data))
    }, [categoryList, dispatch, currentProductSelectedCategories, setValue])

    useEffect(() => {
        if (!authorizeBrands.length) {
            dispatch(actionCreator.fetchAuthorisedBrands());
        }
    }, [])

    if (!authorizeBrands.length && !authBrandsLoading) {
        return <div className="panel-body">
            <div className="row">


                <div className="col-12">
                    <h1 className="h2">No Brand to List Product</h1>
                    <p className="h6">You are seeing this page because...</p>
                    <p className="mb-2 h5">*You do not have any authorised brand to list your product.
                        {/* <button onClick={goToManageBrands} className="btn btn-danger"> Apply For New Brand</button> */}

                    </p>
                    <p className="mb-3 h5">*If you have already applied, then wait for brand approval.</p>
                    <p className="mb-3 h5">*If need help, kindly contact support.</p>
                </div>
            </div>
        </div>
    }


    return <>

        {(categoryList && !productData.category_id) && !productId ? <form onSubmit={handleSubmit(onSubmit)}>

            <h2 className="panel-heading">Select Product Category</h2>
            <div className="panel-body">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <ul className="catlist">
                            {parentCat.map((item) => <li key={item.id}>
                                <a href="/" className={currentProductSelectedCategories[0] === item.id ? "active" : null} onClick={e => setCategory(e, item.id, 1)}> {item.categoryName}</a>
                            </li>)}
                        </ul>
                    </div>
                    {firstChild.length ? <div className="col-12 col-md-3"><ul className="catlist">
                        {firstChild.map((item) => <li key={item.id}>
                            <a href="/" className={currentProductSelectedCategories[1] === item.id ? "active" : null} onClick={e => setCategory(e, item.id, 2)}> {item.categoryName}</a>
                        </li>)}
                    </ul></div> : null}
                    {secondChild.length ? <div className="col-12 col-md-3"><ul className="catlist">
                        {secondChild.map((item) => <li key={item.id}>
                            <a href="/" className={currentProductSelectedCategories[2] === item.id ? "active" : null} onClick={e => setCategory(e, item.id, 3)}> {item.categoryName}</a>
                        </li>)}
                    </ul></div> : null}


                    {thirdChild.length ? <div className="col-12 col-md-3"><ul className="catlist">
                        {thirdChild.map((item) => <li key={item.id}>
                            <a href="/" className={currentProductSelectedCategories[3] === item.id ? "active" : null} onClick={e => setCategory(e, item.id, 4)}> {item.categoryName}</a>
                        </li>)}
                    </ul></div> : null}

                    {fourthChild.length ? <div className="col-12 col-md-3"><ul className="catlist">
                        {fourthChild.map((item) => <li key={item.id}>
                            <a href="/" className={currentProductSelectedCategories[4] === item.id ? "active" : null} onClick={e => setCategory(e, item.id, 5)}> {item.categoryName}</a>
                        </li>)}
                    </ul></div> : null}

                </div>
                <input type="hidden" name="category_id" ref={register} />



            </div>
            {showOptions ? <div className="panel-body">

                <div className="row">
                    <div className="col-12 choose-brand">
                        <h2 className="h3">Select a brand name</h2>


                        {authorizeBrands.map((brand) => {
                            return <div key={brand.id}>
                                <input
                                    type="radio"
                                    value={brand.id}
                                    name="brand_id"
                                    defaultChecked={+productData.brand_id === +brand.id ? true : false}
                                    ref={register({
                                        required: "Please select a brand"
                                    })}
                                    id={brand.id} />
                                <label htmlFor={brand.id}>{brand.brandName}</label>
                            </div>

                        })
                        }




                        {errors.brand_id ? <span className="text-danger mb-1">{errors.brand_id.message}  </span> : null}
                    </div>
                </div>



            </div> : null}

            {showOptions ? <div className="row d-flex justify-content-end">
                <div className="col-12  d-flex justify-content-end">
                    <button type="submit" className="btn btn-danger btn-lg mb-5">Next Step</button>
                </div>
            </div> : null}


        </form> : <h1 className="h4">
            {productId ? "Updating" : "Adding"} Product in <strong>{categoryList.filter(cat => cat.id == productData.category_id)[0]?.categoryName}</strong>
        </h1>}

        {((productData.category_id && productData.brand_id) || productId) ? <>
            <form onSubmit={handleSubmit2(onSubmit2)}>
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
                                    defaultValue={productData.productTitle}
                                    ref={register2({
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
                                    data={productData.prodDescription || ""}
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
                                    style={{ maxWidth: 200 }}
                                    value={productData.gstRate}
                                    ref={register2({
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
                    <div className="form-group">
                            <div className="row">
                                <label htmlFor="countryOfOrigin" className="col-12  col-sm-3">
                                    Country Of Origin<span className="required-astriek">*</span></label>
                                <div className="col-12  col-sm-9 col-md-6">

                                    <select
                                        name="countryOfOrigin"
                                        ref={register2({
                                            required: "Please select country of origin"
                                        })}
                                        style={{ maxWidth: 200 }}

                                        className={`form-control ${errors.countryOfOrigin ? "is-invalid " : " "}`}
                                        value={productData?.countryOfOrigin}

                                    >
                                        <option value="">Select</option>
                                        {countryList.map(el => <option key={el.code} value={el.name}>{el.name}</option>)}

                                    </select>

                                    {errors.countryOfOrigin ? <span className="text-danger mb-1">{errors.countryOfOrigin.message}  </span> : null}
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
                                    defaultValue={productData.searchKeywords}
                                    ref={register2({
                                    })} />

                                {errors.searchKeywords ? <span className="text-danger mb-1">{errors.searchKeywords.message}  </span> : null}
                            </div>
                        </div>
                    </div>
                </div>
                {allowedAttributes.length ?
                <>
                    <h2 className="panel-heading">Attributes</h2>
                    <div className="panel-body">

                   { allowedAttributes.map((at, i) => {
                            return <div className="form-group" key={at.attribute.attributeId}>
                                <div className="row">
                                    <label htmlFor="title" className="col-12  col-sm-3">{at.attribute.attributeName} <span className="required-astriek">*</span></label>
                                    <div className="col-12  col-sm-9 col-md-6">
                                        {at.displayType === "SelectMulti" && <>
                                            <div className={`${errors[`${at.attribute.attributeName}-hidden`] ? "is-invalid " : " "}`}>
                                                {/* <Multiselect
                                                className={`custom-select ${errors[`${at.attribute.attributeName}-hidden`] ? "is-invalid " : " "}`}
                                                options={at.attributeTerms.filter(el => el.isAllowed)}
                                                displayValue="attributeValue"
                                                selectedValues={getSelectedValues(at.attribute.attributeId, at.attribute.attributeName)}
                                                onSelect={(selectedList) => onChange(selectedList, at.attribute.attributeId, at.attribute.attributeName)}
                                                onRemove={(selectedList) => onChange(selectedList, at.attribute.attributeId, at.attribute.attributeName)}
                                            /> */}

                                            </div>

                                            <input type="hidden"
                                                name={`${at.attribute.attributeName}-hidden`}
                                                ref={register2({
                                                    required: "This field is required"
                                                })} />

                                            {errors[`${at.attribute.attributeName}-hidden`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}-hidden`].message}  </span> : null}
                                        </>}
                                        {at.displayType === "SelectSingle" && <>
                                            <select

                                                className={`form-control ${errors[`${at.attribute.attributeName}`] ? "is-invalid " : " "}`}
                                                name={at.attribute.attributeName}
                                                id={at.attribute.attributeId}
                                                ref={register2({
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
                                                ref={register2({
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
                                            {/* <input type="hidden" className="form-control" placeholder={at.attribute.attributeName} name={at.attribute.attributeName} id={at.attribute.attributeId}
                                            ref={register2({
                                                required: "This field is required"
                                            })} />

                                        {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null} */}
                                        </>}


                                        {at.displayType === "Checkbox" && <>
                                            <div className="row mx-0">

                                                {at.attributeTerms.filter(el => el.isAllowed).map((v, i) => <div className="form-check col-12 col-sm-6 col-md-4 col-lg-3" key={v.id}>
                                                    <input className="form-check-input" type="checkbox" value={JSON.stringify(v)} name={at.attribute.attributeName} id={v.id}
                                                        onChange={(e) => onChange(e, at.attribute.attributeId)}
                                                        defaultChecked={v.values === true}

                                                        ref={register2({
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
                                                        ref={register2({
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
                                    ref={register2({
                                        required: "Please select approprite GSTIN Slab for this product"
                                    })} /> */}
                                        {errors[at.name] ? <span className="text-danger mb-1">{errors[at.name].message}  </span> : null}
                                    </div>
                                </div>
                                </div>
                       
                                })}     
                    </div>
                </>
             : null}
                <h2 className="panel-heading">Other Information</h2>
                <div className="panel-body">

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="handlingTime" className="col-12  col-sm-3">Handeling Time (Days) <span className="required-astriek">*</span></label>
                            <div className="col-12 col-sm-9 col-md-6">
                                <select name="handlingTime" id="handlingTime"
                                    style={{ width: '150px' }}
                                    className={`custom-select ${errors.handlingTime ? "is-invalid " : " "}`}
                                    value={productData.handlingTime}
                                    ref={register2({
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
                                    ref={register2({
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
                                    data={productData?.prodFeatures || productData?.prodFeatures || ""}

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
                                    defaultValue={productData.legalDisclaimer}
                                    ref={register2()}
                                ></textarea>

                                {errors.legalDisclaimer ? <span className="text-danger mb-1">{errors.legalDisclaimer.message}  </span> : null}

                                <small className="form-text text-muted">Any disclaimer text, which you want to tell your buyers before they make a purchase. i.e. Product Color May Slightly Vary Due to Photographic Lighting Sources or Your Monitor Settings </small>
                            </div></div>
                    </div>


                </div>
                



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
                                    defaultValue={productData.packetWeight}
                                    onBlur={checkCharges}
                                    ref={register2({
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
                                    defaultValue={productData.packetWidth}
                                    ref={register2({
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
                                    defaultValue={productData.packetHeight}
                                    ref={register2({
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
                                    defaultValue={productData.packetLength}
                                    ref={register2({
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
                                <td>{productData?.deliveryChargesActual?.local}</td>
                                <td>{productData?.deliveryChargesActual?.zonal}</td>
                                <td>{productData?.deliveryChargesActual?.national}</td>
                            </tr>
                            <tr>
                                <td>Cost to you</td>
                                <td>
                                
                                {productData?.deliveryChargesActual?.local - productData?.shippingChargesToCustomer?.local}</td>
                                <td>{productData?.deliveryChargesActual?.zonal - productData?.shippingChargesToCustomer?.zonal}</td>
                                <td>{productData?.deliveryChargesActual?.national - productData?.shippingChargesToCustomer?.national}</td>
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
                                        defaultValue={productData?.shippingChargesToCustomer?.local ?? 0}
                                        onChange={(e) => onchangeShipPrice(e)}
                                        ref={register2({
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
                                        defaultValue={productData?.shippingChargesToCustomer?.zonal || 0}
                                        onChange={(e) => onchangeShipPrice(e)}
                                        ref={register2({
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
                                    defaultValue={productData?.shippingChargesToCustomer?.national || 0}
                                    onChange={(e) => onchangeShipPrice(e)}
                                    ref={register2({
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
                <button type="submit">Submit</button>

            </form>

        </> : null}
    </>
}
export default DashboardLayout(AddEditProduct);

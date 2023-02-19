import React, { useEffect, useState, useCallback } from "react"
import DashboardLayout from "../../../HOC/DashboardLayout"
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import ReactTagInput from "@pathofdev/react-tag-input";
import { IMG_LOCATION, SITEAPIURL, SITEGENAPIURL, ToastConfig } from "../../../cons";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loader from "../../Loader/Loader"
import { FaTimes } from "react-icons/fa";
import Multiselect from 'multiselect-react-dropdown';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../../Store/actions/index"
import MultiFileUpload from "../../../UI/FileUpload/MultiFileUpload";
import useResponseHandler from "../../../Hooks/HandleError";

const editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote'],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
        ]
    }
}
const EditProduct = () => {
    const [ErrorHandler] = useResponseHandler()
    const { productId } = useParams()
    const history = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, errors, register, setValue, getValues } = useForm();
    const { authorizeBrands } = useSelector(state => state.product);
    const [variables, setVariables] = useState();
    const [variationsArray, setVariationsArray] = useState([])
    const [variationsList, setVariationsList] = useState([]);
    const [imagesArray, setImagesArray] = useState([])
    const [files, setFiles] = useState([])
    const [compState, setCompstate] = useState({
        currentProduct: {},
        loading: false
    });
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!authorizeBrands.length) {
            dispatch(actionCreator.fetchAuthorisedBrands());
        }
    }, [])
    const updateValue = (e, idx, field) => {
        let tempVariationsList = [...variationsList]
        tempVariationsList[idx][0][field] = e.target.value;
        setVariationsList(variationsList => [...tempVariationsList])
    }


    const updateProduct = (data) => {
        let temp = { ...compState }
        let updatedInventory = [...temp.currentProduct.inventory, ...data.inventory];


        updatedInventory = updatedInventory.reduce((newArray, el) => {

            let idx = newArray.findIndex(elm => {
                let found = false;
                variationsList[0].forEach(elx => {

                    found = elm[elx.attributeName] === el[elx.attributeName];

                    if (!found) {
                        return
                    }
                })
                return found
            })

            if (idx !== -1) {
                let merged = { ...newArray[idx], ...el }
                newArray[idx] = merged;
            } else {
                newArray.push(el)
            }
            return newArray
        }, [])
        updatedInventory.forEach((el, i) => {
            let images = []

            if (el?.Color) {
                let hasImage = imagesArray.filter(elm => elm.color === el.Color)[0]

                if (hasImage && hasImage.images) {
                    hasImage.images.forEach(im => {
                        images.push(im.image)
                    })
                }
            }
            if (updatedInventory[i]) {
                updatedInventory[i].images = JSON.stringify(images);
            }
        })



        temp.currentProduct.inventory = updatedInventory
        setCompstate(compState => ({ ...compState, ...temp }))


        files.forEach(el => {
            el.files.forEach((img, i) => {
                let formData = new FormData()
                formData.append('image', img.file)
                formData.append('folderName', "productImages")
                formData.append('fileName', img.fileName)
                formData.append('type', img.fieldName)

                Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
                    .then(res => {
                        toast.success(res?.data?.message || `${i + 1}/${el.files.length} Image uploaded`, ToastConfig);


                    }).catch(err => {
                        ErrorHandler(err, `${i + 1}/${el.files.length} Image failed to upload`)
                    })

            })
        })
        Axios.put(`${SITEAPIURL}/updateProduct/${productId}`, compState.currentProduct)
            .then(res => {

                toast.warn(`Product has been updated and currently under review`, ToastConfig);
            }, err => {
                ErrorHandler(err)
            })

    }
    const checkCharges = () => {


    }
    const onChange = (e, attributeId, attributeName) => {
        let data;
        let componentState = { ...compState }
        let attributes = componentState.currentProduct.attributes;
        let fieldType = null;
        if (!e.target) {
            data = e
        } else {
            data = JSON.parse(e.target.value)
            fieldType = e.target.type;
        }
        let editingAttributes = attributes.filter(el => el.attribute.attributeId === attributeId)[0];
        switch (fieldType) {
            case "select-one":
            case "radio":
                editingAttributes.attributeTerms.forEach((el, i) => {
                    if (el.id === data.id) {
                        editingAttributes.attributeTerms[i].values = true
                    } else {
                        editingAttributes.attributeTerms[i].values = false
                    }
                })
                setCompstate(compState => ({
                    ...compState, ...componentState
                }))
                break;
            case "checkbox":
                editingAttributes.attributeTerms.forEach((el, i) => {
                    if (el.id === data.id) {
                        editingAttributes.attributeTerms[i].values = e.target.checked
                    }
                })
                setCompstate(compState => ({
                    ...compState, ...componentState
                }))
                break;
            case "input":

                break;
            case "tagsInput":

                break;
            default:
                editingAttributes.attributeTerms.forEach((el, i) => {
                    editingAttributes.attributeTerms[i].values = false
                })


                let updatedData = [...data]

                updatedData.forEach((el, i) => {
                    updatedData[i].values = true;
                })

                setCompstate(compState => ({
                    ...compState, ...componentState
                }))



        }


        if (attributeName === "Color" && (data.length > imagesArray.length)) {

            data.forEach(el => {
                let findx = imagesArray.findIndex(elm => elm.color === el.attributeValue)

                if (findx < 0) {
                    let tempImagArray = [...imagesArray];
                    tempImagArray.push({
                        color: el.attributeValue,
                        images: []
                    })
                    setImagesArray(tempImagArray)
                    setValue(el.attributeValue, null)
                }
            })

        } else {

            imagesArray.forEach((el, i) => {
                let findx = data.find(elm => elm.attributeValue === el.color)

                if (!findx) {
                    let tempImagArray = [...imagesArray];
                    tempImagArray.splice(i, 1)
                    setImagesArray(tempImagArray)
                }
            })
        }



    }
    const getSelectedValues = (attributeId, attributeName) => {
        let getAttribute = [...compState.currentProduct.attributes].filter(item => item.attribute.attributeId === attributeId);
        let value = getAttribute[0].attributeTerms.filter(el => {
            return el.preSelected === true
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
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setCompstate(compState => ({ ...compState, loading: true }))

            if (productId) {
                Axios.get(`${SITEAPIURL}/getProduct/${productId}`)
                    .then(res => {
                        if (res.data) {
                            setCompstate(compState => ({ ...compState, currentProduct: res.data.data, loading: false }));
                            setVariables(variables => res.data.data.attributes?.filter(item => item.isVariation === true));

                            let imagesVars = res.data.data.inventory.reduce((newArray, el) => {
                                if (el.Color && (newArray, newArray.findIndex(elm => elm.color === el.Color) < 0)) {
                                    let imgArray = [];
                                    (JSON.parse(el.images)).forEach((el, i) => {
                                        if (!newArray.images) {
                                            let inObj = {}
                                            inObj["image"] = el;
                                            inObj["fakePath"] = null;
                                            imgArray.push(inObj)
                                        }
                                    })

                                    let obj = {}
                                    obj["color"] = el.Color;
                                    obj["images"] = imgArray
                                    newArray.push(obj);
                                } else {
                                    let imgArray = [];
                                    (JSON.parse(el.images)).forEach((el, i) => {
                                        if (!newArray.images) {
                                            let inObj = {}
                                            inObj["image"] = el;
                                            inObj["fakePath"] = null;
                                            imgArray.push(inObj)
                                        }
                                    })

                                    let obj = {}
                                    obj["color"] = el.Color;
                                    obj["images"] = imgArray
                                    newArray.push(obj);
                                }

                                return newArray

                            }, [])

                            setImagesArray(imagesVars)

                        }
                    },
                        err => {
                            history.push("/products");
                            setCompstate(compState => ({ ...compState, loading: false }));
                        })
            }
        }
        return () => {
            mounted = false
        };
    }, [productId, history])

    const updateField = (field, value) => {
        if (compState.currentProduct.id) {
            let tempstate = { ...compState }
            tempstate.currentProduct[field] = value;
            setCompstate(compState => ({ ...compState, ...tempstate }))
        }


    }

    const removeImage = (e, variation, idx) => {
        e.preventDefault();
        let tempimagesArray = [...imagesArray]


        tempimagesArray.filter(el => el.color === variation)[0].images.splice(idx, 1)

        setImagesArray(tempimagesArray)

    }
    useEffect(() => {
        let v1 = []
        variables && variables.forEach(item => {
            let varObj = item.attributeTerms.filter(el => {
                el.attributeName = item.attribute.attributeName
                return el.values === true
            });
            v1.push(varObj)
        })
        setVariationsArray(variationsArray => [...v1])

    }, [variables, compState])
    const generateTable = useCallback(() => {
        let varList = [], max = variationsArray.length - 1;
        const helper = (arr, i) => {
            for (let j = 0, l = variationsArray[i].length; j < l; j++) {
                var a = arr.slice(0); // clone arr
                a.push(variationsArray[i][j]);
                if (i === max)
                    varList.push(a);
                else
                    helper(a, i + 1);
            }
        }
        helper([], 0);

        // setVariationsList(varList)
        varList.forEach((el, i) => {
            let obj = {}
            el.forEach(item => {
                obj[item.attributeName] = item.attributeValue
            })
            let fil = []
            if (compState.currentProduct.inventory) {
                fil = compState.currentProduct.inventory.filter(elm => {
                    let validValue = false;
                    for (var key in obj) {
                        if (obj && elm) {
                            validValue = (obj[key] === elm[key])
                        }
                        if (!validValue) {
                            break;
                        }
                    }
                    return validValue
                })
            }
            let newObj = { ...varList[i][0] }
            let updated = { ...newObj, ...fil[0] }
            varList[i][0] = updated;
        })
        setVariationsList(varList);

        return () => { return false }


    }, [variationsArray])

    useEffect(() => {
        if (variationsArray.length) {
            generateTable()
        }
    }, [variationsArray, generateTable])


    const mFileToUpload = (rFile) => {
        let fieldName = rFile.fieldName;
        let fileName = rFile.fileName;
        let obj = {
            item: fieldName,
            values: [`${fileName}`],
            files: [rFile]
        }
        setFiles(files => ([...files, obj]));

        let tempImagArray = [...imagesArray]
        let imagesToupates = tempImagArray.filter(el => el.color === fieldName);
        imagesToupates[0].images.push({
            image: fileName,
            fakePath: rFile.fileFakepath
        });
        setImagesArray(tempImagArray);


    }
    return <><h1 className="sticky-head">Edit/Update Product   </h1>

        <form onSubmit={handleSubmit(updateProduct)}>

            <input type="hidden" name="productCategory" />
            <h2 className="panel-heading">Product Information</h2>

            <div className="panel-body">
                <div className="form-group">
                    <div className="row">
                        <label className="col-12  col-sm-3">Product ID: </label>
                        <div className="col-12  col-sm-3">
                            <p>{productId}</p>
                        </div>

                    </div>
                </div>

                <div className="form-group">
                    <div className="row">


                        <label htmlFor="brand_id" className="col-12  col-sm-3">Brand </label>
                        <div className="col-12  col-sm-6 col-md-3">

                            <select
                                className={`form-control ${errors.brand_id ? "is-invalid " : " "}`}
                                name="brand_id"
                                id="brand_id"
                                disabled
                                value={compState.currentProduct.brand_id}
                                ref={register({
                                    required: "Please enter product title"
                                })}
                            >
                                <option>Choose</option>
                                {authorizeBrands.map(el => <option key={el.id} value={el.id}>{el.brandName}</option>)}
                            </select>

                            {errors.brand_id ? <span className="text-danger mb-1">{errors.brand_id.message}  </span> : null}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="productTitle" className="col-12  col-sm-3">Product Title </label>
                        <div className="col-12  col-sm-9 col-md-6">
                            <input type="text"
                                className={`form-control ${errors.productTitle ? "is-invalid " : " "}`}
                                placeholder=" Product Title"
                                name="productTitle"
                                id="productTitle"
                                defaultValue={compState.currentProduct.productTitle}
                                onChange={e => updateField("productTitle", e.target.value)}
                                ref={register({
                                    required: "Please enter product title"
                                })} />

                            {errors.productTitle ? <span className="text-danger mb-1">{errors.productTitle.message}  </span> : null}
                            <small className="form-text text-muted">Do not include brand name, color, size etc in product name</small>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="desc" className="col-12  col-sm-3">Product Description </label>
                        <div className="col-12  col-sm-9 col-md-6">
                            <CKEditor
                                config={editorConfig}
                                editor={ClassicEditor}
                                data={compState.currentProduct.prodDescription || ""}
                                onChange={(event, editor) => {
                                    updateField("prodDescription", editor.getData())
                                }}
                            />
                            <small className="form-text text-muted">Let buyers know why your product is better. We recomonned not to copy paste product description from other sites. It should be unique, as your product</small>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label htmlFor="gstRate" className="col-12  col-sm-3">GST Rate </label>
                        <div className="col-12  col-sm-9 ">
                            <select name="gstRate"
                                id="gstRate"
                                className={`custom-select ${errors.productTitle ? "is-invalid " : " "}`}
                                ref={register({
                                    required: "Please select approprite GSTIN Slab for this product"
                                })}
                                style={{ maxWidth: 200 }}
                                value={compState.currentProduct.gstRate}
                                onChange={e => updateField("gstRate", e.target.value)}
                            >
                                <option value="">Select </option>
                                <option value="0">No Tax (Exempted)</option>
                                <option value="0.25">0.25%</option>
                                <option value="5">5%</option>
                                <option value="12" >12%</option>
                                <option value="18">18%</option>
                                <option value="28">28%</option>
                            </select>

                            {errors.gstRate ? <span className="text-danger mb-1">{errors.gstRate.message}  </span> : null}
                            <small className="form-text text-muted">What is the GSTIN amout to be reflected in invoice. This should be included in your selling price.</small>
                        </div>
                    </div>
                </div>

            </div>
            <h2 className="panel-heading">Product Attributes</h2>
            <div className="panel-body">
                {compState.currentProduct?.attributes?.map((at, i) => {
                    return <div className="form-group" key={`${at.attribute.attributeId}-${i}`}><div className="row">
                        <label htmlFor="title" className="col-12  col-sm-3">{at.attribute.attributeName} <span className="required-astriek">*</span></label>
                        <div className="col-12  col-sm-9 col-md-6">

                            {at.displayType === "SelectMulti" && <><Multiselect
                                className={`custom-select ${errors[`${at.attribute.attributeName}-hidden`] ? "is-invalid " : " "}`}
                                options={at.attributeTerms}
                                displayValue="attributeValue"
                                selectedValues={getSelectedValues(at.attribute.attributeId, at.attribute.attributeName)}
                                onSelect={(selectedList) => onChange(selectedList, at.attribute.attributeId, at.attribute.attributeName)}
                                onRemove={(selectedList) => onChange(selectedList, at.attribute.attributeId, at.attribute.attributeName)}
                                disablePreSelectedValues={true}
                            />

                                <input type="hidden"
                                    name={`${at.attribute.attributeName}-hidden`}
                                    ref={register({
                                        required: "This field is required"
                                    })} />

                                {errors[`${at.attribute.attributeName}-hidden`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}-hidden`].message}  </span> : null}
                            </>}

                            {at.displayType === "SelectSingle" && <>
                                <select
                                    className="form-control"
                                    name={at.attribute.attributeName}
                                    id={at.attribute.attributeId}
                                    ref={register({
                                        required: "This field is required"
                                    })}
                                    onChange={(e) => onChange(e, at.attribute.attributeId)}
                                    value={JSON.stringify(at.attributeTerms.filter(el => el.values === true)[0])}
                                >

                                    <option value="">Select</option>
                                    {at.attributeTerms.map((v, i) => <option value={JSON.stringify(v)} key={v.id}
                                    >
                                        {v.attributeValue}
                                    </option>)}



                                </select>

                                {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null}
                            </>}

                            {at.displayType === "Input" && <>
                                <input type="hidden" className="form-control" placeholder={at.attribute.attributeName} name={at.attribute.attributeName} id={at.attribute.attributeId}
                                    ref={register({
                                        required: "This field is required"
                                    })} />

                                {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null}
                            </>}


                            {at.displayType === "Checkbox" && <>
                                <div className="row mx-0">

                                    {at.attributeTerms.map((v, i) => <div className="form-check col-12 col-sm-6 col-md-4 col-lg-3" key={v.id}>
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

                                    {at.attributeTerms.map((v, i) => <div className="form-check col-12 col-sm-6 col-md-4 col-lg-3" key={v.id}>
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
                                {/* <input type="hidden" className="form-control" placeholder={at.attribute.attributeName} name={at.attribute.attributeName} id={at.attribute.attributeId}
                                            ref={register({
                                                required: "This field is required"
                                            })} />

                                        {errors[`${at.attribute.attributeName}`] ? <span className="text-danger mb-1">{errors[`${at.attribute.attributeName}`].message}  </span> : null} */}
                            </>}

                        </div>
                    </div>
                    </div>
                })}
            </div>

            <h2 className="panel-heading">Product Inventory</h2>
            <div className="panel-body">
                <div className="table-responsive">
                    <table className="table table-striped" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" width="145">SELLER SKU* </th>
                                {variationsList.length && variationsList[0] ? variationsList[0].map((el, idx) => <th key={idx}>
                                    {el.attributeName?.toUpperCase()}*

                                </th>) : null}
                                <th scope="col" width="145">MRP* </th>
                                <th scope="col" width="145">SELLING PRICE*</th>
                                <th scope="col" width="145">STOCK* </th>
                                {/* <th scope="col">Condition </th> */}
                                <th scope="col">MANUFACTURE PART NUMBER*</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!variationsList.length ?
                                <tr>
                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].SKU ? "is-invalid " : " "}`}
                                            placeholder="Product SKU*"
                                            ref={register(
                                                {
                                                    required: "SKU is required",
                                                    pattern: {
                                                        value: /^([a-zA-Z0-9]){4,10}$/,
                                                        message: "4-10 Character alphabates, numbers"
                                                    }
                                                }
                                            )}
                                            defaultValue={compState.currentProduct && compState.currentProduct.inventory ? compState.currentProduct.inventory[0].SKU : null}
                                            name={`inventory[0].SKU`}
                                            onChange={e => updateValue(e, 0, "SKU")}
                                        />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[0]?.SKU?.message}</span>}

                                    </td>

                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].mrp ? "is-invalid " : " "}`}
                                            placeholder="MRP"
                                            defaultValue={compState.currentProduct && compState.currentProduct.inventory ? compState.currentProduct.inventory[0].mrp : null}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "mrp")}
                                            ref={register(
                                                {
                                                    required: "Please provide MRP for the product",
                                                    validate: val => val >= 0 || "MRP Can't be Negative"
                                                }
                                            )}
                                            onChange={e => updateValue(e, 0, "mrp")}
                                            name={`inventory[0].mrp`} />
                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].mrp?.message}</span>}
                                    </td>

                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].sellingPrice ? "is-invalid " : " "}`}
                                            placeholder="Selling Price"
                                            defaultValue={compState.currentProduct && compState.currentProduct.inventory ? compState.currentProduct.inventory[0].sellingPrice : null}
                                            onChange={e => updateValue(e, 0, "sellingPrice")}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "price")}
                                            ref={register(
                                                {
                                                    required: "Please enter selling price",
                                                    validate: val => {
                                                        if (+val < 0) {
                                                            return false || "Selling Price Can't be Negative"
                                                        }
                                                        if (+val > +getValues(`inventory[0].mrp`)) {
                                                            return false || "Selling Price could not be greater then MRP"
                                                        }

                                                        return true
                                                    }
                                                }
                                            )}
                                            name={`inventory[0].sellingPrice`} />


                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].sellingPrice?.message}</span>}
                                    </td>
                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].stock ? "is-invalid " : " "}`}
                                            placeholder="Selling Price"
                                            defaultValue={compState.currentProduct && compState.currentProduct.inventory ? compState.currentProduct.inventory[0].stock : null}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "price")}
                                            ref={register(
                                                {
                                                    required: "Please add stock in hand",
                                                    validate: val => val >= 0 || "Inventory Can't be below 0"
                                                }
                                            )}
                                            name={`inventory[0].stock`}
                                            onChange={e => updateValue(e, 0, "stock")}
                                        />


                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].stock?.message}</span>}
                                    </td>

                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].manuFPartNumber ? "is-invalid " : " "}`}
                                            placeholder="Manufacture part number"
                                            defaultValue={compState.currentProduct && compState.currentProduct.inventory ? compState.currentProduct.inventory[0].manuFPartNumber : null}
                                            ref={register({ required: "This is required" })}
                                            name={`inventory[0].manuFPartNumber`}
                                            onChange={e => updateValue(e, 0, "manuFPartNumber")} />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].manuFPartNumber?.message}</span>}
                                    </td>

                                </tr> :
                                variationsList.map((item, index) => <tr key={index}>

                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.SKU ? "is-invalid " : " "}`}
                                            placeholder="Product SKU*"
                                            ref={register(
                                                {
                                                    required: "SKU is required",
                                                    pattern: {
                                                        value: /^([a-zA-Z0-9]){4,10}$/,
                                                        message: "4-10 Character alphabates, numbers"
                                                    }
                                                }
                                            )}
                                            onChange={e => updateValue(e, index, "SKU")}
                                            value={(item[0].SKU !== undefined) ? item[0].SKU : ""}
                                            name={`inventory[${index}].SKU`} />
                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.SKU?.message}</span>}

                                    </td>
                                    {item.map((el, idx) => <td key={idx}>
                                        {el.attributeValue?.toUpperCase()}
                                        <input type="hidden"
                                            className={`form-control ${errors.inventory && errors.inventory[index] && errors.inventory[index][el.attributeName] ? "is-invalid " : " "}`}
                                            placeholder={el.attributeName}
                                            defaultValue={el.attributeValue}

                                            ref={register({ required: true })}
                                            name={`inventory[${index}].${el.attributeName}`} />
                                    </td>)}
                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.mrp ? "is-invalid " : " "}`}
                                            placeholder="MRP"
                                            value={(item[0].mrp !== undefined) ? item[0].mrp : ""}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "mrp")}
                                            onChange={e => updateValue(e, index, "mrp")}
                                            ref={register(
                                                {
                                                    required: "Please provide MRP for the product",
                                                    validate: val => val >= 0 || "MRP Can't be Negative"
                                                }
                                            )}
                                            name={`inventory[${index}].mrp`} />
                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.mrp?.message}</span>}
                                    </td>
                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.sellingPrice ? "is-invalid " : " "}`}
                                            placeholder="Selling Price"
                                            value={(item[0].sellingPrice !== undefined) ? item[0].sellingPrice : ""}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "price")}
                                            onChange={e => updateValue(e, index, "sellingPrice")}
                                            ref={register(
                                                {
                                                    required: "Please enter selling price",
                                                    validate: val => {
                                                        if (+val < 0) {
                                                            return false || "Selling Price Can't be Negative"
                                                        }
                                                        if (+val > +getValues(`inventory[${index}].mrp`)) {
                                                            return false || "Selling Price could not be greater then MRP"
                                                        }

                                                        return true
                                                    }
                                                }
                                            )}
                                            name={`inventory[${index}].sellingPrice`} />


                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.sellingPrice?.message}</span>}
                                    </td>
                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.stock ? "is-invalid " : " "}`}
                                            placeholder="Inventory"
                                            value={(item[0].stock !== undefined) ? item[0].stock : ""}
                                            onChange={e => updateValue(e, index, "stock")}
                                            ref={register(
                                                {
                                                    required: "Please add stock in hand",
                                                    validate: val => val >= 0 || "Inventory Can't be below 0"
                                                }
                                            )}
                                            name={`inventory[${index}].stock`} />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.stock?.message}</span>}
                                    </td>

                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.manuFPartNumber ? "is-invalid " : " "}`}
                                            placeholder="Manufacture part number"
                                            value={(item[0].manuFPartNumber !== undefined) ? item[0].manuFPartNumber : ""}
                                            ref={register({ required: "This is required" })}
                                            onChange={e => updateValue(e, index, "manuFPartNumber")}
                                            name={`inventory[${index}].manuFPartNumber`} />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.manuFPartNumber?.message}</span>}
                                    </td>
                                </tr>
                                )
                            }

                        </tbody>

                    </table>


                </div>
            </div>
            <h2 className="panel-heading">Product Images</h2>
            <div className="panel-body">
                {imagesArray.map((img, i) => {
                    return <div key={i}>
                        {img.color ? <h3 className="h5">Upload Images for {img.color} color product</h3> : null}
                        <input type="text"
                            className="hidden"
                            id={`${img.color}`}
                            name={`${img.color}`}
                            defaultValue={img.images.length ? JSON.stringify(img.images) : null}
                            ref={register(
                                { required: `Please upload images for ${img.color} color products` }
                            )}

                        />
                        <div className="row mb-3" >
                            {img.images.map((image, i) => {
                                return <div id={i} className="col-6 col-sm-4 col-md-3" key={i + "ac"}><div className="preview">
                                    <img src={image.fakePath ? image.fakePath : `${IMG_LOCATION}/productImages/${image.image}`} className="img-fluid" alt={image} />
                                    <div className="action-bar"><button type="button" className="btn btn-danger" onClick={e => removeImage(e, img.color, i)}> <FaTimes /> <span className="visually-hidden">Remove</span></button></div>


                                </div>

                                </div>
                            })}
                        </div>

                        <MultiFileUpload
                            fieldName={`${img.color}File`}
                            mFileToUpload={mFileToUpload}
                            accept={"image/jpg, image/png,image/jpeg"}
                            multi={true} value={""} />
                        {errors[img.color] ? <span className="text-danger mb-1">{errors[img.color].message}  </span> : null}
                    </div>
                })}

            </div>
            <h2 className="panel-heading">Other Information</h2>
            <div className="panel-body">

                <div className="form-group">
                    <div className="row">
                        <label htmlFor="handlingTime" className="col-12  col-sm-3">Handeling Time (Days) <span className="required-astriek">*</span></label>
                        <div className="col-12 col-sm-9 col-md-6">
                            <select name="handlingTime" id="handlingTime"
                                style={{ width: '150px' }}
                                className={`custom-select ${errors.productTitle ? "is-invalid " : " "}`}
                                value={compState.currentProduct.handlingTime}
                                ref={register({
                                    required: "Please select approprite GSTIN Slab for this product"
                                })}
                                onChange={e => updateField("handlingTime", e.target.value)}
                            >
                                <option value="">Select </option>
                                <option value="day">1 day</option>
                                {[2, 3, 4, 5, 7, 10, 12, 15].map((day) => <option value={day} key={day}>{day} days</option>)}

                            </select>

                            {errors.handlingTime ? <span className="text-danger mb-1">{errors.handlingTime.message}  </span> : null}

                            <small className="form-text text-muted">How much time will you take to mark this product ready to ship, when you recieve an order.</small>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="fulFilledBy" className="col-12  col-sm-3">Fulfilled By <span className="required-astriek">*</span></label>
                        <div className="col-12 col-sm-9 col-md-6">
                            <select name="fulFilledBy" id="fulFilledBy"
                                style={{ width: '150px' }}
                                className={`custom-select ${errors.productTitle ? "is-invalid " : " "}`}
                                value={"Seller"}
                                ref={register({
                                    required: "This field is required"
                                })}
                                onChange={e => updateField("fulFilledBy", e.target.value)}
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
                                config={editorConfig}
                                editor={ClassicEditor}
                                data={compState.currentProduct.prodFeatures || ""}

                                onChange={(event, editor) => {
                                    updateField("prodFeatures", editor.getData())
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
                                defaultValue={compState.currentProduct.legalDisclaimer}
                                ref={register()}
                                onChange={e => updateField("legalDisclaimer", e.target.value)}
                            ></textarea>

                            {errors.legalDisclaimer ? <span className="text-danger mb-1">{errors.legalDisclaimer.message}  </span> : null}

                            <small className="form-text text-muted">Any disclaimer text, which you want to tell your buyers before they make a purchase. i.e. Product Color May Slightly Vary Due to Photographic Lighting Sources or Your Monitor Settings </small>
                        </div></div>
                </div>


            </div>
            <h2 className="panel-heading">Parcel Information</h2>
            <div className="panel-body">
                <p className="form-text text-muted pb-4">* Please enter parcel weight and dimensions, the shipping charges will be calcuated based on it</p>
                <div className="form-group">

                    <div className="row">
                        <label htmlFor="packetWeight" className="col-12  col-sm-3">Packaging Weight (Grams)</label>
                        <div className="col-12  col-sm-6 col-md-3">

                            <input type="number"
                                placeholder="Packaging Weight (Grams)"
                                className={`form-control ${errors.packetWeight ? "is-invalid " : " "}`}
                                name="packetWeight"
                                id="packetWeight"
                                defaultValue={compState.currentProduct.packetWeight}
                                onBlur={checkCharges}
                                ref={register({
                                    required: "Package weight is required for shipping charges calculations",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Please enter numbers only"
                                    }
                                })}
                                onChange={e => updateField("packetWeight", e.target.value)}
                            />
                            {errors.packetWeight ? <span className="text-danger mb-1">{errors.packetWeight.message}  </span> : null}
                        </div>

                    </div>
                </div>
                <div className="form-group">

                    <div className="row">
                        <label htmlFor="packetWidth" className="col-12  col-sm-3">Packaging Width (cm)</label>
                        <div className="col-12  col-sm-6 col-md-3">

                            <input type="number"
                                className={`form-control ${errors.packetWidth ? "is-invalid " : " "}`}

                                placeholder="Packaging Width (cm)"
                                name="packetWidth"
                                id="packetWidth"
                                defaultValue={compState.currentProduct.packetWidth}
                                onBlur={checkCharges}
                                ref={register({
                                    required: "Package weight is required for shipping charges calculations",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Please enter numbers only"
                                    }
                                })}
                                onChange={e => updateField("packetWidth", e.target.value)}
                            />
                            {errors.packetWidth ? <span className="text-danger mb-1">{errors.packetWidth.message}  </span> : null}
                        </div>

                    </div>
                </div>
                <div className="form-group">

                    <div className="row">
                        <label htmlFor="packetHeight" className="col-12  col-sm-3">Packaging Height (cm)</label>
                        <div className="col-12 col-sm-6 col-md-3">

                            <input type="number"
                                className={`form-control ${errors.packetHeight ? "is-invalid " : " "}`}
                                placeholder="Packaging Height (cm)"
                                name="packetHeight"
                                onBlur={checkCharges}
                                defaultValue={compState.currentProduct.packetHeight}
                                ref={register({
                                    required: "Package height is required for shipping charges calculations",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Please enter numbers only"
                                    }
                                })}
                                onChange={e => updateField("packetHeight", e.target.value)}
                            />
                            {errors.packetHeight ? <span className="text-danger mb-1">{errors.packetHeight.message}  </span> : null}
                        </div>

                    </div>
                </div>
                <div className="form-group">

                    <div className="row">
                        <label htmlFor="packetLength" className="col-12  col-sm-3">Packaging Length (cm)</label>
                        <div className="col-12 col-sm-6 col-md-3">

                            <input type="number"
                                className={`form-control ${errors.packetLength ? "is-invalid " : " "}`}
                                placeholder="Packaging Length (cm)"
                                name="packetLength"
                                defaultValue={compState.currentProduct.packetLength}
                                onBlur={checkCharges}
                                ref={register({
                                    required: "Package length is required for shipping charges calculations",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Please enter numbers only"
                                    }
                                })}
                                onChange={e => updateField("packetLength", e.target.value)}
                            />
                            {errors.packetLength ? <span className="text-danger mb-1">{errors.packetLength.message}  </span> : null}
                        </div>

                    </div>
                </div>
            </div>
            <h2 className="panel-heading">Shipping Charges</h2>
            <div className="panel-body">
                <p className="form-text text-muted mb-0">
                    * By default customer will not be charged any shipping charges. and a Free shipping badge will be shown at product info page</p>

                <p className="form-text text-muted pb-4">
                    ** You can choose here to charge complete shipping charges from customer or split it between you and customer</p>


                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" className="text-center">Local</th>
                            <th scope="col" className="text-center">Zonal</th>
                            <th scope="col" className="text-center">National</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Cost</td>
                            <td className="text-center">40</td>
                            <td className="text-center">50</td>
                            <td className="text-center">90</td>
                        </tr>
                        <tr>
                            <td>Cost to you</td>
                            <td className="text-center">40</td>
                            <td className="text-center">50</td>
                            <td className="text-center">50</td>
                        </tr>
                        <tr>
                            <td>Charge from customer</td>
                            <td className="text-center">

                                <input
                                    type="number"
                                    placeholder="Local"
                                    className={`form-control ${errors.shippingToLocal ? "is-invalid " : " "}`}
                                    name="shippingToLocal"
                                    id="shippingToLocal"
                                    defaultValue={compState.currentProduct.shippingToLocal}
                                    ref={register({
                                        required: "Package weight is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                    style={{ maxWidth: 100, display: "inline-block", textAlign: "center" }}
                                    onChange={e => updateField("shippingToLocal", e.target.value)}
                                />

                            </td>
                            <td className="text-center">
                                <input
                                    type="number"
                                    placeholder="Local"
                                    className={`form-control ${errors.shippingToZonal ? "is-invalid " : " "}`}
                                    name="shippingToZonal"
                                    id="shippingToZonal"
                                    defaultValue={compState.currentProduct.shippingToZonal}
                                    ref={register({
                                        required: "Package weight is required for shipping charges calculations",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter numbers only"
                                        }
                                    })}
                                    style={{ maxWidth: 100, display: "inline-block", textAlign: "center" }}
                                    onChange={e => updateField("shippingToZonal", e.target.value)}
                                />

                            </td>
                            <td className="text-center"><input
                                type="number"
                                placeholder="Local"
                                className={`form-control ${errors.shippingToNational ? "is-invalid " : " "}`}
                                name="shippingToNational"
                                id="shippingToNational"
                                defaultValue={compState.currentProduct.shippingToNational}
                                ref={register({
                                    required: "Package weight is required for shipping charges calculations",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Please enter numbers only"
                                    }
                                })}
                                onChange={e => updateField("shippingToNational", e.target.value)}
                                style={{ maxWidth: 100, display: "inline-block", textAlign: "center" }}
                            />

                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="3">  {errors.shippingToLocal ? <span className="text-danger mb-1">{errors.shippingToLocal.message}  </span> : null}

                                {errors.shippingToZonal ? <span className="text-danger mb-1">{errors.shippingToZonal.message}  </span> : null}

                                {errors.shippingToNational ? <span className="text-danger mb-1">{errors.shippingToNational.message}  </span> : null}</td>
                        </tr>

                    </tbody>
                </table>


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
                                defaultValue={compState.currentProduct.metaTitle}
                                ref={register({
                                    maxLength: {
                                        value: 55,
                                        message: "Meta Title should not exceed 55 character limit"
                                    }
                                })}
                                onChange={e => updateField("metaTitle", e.target.value)}
                            />

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
                                defaultValue={compState.currentProduct.metaDescription}
                                ref={register({
                                    maxLength: {
                                        value: 155,
                                        message: "Meta Title should not exceed 155 character limit"
                                    }
                                })}
                                onChange={e => updateField("metaDescription", e.target.value)}

                            ></textarea>

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
                                defaultValue={compState.currentProduct.searchKeywords}
                                ref={register({
                                })}
                                onChange={e => updateField("searchKeywords", e.target.value)}
                            />

                            {errors.searchKeywords ? <span className="text-danger mb-1">{errors.searchKeywords.message}  </span> : null}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between">

                <button type="submit" className="btn btn-danger btn-lg mb-5" >Update</button>
            </div>
        </form>
        {compState.loading ? <Loader /> : null}
    </>

}


export default DashboardLayout(EditProduct)
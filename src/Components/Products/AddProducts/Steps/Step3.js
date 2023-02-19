import React, { useEffect, useState, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionCreator from "../../../../Store/actions/index"
import MultiFileUpload from "../../../../UI/FileUpload/MultiFileUpload";
import "./Step1.scss";

const Step3 = ({ activateStep }) => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [variationsArray, setVariationsArray] = useState([])
    const [variationsList, setVariationsList] = useState([]);
    const [colors, setColors] = useState([])
    const [productImages, setProductImages] = useState([])
    const [files, setFiles] = useState([])

    const { handleSubmit, errors, register, control, getValues } = useForm();
    useFieldArray({
        control,
        name: "inventory"
    });

    const { currentProduct, currentProductSelectedCategories } = useSelector(state => state.product)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        let up = [];

        if (currentProduct.images) {
            up = [...productImages, ...currentProduct.images]
        }

        setTimeout(() => {
            setProductImages(productImages => [...productImages, ...up])

        }, 500);

    }, [currentProduct])

    const onSubmit = data => {
        data.inventory.forEach((el, i) => {
            let images = [];
            if (el.Color) {
                images = productImages.filter(elm => elm.item === el.Color)[0].values
            } else {
                images = productImages[0].values
            }
            data.inventory[i].images = images;
        })


        dispatch(actionCreator.updateCurrentEditingProduct({ images: productImages }))
        dispatch(actionCreator.updateCurrentProductInventory(data))
        history("/add-products/step4");

        activateStep("step4")
    };
    const prevStep = useCallback(() => {
        history("/add-products/step2");
    }, [history])

    useEffect(() => {
        if (!currentProductSelectedCategories.length) {
            history("/add-products");
        }
    }, [currentProductSelectedCategories, history])
    useEffect(() => {
        let variations = currentProduct.attributes.filter(item => item.isVariation === true)

        let v1 = [...variationsArray]
        variations.forEach(item => {
            Array.isArray(item.attributeTerms[0].values)

            if (Array.isArray(item.attributeTerms[0].values)) {
                let temp = []
                item.attributeTerms[0].values.forEach((elm, i) => {
                    let varObj = {}
                    varObj.attributeId = item.attribute.attributeId;
                    varObj.attributeName = item.attribute.attributeName;
                    varObj.attributeValue = elm;
                    varObj.values = true;
                    temp.push(varObj)
                })
                v1.push(temp)
            } else {
                let varObj = item.attributeTerms.filter(el => {
                    el.attributeName = item.attribute.attributeName
                    return el.isAllowed && el.values
                });
                v1.push(varObj)
            }
        })
        setVariationsArray(variationsArray => [...v1])

    }, [])
    const generateTable = useCallback((...variationsArray) => {


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
        varList.forEach((el, i) => {
            let obj = {}
            el.forEach(item => {
                obj[item.attributeName] = item.attributeValue


            })

            let fil = currentProduct.inventory.filter(elm => {
                let validValue = false;
                for (var key in obj) {
                    validValue = obj[key] === elm[key]
                    if (!validValue) {
                        break;
                    }
                }
                return validValue
            })
            let newObj = { ...varList[i][0] }
            let updated = { ...newObj, ...fil[0] }
            varList[i][0] = updated;
        })
        setVariationsList(varList);

        return () => { return false }

    }, [currentProduct.inventory])
    useEffect(() => {
        if (variationsArray.length) {
            generateTable(...variationsArray)
        }

    }, [variationsArray, generateTable])

    useEffect(() => {
        let colorsAttribute = currentProduct.attributes.filter(item => item.attribute.attributeName === "Color")
        let colorTerms = colorsAttribute && colorsAttribute[0]?.attributeTerms.filter(el => el.values === true)
        let colors = []
        colorTerms && colorTerms.forEach(el => colors.push(el.attributeValue))
        setColors([...colors])

    }, [currentProduct])

    const mFileToUpload = (rFile) => {
        let fieldName = rFile.fieldName;
        let fileName = rFile.fileName;
        let obj = {
            item: fieldName,
            values: [`${fileName}`],
            files: [rFile]
        }

        setFiles(files => ([...files, obj]))

    }

    useEffect(() => {

        let pImages = [...files].reduce((newArray, el) => {
            let refarray = newArray.filter(elm => elm.item === el.item);
            if (refarray.length) {
                let refarrayIdx = newArray.findIndex(elm => elm.item === el.item)
                newArray[refarrayIdx].values = [...newArray[refarrayIdx].values, ...el.values]
                newArray[refarrayIdx].files = [...newArray[refarrayIdx].files, ...el.files]
            } else {
                newArray.push({ item: el.item, values: [...el.values], files: [...el.files] })
            }
            return newArray

        }, [])
        setProductImages(pImages)
    }, [files])



    const removeImage = (e, color, idx) => {
        e.preventDefault()

        let images = [...productImages];
        let imageobj = images.filter((el) => el.item === color)[0];
        let imageobjIdx = images.findIndex((el) => el.item === color);
        imageobj.values.splice(idx, 1);
        imageobj.files.splice(idx, 1)
        images[imageobjIdx] = imageobj;

        let files1 = [...files]
        files1.splice(idx, 1)
        setProductImages(images)
        setFiles(files1)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="panel-heading">Images and Inventory</h2>
                <div className="panel-body">

                    <div className="table-responsive">
                        <table className="table table-striped" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" width="145">SELLER SKU* </th>
                                    {variationsList.length && variationsList[0] ? variationsList[0].map((el, idx) => <th key={idx}>
                                        <div className="color">

                                        {el.attributeName === 'Color'? <><div>color Shade</div><div>Brand Color</div></>:`${el.attributeName?.toUpperCase()}*`}
                                        </div>

                                </th>) : null}
                                    <th scope="col" width="145">MRP* </th>
                                    <th scope="col" width="145">SELLING PRICE*</th>
                                    <th scope="col" width="145">STOCK* </th>
                                    {/* <th scope="col">Condition </th> */}
                                    <th scope="col">MANUFACTURE PART NUMBER</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!variationsList.length ? <tr>
                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].SKU ? "is-invalid " : " "}`}
                                            placeholder="Product SKU*"
                                            ref={register(
                                                {
                                                    required: "SKU is required"
                                                }
                                            )}
                                            defaultValue={variationsList && variationsList[0] ? variationsList[0].SKU : null}
                                            name={`inventory[0].SKU`} />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[0]?.SKU?.message}</span>}

                                    </td>

                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].mrp ? "is-invalid " : " "}`}
                                            placeholder="MRP"
                                            defaultValue={variationsList && variationsList[0] ? variationsList[0].mrp : null}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "mrp")}
                                            ref={register(
                                                {
                                                    required: "Please provide MRP for the product",
                                                    validate: val => val >= 0 || "MRP Can't be Negative"
                                                }
                                            )}
                                            name={`inventory[0].mrp`} />
                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].mrp?.message}</span>}
                                    </td>

                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].sellingPrice ? "is-invalid " : " "}`}
                                            placeholder="Selling Price"
                                            defaultValue={variationsList && variationsList[0] ? variationsList[0].sellingPrice : null}
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
                                            defaultValue={variationsList && variationsList[0] ? variationsList[0]?.stock : null}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "price")}
                                            ref={register(
                                                {
                                                    required: "Please add stock in hand",
                                                    validate: val => val >= 0 || "Inventory Can't be below 0"
                                                }
                                            )}
                                            name={`inventory[0].stock`} />


                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].stock?.message}</span>}
                                    </td>

                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[0] && errors.inventory[0].manuFPartNumber ? "is-invalid " : " "}`}
                                            placeholder="Manufacture part number"
                                            defaultValue={variationsList && variationsList[0] ? variationsList[0].manuFPartNumber : null}
                                            ref={register()}
                                            name={`inventory[0].manuFPartNumber`} />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[0].manuFPartNumber?.message}</span>}
                                    </td>

                                </tr> : variationsList.map((item, index) => <tr key={index}>
                                    <td>
                                        <input type="text"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.SKU ? "is-invalid " : " "}`}
                                            placeholder="Product SKU*"
                                            ref={register(
                                                {
                                                    required: "SKU is required",
                                                }
                                            )}
                                            defaultValue={item[0]?.SKU}
                                            name={`inventory[${index}].SKU`} />

                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.SKU?.message}</span>}

                                    </td>
                                    {item.map((el, idx) => <td key={idx}>
                                        <div className="color">
                                            <div>

                                        {el.attributeValue?.toUpperCase()}
                                        <input type="hidden"
                                            className={`form-control ${errors.inventory && errors.inventory[index] && errors.inventory[index][el.attributeName] ? "is-invalid " : " "}`}
                                            placeholder={el.attributeName}
                                            defaultValue={el.attributeValue}
                                            ref={register({ required: true })}
                                            name={`inventory[${index}].${el.attributeName}`} />
                                            </div>
                                            <div>

                                            {el.attributeName === 'Color'?  <>

                                            <input type="te"xt
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.BrandColor ? "is-invalid " : " "}`}
                                            placeholder="Red etc."
                                            defaultValue={item[0]?.BrandColor}
                                            ref={register(
                                                {
                                                    required: "Please enter color name",
                                                }
                                            )}
                                            name={`inventory[${index}].BrandColor`} />
                                        {errors.inventory && <span className="text-danger">{errors.inventory[index]?.BrandColor?.message}</span>}

                                            </>:null}
</div>
                                         </div>
                                    </td>)}
                                    <td>
                                        <input type="number"
                                            className={`form-control ${errors.inventory && errors.inventory[index]?.mrp ? "is-invalid " : " "}`}
                                            placeholder="MRP"
                                            defaultValue={item[0]?.mrp}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "mrp")}
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
                                            defaultValue={item[0]?.sellingPrice}
                                            //  onBlur={e=>checkPrice(e.target.value, index, "price")}
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
                                            defaultValue={item[0]?.stock}
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
                                            defaultValue={item[0]?.manuFPartNumber}
                                            ref={register()}
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
                <h2 className="panel-heading">Upload Product Images</h2>
                <div className="panel-body">
                    {!colors.length ? <>
                        <input type="hidden"
                            id="productImages"
                            name="productImages"
                            defaultValue={JSON.stringify(productImages[0]?.files)}
                            ref={register(
                                { required: "Please upload images" }
                            )}

                        />
                        {productImages.map((img, i) => {
                            return <div className="row mb-3" key={i + "ac"}>
                                {img.files.map((el, id) => <div id={i} key={id} className="col-6 col-sm-4 col-md-3"><div className="preview" id={id + "11"}>
                                    <img src={el.fileFakepath} className="img-fluid" alt={el.fileFakepath} />
                                    <div className="action-bar"><button type="button" className="btn btn-danger" onClick={e => removeImage(e, null, id)}> <FaTimes /> <span className="visually-hidden">Remove</span></button></div>


                                </div></div>)}

                            </div>
                        })}


                        <MultiFileUpload
                            fieldName="productImagesFile"
                            mFileToUpload={mFileToUpload}
                            accept={"image/jpg, image/png,image/jpeg"}
                            multi={true} value={""} />
                        {errors.productImages ? <span className="text-danger mb-1">{errors.productImages.message}  </span> : null}

                    </> : colors.map((color, i) => <div id={i} key={i}>
                        <h3 className="h5">Upload Images for {color} color product</h3>
                        <input type="text"
                            className="hidden"
                            id={`${color}`}
                            name={`${color}`}
                            defaultValue={JSON.stringify(productImages.filter(el => el.item === color)[0]?.files)}
                            ref={register(
                                { required: `Please upload images for ${color} color products` }
                            )}

                        />
                        {productImages.filter(el => el.item === color).map((img, i) => {
                            return <div className="row" key={i}>
                                {img.files.map((el, id) => <div key={id} className="col-6 col-sm-4 col-md-3">
                                    <div className="preview" id={id + "11"}>
                                        <img src={el.fileFakepath} className="img-fluid" alt={el.fileFakepath} />
                                        <div className="action-bar">

                                            <button type="button" className="btn btn-danger" onClick={e => removeImage(e, color, id)}> <FaTimes /> <span className="visually-hidden">Remove</span></button></div>
                                    </div>

                                </div>)}

                            </div>
                        })}


                        <MultiFileUpload
                            fieldName={`${color}File`}
                            mFileToUpload={mFileToUpload}
                            accept={"image/jpg, image/png,image/jpeg"}
                            multi={true} value={""} />

                        {errors[color] ? <span className="text-danger mb-1">{errors[color].message}  </span> : null}

                    </div>)}

                </div>
                <div className="d-flex justify-content-between">

                    <button type="button" className="btn btn-danger btn-lg mb-5" onClick={prevStep}>Step 2</button>

                    <button type="submit" className="btn btn-danger btn-lg mb-5" >Next Step</button>
                </div>
            </form>

        </>
    );
};
export default Step3;
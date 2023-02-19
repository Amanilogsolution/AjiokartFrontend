import React, { useState, useEffect } from 'react';
import { IMG_LOCATION, SITEAPIURL, SITEGENAPIURL } from "../../../../cons"
import Axios from 'axios';
import FileUpload from '../../../../UI/FileUpload/FileUpload';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { FaTimes, FaEye } from 'react-icons/fa';
import Loader from "../../../Loader/Loader"

const SiteCarousel = ({ brandingData , categoryMenu}) => {
    const [loading, setLoading] = useState(false);
    const [uploads, setUploads] = useState({})
    const [files, setFiles] = useState([])
    const [rows, setRows] = useState([{ slideTitle: "Shop with confidence", slideDescription: "Quality Products. Free Shipping. Easy Returns.", btnText: "ALL PRODUCTS", btnLink: "/products", slideImage: "" }])
    useEffect(() => {
        if (brandingData?.carousel?.length) {
            setRows(brandingData.carousel)
        }
    }, [brandingData])
    const addRow = () => {
        setRows([...rows, { slideTitle: "", slideDescription: "", btnText: "", btnLink: "", slideImage: "" }])
    }
    const removeRow = (e, i, slideId) => {
        if(slideId){
        setLoading(true)
        Axios.post(`${SITEAPIURL}/superSiteCarouselDelete`, {
            id: slideId,
        }).then(res => {
            let slides = [...rows];
            slides.splice(i, 1);
            setRows(slides);
            setLoading(false)
        }, err => {
            setLoading(false)
        })
    }else{
        let temprows = [...rows]
        temprows.splice(i,1)
        setRows(temprows);
    }

    }
    const update = () => {
        setLoading(true)
        files.forEach(file => {
            let formData = new FormData()
            formData.append('image', file.file)
            formData.append('folderName', "slideimage")
            formData.append('fileName', file.fileName)
            formData.append('type', file.fieldName)
            Axios.post(`${SITEGENAPIURL}/file-upload`, formData)
                .then(res => {
                    setFiles([])
                }).catch(err => {
                    console.log(err)
                })
        })
        Axios.post(`${SITEAPIURL}/superSiteCarousel`, rows)
            .then(res => {
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

    }

    const fileToUpload = (rFile,i) => {
        let fieldName = rFile.fieldName;
        let fileName = rFile.fileName;

        let slides = [...rows]
        let slide = slides[i];
        slide.slideImage = `${fileName}`;
        slides[i] = slide
        setRows([...slides])

        setFiles([...files, rFile])
        let filet = {};
        filet[fieldName] = fileName;
        setUploads({ ...uploads, ...filet })
    }


    const setValueF = (e, i, fieldName) => {
        let slides = rows
        let slide = slides[i];
        slide[fieldName] = e.target ? e.target.value : e;
        slides[i] = slide
        setRows([...slides])


    }


    return (
        <React.Fragment>
            <h2 className="panel-heading">Carousel Slides</h2>
            <div className="panel-body pt-1">
                <small className="form-text text-muted">* Image should be maximum 500px wide and 300px in height</small>
                <small className="form-text text-muted pb-4">** You must have atlease one product to enable link at carousel</small>
                <div className="row">

                    <div className="col justify-content-end d-flex">
                        {rows?.length < 3 ? <button className="btn btn-primary mb-1" onClick={addRow}>Add New Slide</button> : null}
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" style={{minWidth:180}}>Slide Title</th>
                                <th scope="col" style={{minWidth:200}}>Slide Description</th>
                                <th scope="col" style={{minWidth:157}}>Button Text</th>
                                <th scope="col" style={{minWidth:150}}>Button Link</th>
                                <th scope="col" colSpan="2">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows?.map((slide, i) => <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td><input type="text" placeholder="Slide Title" className="form-control" name="slideTitle"
                                    onChange={(e) => setValueF(e, i, "slideTitle")} defaultValue={slide.slideTitle || ""} /></td>
                                <td><input type="text" placeholder="Slide Description" className="form-control" name="slideDescription"
                                    onChange={(e) => setValueF(e, i, "slideDescription")} defaultValue={slide?.slideDescription || ""}
                                /></td>
                                <td><input type="text" placeholder="Button Text" className="form-control" name="btnText"
                                    onChange={(e) => setValueF(e, i, "btnText")} defaultValue={slide.btnText || ""} /></td>
                                <td>
                                    <select className="form-control" name="btnLink" onChange={(e) => setValueF(e, i, "btnLink")}
                                        defaultValue={slide?.btnLink || ""} >
                                        <option value="">Select</option>
                                        <option value="/products">All Products</option>
                                        {categoryMenu.map((el,i)=><option key={i} value={`/products/${encodeURIComponent(el.categoryName.replace(/ /g, "-").toLocaleLowerCase())}/${el.id}`}>{el.categoryName}</option>)}
                                    </select>
                                </td>
                                <td>

                                    <input type="hidden"
                                        className="form-control"
                                        id="slideImage"
                                        placeholder="Youtube Channel URL"
                                        name={`slideImage-${i}`}
                                        defaultValue={slide.slideImage || ""}
                                        onChange={(e) => setValueF(e, i, "slideImage")}

                                    />
                                    <FileUpload fieldName={`slideImage-${i}File`} fileToUpload={fileToUpload} index={i} accept="image/jpg,image/png,image/jpeg" />


                                        <OverlayTrigger
                                            key={"top"}
                                            placement={"left"}
                                            overlay={
                                                <Tooltip id={`tooltip1`}>
                                                      <div style={{ background: "#fff" }}>
                                                    <img src={files[i]?.fileFakepath?files[i]?.fileFakepath :slide.slideImage?`${IMG_LOCATION}/slideimage/${slide.slideImage}`:"https://1.AJIOKART.com/assets/default-banner-image.png"} alt="Carousel Slide" className="img-fluid" width="200" />
                                                    </div>

                                                </Tooltip>
                                            }
                                        >
                                            <span> &nbsp; <FaEye /> Preview</span>

                                        </OverlayTrigger>


                                </td>
                                <td> {i !== 0 ? <button className="btn btn-danger" onClick={e => removeRow(e, i, slide.id)}><FaTimes /></button> : null}</td>
                            </tr>)}
                        </tbody>
                    </table>

                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-danger btn-lg" onClick={update}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? <Loader /> : null}

        </React.Fragment >
    )

}

export default SiteCarousel;

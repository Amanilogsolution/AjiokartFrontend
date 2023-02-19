import Axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, BrowserRouter as Router, Route, useNavigate } from "react-router-dom"
import { SITEGENAPIURL } from '../../../cons';
import DashboardLayout from '../../../HOC/DashboardLayout';
import "./AddProducts.scss";
import Step1 from "./Steps/Step1"
import Step2 from "./Steps/Step2"
import Step3 from "./Steps/Step3"
import Step4 from "./Steps/Step4"
import Step5 from "./Steps/Step5"

const AddProducts = (props) => {

    const [countryList, setCountryList] = useState([]);
    const history = useNavigate()
    const [stepActive, setStepActive] = useState({
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
    })

    const activateStep = (step) => {
        let obj = {}
        obj[step] = true
        setStepActive({ ...stepActive, ...obj })
    }

    const handleClick = (e, step) => {
        if (!stepActive[step]) {
            e.preventDefault()
        }
    }
    const goToManageBrands = () => {
        history.push("/manage-brands")
    }
    useEffect(()=>{
        Axios.get(`${SITEGENAPIURL}/countryList`)
        .then(res=>{
            setCountryList(res.data.data)
        })
},[])
    return (<>


        <nav className="container">
            <ul className="steps">
                <li >
                    <Link to="/add-products" title="Select Product Category"><span>Select Product Category</span></Link>
                </li>
                <li>
                    <Link to="/add-products/step2" className={!stepActive.step2 ? "inactive" : null} title="Product Information" onClick={e => handleClick(e, "step2")}><span>Product Information</span></Link>
                </li>
                <li>
                    <Link to="/add-products/step3" className={!stepActive.step3 ? "inactive" : null} title="Images and Inventory" onClick={e => handleClick(e, "step3")}><span>Images and Inventory</span></Link>
                </li>
                {/* <li >
                    <Link to="/add-products/step4" className={!stepActive.step4 ? "inactive" : null} title="SEO" onClick={e => handleClick(e, "step4")}><span>SEO</span></Link>
                </li> */}
                <li>
                    <Link to="/add-products/step4" className={!stepActive.step4 ? "inactive" : null} title="Shipping" onClick={e => handleClick(e, "step5")}><span>Shipping</span></Link>
                </li>
                <li>
                    <Link to="/add-products/step5" className={!stepActive.step5 ? "inactive" : null} title="Calculations" onClick={e => handleClick(e, "step6")}><span>Calculations</span></Link>
                </li>
            </ul>
        </nav>
        <p>Fields marked with <span className="required-astriek">*</span> are requried.</p>
        <Router>
            <Route exact path="/add-products" component={() => <Step1 activateStep={activateStep} goToManageBrands={goToManageBrands} />} />
            <Route path="/add-products/step2" component={() => <Step2 activateStep={activateStep} countryList={countryList} />} />
            <Route path="/add-products/step3" component={() => <Step3 activateStep={activateStep} />} />
            <Route path="/add-products/step4" component={() => <Step4 activateStep={activateStep} />} />
            <Route path="/add-products/step5" component={() => <Step5 activateStep={activateStep} />} />
        </Router>
    </>)


}

export default React.memo(DashboardLayout(AddProducts));

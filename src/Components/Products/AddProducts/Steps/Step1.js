import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionCreator from "../../../../Store/actions/index"
import "./Step1.scss";

const Step1 = ({ activateStep, goToManageBrands }) => {
    const history = useNavigate()
    const dispatch = useDispatch();
    const { categoryList, currentProductSelectedCategories, currentProduct ,authorizeBrands,authBrandsLoading} = useSelector(state => state.product);
    const [parentCat, setParentCat] = useState([])
    const [firstChild, setFirstChild] = useState([])
    const [secondChild, setSecondChild] = useState([])
    const [thirdChild, setThirdChild] = useState([])
    const [fourthChild, setFourthChild] = useState([])
    const [showOptions, setShowOptions] = useState(false);
   // const [loading, setLoading] = useState(false);
    const { handleSubmit, errors, register, setValue } = useForm();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        if (!authorizeBrands.length) {
             dispatch(actionCreator.fetchAuthorisedBrands());
        }
    }, [])

    useEffect(() => {
        if (!categoryList.length) {
            dispatch(actionCreator.fetchCategoryList());
        }
        if (categoryList.length) {
            let parentcat = categoryList.filter((item) => item.parent_id === 0)
            setParentCat(parentcat)
        }
    }, [categoryList, dispatch])




    const setCategory = useCallback((e, id, setChild) => {
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
            dispatch(actionCreator.fetchCategoriesAttributes(id))
        }
        let data = [...currentProductSelectedCategories]
        data[setChild - 1] = id;
        dispatch(actionCreator.setSelectedCategory(data))
    }, [categoryList, dispatch, currentProductSelectedCategories, setValue])
    useEffect(() => {
        if (currentProductSelectedCategories.length) {
            currentProductSelectedCategories.forEach((item, index) => {
                setCategory(null, item, index + 1)
            })
        }
    }, [])
    const onSubmit = data => {
        history.push("/add-products/step2");
        dispatch(actionCreator.updateCurrentEditingProduct(data))
        activateStep("step2")
    };

    useEffect(() => {
        let elmnt = document.querySelector('.choose-brand')
        if (elmnt) {
            elmnt.scrollIntoView({ behavior: "smooth" });
        }
    }, [showOptions])

    if (!authorizeBrands.length && !authBrandsLoading) {
        return <div className="panel-body">
            <div className="row">

                <div className="col-12">
                    <h1 className="h2">No Brand to List Product</h1>
                    <p className="h6">You are seeing this page because...</p>
                    <p className="mb-2 h5">*You do not have any authorised brand to list your product. <button onClick={goToManageBrands} className="btn btn-danger"> Apply For New Brand</button></p>
                    <p className="mb-3 h5">*If you have already applied, then wait for brand approval.</p>
                    <p className="mb-3 h5">*If need help, kindly contact support.</p>
                </div>
            </div>
        </div>
    }
    return (
        <>

            {categoryList ? <form onSubmit={handleSubmit(onSubmit)}>

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
                                        defaultChecked={+currentProduct.brand_id === +brand.id ? true : false}
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


            </form> : null}
        </>
    );
};
export default React.memo(Step1);
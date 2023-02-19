
import {
    GET_CATEGORY_ATTRIBUTES,
    GET_CATEGORY_ATTRIBUTES_SUCCESS,
    GET_CATEGORY_ATTRIBUTES_FAIL,
    GET_CATEGORY_LIST_START,
    GET_CATEGORY_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAIL,
    SET_SELECTED_CATEGORIES,
    CLEAR_SELECTED_CATEGORIES,
    UPDATE_CURRENT_EDITING_PRODUCT,
    CLEAR_CURRENT_EDITING_PRODUCT,
    UPDATE_CATEGORY_ATTRIBUTES,
    UPDATE_CURRENT_PRODUCT_INVENTORY,
    GET_AUTH_BRANDS_START,
    GET_AUTH_BRANDS_SUCCESS,
    GET_AUTH_BRANDS_FAIL
} from "./actionstypes";
import { SITEAPIURL, SITEGENAPIURL } from "../../cons"

import axios from "axios";

const ErrorHandler= ()=>{};
export const fetchCategoryAttributesStart = (data) => {
    return {
        type: GET_CATEGORY_ATTRIBUTES,
    }
}

export const fetchCategoryAttributesSuccess = (data) => {
    return {
        type: GET_CATEGORY_ATTRIBUTES_SUCCESS,
        payload: data
    }
}

export const fetchCategoryAttributesFail = (data) => {
    return {
        type: GET_CATEGORY_ATTRIBUTES_FAIL,
        payload: data
    }
}

export const fetchCategoriesAttributes = (catId) => {

    return (dispatch) => {

        dispatch(fetchCategoryAttributesStart());
        axios.post(`${SITEAPIURL}/getProductAttributes`, { catId: catId })
            .then(
                res => {

                    dispatch(fetchCategoryAttributesSuccess(res.data.data))
                }
            )
            .catch(err => {
                let error = null;
                ErrorHandler(err)

                if (err.response && err.response.data.validationErrors) {
                    error = err.response.data.validationErrors

                }
                dispatch(fetchCategoryAttributesFail(error || (err.response && err.response.data.message)));
            })

    }
}


export const fetchCategoryListStart = () => {
    return {
        type: GET_CATEGORY_LIST_START,
    }
}

export const fetchCategoryListSuccess = (data) => {
    return {
        type: GET_CATEGORY_LIST_SUCCESS,
        payload: data
    }
}

export const fetchCategoryListFail = (data) => {
    return {
        type: GET_CATEGORY_LIST_FAIL,
        payload: data
    }
}


export const fetchCategoryList = () => {

    return (dispatch) => {

        dispatch(fetchCategoryListStart());
        axios.post(`${SITEGENAPIURL}/getCategoryData`, {})
            .then(
                res => {

                    dispatch(fetchCategoryListSuccess(res.data.data))
                }
            )
            .catch(err => {
                let error = null;
                ErrorHandler(err)
                if (err.response && err.response.data.validationErrors) {
                    error = err.response.data.validationErrors

                }
                dispatch(fetchCategoryListFail(error || (err.response && err.response.data.message)));
            })

    }
}


export const setSelectedCategoryData = (data) => {

    return {
        type: SET_SELECTED_CATEGORIES,
        payload: data
    }
}
export const setSelectedCategory = (data) => {
    return (dispatch) => {
        dispatch(setSelectedCategoryData(data));
    }
}
export const clearSelectedCategoryData = () => {
    return {
        type: CLEAR_SELECTED_CATEGORIES
    }
}

export const clearSelectedCategory = () => {
    return (dispatch) => {
        dispatch(clearSelectedCategoryData());
    }
}


export const updateCurrentEditingProductData = (data) => {

    return {
        type: UPDATE_CURRENT_EDITING_PRODUCT,
        payload: data
    }
}
export const updateCurrentEditingProduct = (data) => {
    return (dispatch) => {
        dispatch(updateCurrentEditingProductData(data));
    }
}

export const clearCurrentEditingProductData = () => {

    return {
        type: CLEAR_CURRENT_EDITING_PRODUCT
    }
}
export const clearCurrentEditingProduct = () => {
    return (dispatch) => {
        dispatch(clearCurrentEditingProductData());
    }
}
export const updateCurrentProductAttributesData = (data) => {

    return {
        type: UPDATE_CATEGORY_ATTRIBUTES,
        payload: data
    }
}
export const updateCurrentProductAttributes = (data) => {
    return (dispatch) => {
        dispatch(updateCurrentProductAttributesData(data));
    }
}


export const updateCurrentProductInventoryData = (data) => {

    return {
        type: UPDATE_CURRENT_PRODUCT_INVENTORY,
        payload: data
    }
}
export const updateCurrentProductInventory = (data) => {
    return (dispatch) => {
        dispatch(updateCurrentProductInventoryData(data));
    }
}

export const fetchAuthBrandsStart = () => {
    return {
        type: GET_AUTH_BRANDS_START,
    }
}

export const fetchAuthBrandsSuccess = (data) => {
    return {
        type: GET_AUTH_BRANDS_SUCCESS,
        payload: data
    }
}

export const fetchAuthBrandsFail = (data) => {
    return {
        type: GET_AUTH_BRANDS_FAIL,
        payload: data
    }
}

export const fetchAuthorisedBrands = () => {
    return (dispatch) => {
        dispatch(fetchAuthBrandsStart());
        axios.post(`${SITEAPIURL}/authorizebrands`, {})
            .then(
                res => {

                    dispatch(fetchAuthBrandsSuccess(res.data))
                }
            )
            .catch(err => {
                ErrorHandler(err)
                let error = null;
                if (err.response && err.response.data.validationErrors) {
                    error = err.response.data.validationErrors

                }
                dispatch(fetchAuthBrandsFail(error || (err.response && err.response.data.message)));
            })

    }
}
import * as actionTypes from '../actions/actionstypes';
const initialState = {
    categoryList: [],
    currentProductSelectedCategories: [],
    authorizeBrands: [],
    currentProduct: {
        attributes: [],
        inventory: [],

    }
}

const productReducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.GET_CATEGORY_ATTRIBUTES:
            return {
                ...state,
                loading: true,
                error: false
            }

        case actionTypes.GET_CATEGORY_ATTRIBUTES_SUCCESS:
        case actionTypes.UPDATE_CATEGORY_ATTRIBUTES:
            let currentProduct = { ...state.currentProduct }
            currentProduct.attributes = [...action.payload];

            return {
                ...state,
                loading: false,
                error: false,
                currentProduct: currentProduct

            }
        case actionTypes.GET_CATEGORY_ATTRIBUTES_FAIL:
            let currentProductData = { ...state.currentProduct }
            currentProductData.attributes = [];
            return {
                ...state,
                loading: false,
                error: true,
                currentProduct: currentProductData

            }


        case actionTypes.GET_CATEGORY_LIST_START:
            return {
                ...state,
                loading: true,
                error: false
            }

        case actionTypes.GET_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                categoryList: action.payload

            }
        case actionTypes.GET_CATEGORY_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                categoryList: []

            }

        case actionTypes.SET_SELECTED_CATEGORIES:
            return {
                ...state,
                currentProductSelectedCategories: action.payload
            }
        case actionTypes.CLEAR_SELECTED_CATEGORIES:

            return {
                ...state,
                currentProductSelectedCategories: []
            }

        case actionTypes.UPDATE_CURRENT_EDITING_PRODUCT:
            return {
                ...state,
                currentProduct: { ...state.currentProduct, ...action.payload }
            }

        case actionTypes.UPDATE_CURRENT_PRODUCT_INVENTORY:
            let currentProduct1 = { ...state.currentProduct }
            currentProduct1.inventory = [...action.payload.inventory];

            return {
                ...state,
                currentProduct: currentProduct1
            }

        case actionTypes.GET_AUTH_BRANDS_START:
            return {
                ...state,
                authBrandsLoading: true

            }

        case actionTypes.GET_AUTH_BRANDS_SUCCESS:
            return {
                ...state,
                authorizeBrands: action.payload,
                authBrandsLoading: false
            }

        case actionTypes.GET_AUTH_BRANDS_FAIL:
            return {
                ...state,
                authorizeBrands: [],
                authBrandsLoading: false
            }

            case actionTypes.CLEAR_CURRENT_EDITING_PRODUCT:

            return{
                ...state,
                currentProductSelectedCategories:[],
                currentProduct:{
                    attributes: [],
                    inventory: [],

                }
            }


        default:
            return state
    }
}
export default productReducer;
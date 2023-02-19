import * as actionTypes from '../actions/actionstypes';
const initialState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    error: false
}

const loginReducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.REGISTRATION_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.LOGIN_REQUEST_SENT:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userData: action.payload
            }
        case actionTypes.LOGIN_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case actionTypes.LOGOUT_REQUEST_SENT:
            return {
                ...state
            }
        case actionTypes.LOGOUT_REQUEST_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userData:null
            }
        case actionTypes.LOGOUT_REQUEST_FAIL:
            return {
                ...state
            }
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
export default loginReducer;
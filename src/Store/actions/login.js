import {
    LOGIN_REQUEST_SENT,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAIL,
    LOGOUT_REQUEST_SENT,
    LOGOUT_REQUEST_SUCCESS,
    LOGOUT_REQUEST_FAIL,
    REGISTRATION_START,
    REGISTRATION_FAIL,
    CLEAR_ERROR
} from "./actionstypes";
import { SITEAPIURL } from "../../cons"

import axios from "axios";

export const loginStart = (data) => {
    return {
        type: LOGIN_REQUEST_SENT
    }
}
export const registerationStart = (data) => {
    return {
        type: REGISTRATION_START
    }
}

export const registerationFailed = (data) => {

    return {
        type: REGISTRATION_FAIL,
        payload: data
    }
}

export const loginSuccess = (data) => {
    return {
        type: LOGIN_REQUEST_SUCCESS,
        payload: data

    }
}
export const loginFailed = (data) => {

    return {
        type: LOGIN_REQUEST_FAIL,
        payload: data
    }
}
export const logoutStart = (data) => {

    return {
        type: LOGOUT_REQUEST_SENT,

    }
}
export const logoutSuccess = (data) => {
    return {
        type: LOGOUT_REQUEST_SUCCESS,
        payload: data

    }
}
export const logoutFailed = (data) => {
    return {
        type: LOGOUT_REQUEST_FAIL
    }
}


export const login = (data) => {

    return (dispatch) => {

        dispatch(loginStart());
        axios.post(`${SITEAPIURL}/login`, data)
            .then(
                res => {
                    let ResData = res.data;
                    const tokenExpirationDate = new Date(new Date().getTime() + (ResData.tokenExpiryTime * 1000));
                    let user = {
                        name: ResData.name,
                        token: ResData.token,
                        email: data.email,
                        mobile: data.mobile,
                        tokenExpirationDate: tokenExpirationDate,
                        isEmailVerified: ResData.isEmailVerified,
                        isMobileVerified: ResData.isMobileVerified,
                        companyName: ResData.companyName,
                        sellerId: ResData.sellerId,
                        isSellerActive: ResData.isSellerActive
                    }
                    localStorage.setItem("userData", JSON.stringify(user));
                    dispatch(loginSuccess(user))
                }
            )
            .catch(err => {
                dispatch(loginFailed(err));
            })

    }
}

export const logout = (data) => {
    localStorage.removeItem("userData");

    return (dispatch) => {

        dispatch(logoutSuccess());
        axios.get(`${SITEAPIURL}/logout`)
            .then(
                res => {
                    console.log("logged out from server")
                }
            )
            .catch(err => {
                console.log(err);
            })

    }
}
export const register = (data) => {
    return (dispatch) => {
        dispatch(registerationStart());
        axios.post(`${SITEAPIURL}/register`, data)
            .then(
                res => {
                    let ResData = res.data;
                    const tokenExpirationDate = new Date(new Date().getTime() + ResData.tokenExpiryTime * 1000);
                    let user = {
                        name: ResData.name,
                        token: ResData.token,
                        email: data.email,
                        mobile: data.mobile,
                        tokenExpirationDate: tokenExpirationDate,
                        isEmailVerified: ResData.isEmailVerified,
                        isMobileVerified: ResData.isMobileVerified,
                        companyName: ResData.companyName,
                        sellerId: ResData.sellerId
                    }
                    localStorage.setItem("userData", JSON.stringify(user));
                    dispatch(loginSuccess(user))

                }
            )
            .catch(err => {
                dispatch(loginFailed(err));
            })
    }
}

export const clearStateError = () => {

    return {
        type: CLEAR_ERROR,

    }
}

export const clearError = () => {
    return (dispatch) => {
        dispatch(clearStateError());
    }
}
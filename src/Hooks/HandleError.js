
import { toast } from "react-toastify";
import { ToastConfig } from '../cons';

const useErrorHandler = () => {

    const ErrorHandler = (err, customMessage) => {

        let errorMessage = "Some thing went wrong, We could not processed your request"
        if (err.message === "Network Error") {
            errorMessage = "Session Expired"
            localStorage.removeItem("userData");
            document.location.reload()

        }
        else if (err.response && err.response.message) {
            errorMessage = err.response?.message
        } else if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message

        }
        else if (err.response && err.response.data && err.response.data.validationErrors) {

            errorMessage = []

             Object.values(err.response.data.validationErrors).forEach(el => {
                 errorMessage.push(el[0])
             })
             errorMessage = errorMessage.toString()
             // ErrorHandler(error)
         }
        toast.error(customMessage || errorMessage, ToastConfig);
    }

    const ShowWarning = (customMessage) => {

        toast.warn(customMessage || `Information has been updated`, ToastConfig);
    }
    const ShowSuccess = (customMessage) => {

        toast.success(customMessage || `Information has been updated`, ToastConfig);
    }

    return [ErrorHandler, ShowWarning, ShowSuccess]

}

export default useErrorHandler;
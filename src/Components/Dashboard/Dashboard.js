import Axios from 'axios';
import React,{useEffect} from 'react';
import { SITEAPIURL } from '../../cons';

import DashboardLayout from '../../HOC/DashboardLayout';

const Dashboard = () => {

    useEffect(() => {
        Axios.get(`${SITEAPIURL}/usageSummery`)
        .then(res=>{
        })
        return () => {
            return
        }
    }, [])

   // const userData = useSelector(state => state.login.userData);
    // let [verificationMailSent, setVerificationMailSent] = useState(false)
    // const resendVerificationMail = (e) => {
    //     e.preventDefault()
    //     setVerificationMailSent(true)

    // }

    return (
        <React.Fragment>
            <div className="row">
                {/* <div className="col col-12">
                    {userData && !userData.isEmailVerified && !userData.verificationMailSent ? <div className="alert alert-danger">You have not verfied your email yet, You may have been missing important communication mails <a href="#" onClick={resendVerificationMail}>Resend Verification Mail</a></div> : null}
                    {userData && !userData.isEmailVerified && userData.verificationMailSent ? <div className="alert alert-danger">We have sent an email with instructions about email verification process. If you didn't recived it, please check Junk/Spam folder as well. <a href="#" onClick={resendVerificationMail}>Resend Verification Mail</a></div> : null}
                </div> */}
                <div className="col col-12 col-sm-8">

                    <h2 className="panel-heading">Pending Shipping</h2>
                    <div className="panel-body">

                        <div className="row p-orders">
                            <div className="col  col-sm-3">
                                <strong>Order ID</strong>
                            </div>
                            <div className="col col-sm-3">
                                <strong>Product</strong>
                            </div>
                            <div className="col col-sm-3">
                                <strong> Order Date</strong>
                            </div>
                            <div className="col col-sm-3">
                                <strong> Order Value</strong>
                            </div>
                        </div>

                        <div className="alert alert-light" role="alert">
                            You have no pending shipping!
                            </div>
                        {/* <div className="row p-orders">
                            <div className="col col-sm-3">
                                Order ID
                                </div>
                            <div className="col col-sm-3">
                                Product
                                </div>
                            <div className="col col-sm-3">
                                Order Date
                                </div>
                            <div className="col col-sm-3">
                                Order Value
                                </div>
                        </div> */}
                    </div>
                    {/* <h2 className="panel-heading">Notifications</h2>
                    <div className="panel-body">


                        <div className="btn btn-success rounded-0" role="alert">
                            Notifications 1
                            </div>
                        <div className="alert alert-success" role="alert">
                            Notifications 1
                            </div>
                    </div> */}
                </div>
                <div className="col col-12 col-sm-4">
                    {/* <h2 className="panel-heading">Product Stats</h2>
                    <div className="panel-body">

                        <div className="row">
                            <div className="col-12">
                                <div className="pro-stat clearfix">
                                    Published  <span className="badge badge-success">22</span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="pro-stat clearfix">
                                    Pending  <span className="badge badge-warning">22</span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="pro-stat last clearfix">
                                    Not apporved  <span className="badge badge-danger">22</span>
                                </div>
                            </div>

                        </div>
                    </div> */}
                    <h2 className="panel-heading">Withdrawable Balance</h2>
                    <div className="widthDrw">
                        <div className="widthDrw-amount"> ₹ 0.00</div>

                        <a href="/widthdraw" className="link">Width draw</a>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )

}

export default DashboardLayout(Dashboard);

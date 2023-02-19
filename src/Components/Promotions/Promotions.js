import React from "react";
import DashboardLayout from "../../HOC/DashboardLayout";
import { NavLink } from "react-router-dom";
import { FaCalendarAlt, FaTag, FaInfoCircle, FaPizzaSlice, FaExclamationCircle } from "react-icons/fa";
import Popover from "../../UI/Popover/Popover";
import {Tab, Tabs} from "react-bootstrap"


const Promotions = () => {



    return (
        <React.Fragment>
            <h1 class="sticky-head">Promotions</h1>

            <div className="panel-body">
                <div className="container-fluid px-0">
                    <div className="row">


                        <div className="col-12">
                        <Tabs defaultActiveKey="promotion" id="uncontrolled-tab-example">
  <Tab eventKey="promotion" title="Not Opted in">



                            <ul className="promiotion-list">
                                <li className="clearfix">
                                    <div className="status">
                                        Ongoing <span>( 2 months left)</span>
                                    </div>
                                    <h2>
                                        <NavLink to={`/promotions/${"promotionsid"}`}>
                                            Promotions title here
                                            </NavLink>

                                    </h2>



                                    <p>Promotions descriptin here</p>
                                    <small>Offer type : <span>Basket Discount </span></small>
                                    <small><FaCalendarAlt className="icon" />Offer duration: <span>Tuesday, 12 Nov, 20196:00:00 AM - Tuesday, 31 Mar, 2020 11:59:59 PM</span></small>
                                    <div className="promotion-info clearfix">
                                        <div className="info">
                                            <p> Extra Discount</p>
                                            <FaTag className="icon" />
                                            <span className="share">10%</span>
                                            <Popover

                                                btnText={<FaInfoCircle />}

                                                hintText="It is extra discount given to the buyer on MRP. For e.g. If MRP is Rs 1000, and MRP discount is 30%, then discount would be Rs 300 and final price would be 700, for order above value 1000, max discount will be Rs 100" />
                                        </div>
                                        <div className="info">
                                            <p>  Discount Share</p>
                                            <FaPizzaSlice className="icon" />
                                            <span className="share">100%</span>
                                            <Popover

                                                btnText={<FaInfoCircle />}
                                                hintText="This is the % of total discount to be borne by you." />
                                        </div>
                                    </div>
                                    <p><FaExclamationCircle /> This promotion will be in addition to the highest offer applicable on your listing</p>
                                    <NavLink className="btn btn-danger" to={`/promotions/${"promotionsid"}`}>Optin</NavLink>
                                </li>
                                <li>
                                    <div className="status">
                                        Upcoming <span>( In 10 days)</span>
                                    </div>
                                    <h2>
                                        <NavLink to={`/promotions/${"promotionsid"}`}>
                                            Promotions title here
                                            </NavLink>

                                    </h2>



                                    <p>Promotions descriptin here</p>
                                    <small>Offer type : <span>Basket Discount </span></small>
                                    <small><FaCalendarAlt className="icon" />Offer duration: <span>Tuesday, 12 Nov, 20196:00:00 AM - Tuesday, 31 Mar, 2020 11:59:59 PM</span></small>
                                    <div className="promotion-info clearfix">
                                        <div className="info">
                                            <p> Extra Discount</p>
                                            <FaTag className="icon" />
                                            <span className="share">10%</span>
                                            <Popover

                                                btnText={<FaInfoCircle />}
                                                hintText="It is extra discount given to the buyer on MRP. For e.g. If MRP is Rs 1000, and MRP discount is 30%, then discount would be Rs 300 and final price would be 700, for order above value 1000, max discount will be Rs 100" />
                                        </div>
                                        <div className="info">
                                            <p>  Discount Share</p>
                                            <FaPizzaSlice className="icon" />
                                            <span className="share">100%</span>
                                            <Popover

                                                btnText={<FaInfoCircle />}
                                                hintText="This is the % of total discount to be borne by you." />
                                        </div>
                                    </div>
                                    <p><FaExclamationCircle /> This promotion will be in addition to the highest offer applicable on your listing</p>
                                </li>
                            </ul>

</Tab>
<Tab eventKey="optedin" title="Opted in"></Tab>
<Tab eventKey="optedout" title="Opted out"></Tab>
<Tab eventKey="expired" title="Expired"></Tab>
</Tabs>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    )

}

export default DashboardLayout(Promotions)
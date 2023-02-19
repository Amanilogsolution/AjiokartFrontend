import React from 'react';

import DashboardLayout from '../../HOC/DashboardLayout';
import { FaTimes } from 'react-icons/fa';

const ReadyToShip=()=> {


        return (
            <React.Fragment>


                <div className="order-list" style={{ borderTop: "1px solid #b4c1cc" }}>
                    <div className="container-fluid">

                        <div className="row order-header">

                            <div className="col col-2 col-sm-2">
                                <strong>Order ID</strong>

                            </div>
                            <div className="col col-10 col-sm-3">
                                <strong>Product Info</strong>

                            </div>
                            <div className="col col-sm-2">
                                <strong> Buyer Details</strong>

                            </div>
                            <div className="col col-sm-1">
                                <strong>Amount</strong>

                            </div>
                            <div className="col col-sm-2">
                                <strong>SLA</strong>

                            </div>
                            <div className="col col-sm-2">
                                <strong> Action</strong>

                            </div>
                        </div>



                        <div className="row">

                            <div className="col col-2 col-sm-2">
                                12345

                        </div>
                            <div className="col col-10 col-sm-3">
                                Men's Tshirt (Blue) 28

                        </div>
                            <div className="col col-sm-2">
                                Amit Gupta, Delhi

                        </div>
                            <div className="col col-sm-1">
                                ₹ 797

                        </div>
                            <div className="col col-sm-2">
                                11 Dec, 2019<br />
                                11:00 am

                        </div>
                            <div className="col col-sm-2">
                                <button className="btn btn-danger" style={{ background: 'maroon' }}><FaTimes /> <span className="visually-hidden"> Cancel Order</span></button>

                            </div>
                        </div>


                        <div className="row">

                            <div className="col col-12">
                                No orders to display
                        </div>

                        </div>

                        <div className="row order-header">

                            <div className="col col-12 align-self-center">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
                                    </ul>
                                </nav>
                            </div>

                        </div>



                    </div>
                </div>


            </React.Fragment>
        )


}

export default DashboardLayout(ReadyToShip);

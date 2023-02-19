import React, { Component } from 'react';

import DashboardLayout from '../../HOC/DashboardLayout';

const OrderReturned = () => {

    return (
        <React.Fragment>

            <h1 class="sticky-head">Return Orders Request</h1>
            <div className="panel-body">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-12">


                            <div class=" table-responsive">
                                <table class="table table-bordered  table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Product Info</th>
                                            <th scope="col">Information</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>12345</td>
                                            <td> Men's Tshirt (Blue) 28</td>
                                            <td> return initiated by buyer</td>
                                            <td> Arrived at Delhi cargo</td>
                                        </tr>
                                        <tr>
                                            <td>12345</td>
                                            <td> Men's Tshirt (Blue) 28</td>
                                            <td> Could not locate buyer</td>
                                            <td> Arrived at Delhi cargo</td>
                                        </tr>
                                        <tr>
                                            <td>12345</td>
                                            <td> Men's Tshirt (Blue) 28</td>
                                            <td> Return by customer</td>
                                            <td> Waiting for pickup</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>



                        </div>
                    </div>




                    <div className="row">

                        <div className="col col-12">
                            Nothing to display here
</div>

                    </div>

                    <div className="row order-header">

                        <div className="col col-12 align-self-center">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>

                    </div>



                </div>
            </div>


        </React.Fragment >
    )

}



export default DashboardLayout(OrderReturned);

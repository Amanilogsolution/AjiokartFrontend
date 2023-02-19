import axios from 'axios';
import React, { useEffect } from 'react';
import { SITEAPIURL } from '../../cons';

import DashboardLayout from '../../HOC/DashboardLayout';
import useResponseHandler from '../../Hooks/HandleError';


const CancelledOrders = () => {
    const [ErrorHandler, ShowSuccess] = useResponseHandler();

    useEffect(() => {

        axios.get(`${SITEAPIURL}/orders?type=cancel&perPage=10&page=${1}`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                ErrorHandler(err)
            })

    }, [])


    return (
        <React.Fragment>
            <h1 class="sticky-head">Cancelled Orders</h1>
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

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>12345</td>
                                            <td> Men's Tshirt (Blue) 28</td>
                                            <td> Calcelled by buyer</td>
                                        </tr>
                                        <tr>
                                            <td>12345</td>
                                            <td> Men's Tshirt (Blue) 28</td>
                                            <td> Calcelled by seller</td>

                                        </tr>
                                        <tr>
                                            <td>12345</td>
                                            <td> Men's Tshirt (Blue) 28</td>
                                            <td> Cancelled by AJIOKART</td>
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

export default DashboardLayout(CancelledOrders);

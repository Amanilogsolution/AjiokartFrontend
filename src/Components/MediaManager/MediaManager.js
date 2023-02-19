import React from 'react';

import DashboardLayout from '../../HOC/DashboardLayout';
import { FaCopy, FaEdit } from "react-icons/fa"

const MediaManager=()=> {
   const  copyImageURL = ()=>{

    }


        return (
            <React.Fragment>
    <h1 class="sticky-head">Media Manager</h1>
    <div className="media-manager">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Image URL</th>
                                    <th scope="col">Associated Products</th>
                                    <th scope="col">Image Title</th>
                                    <th scope="col">Image Alt text</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">341</th>
                                    <td><img src="#" alt="text" /></td>
                                    <td>
                                        https://AJIOKART"".com/ddddsd/213.jpg
                                        <button onClick={copyImageURL}>
                                            <FaCopy />
                                        </button>
                                    </td>
                                    <td>ListingID1, ListingID12</td>
                                    <td>My image title <FaEdit /></td>
                                    <td>My image alt text <FaEdit /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</React.Fragment>

        )



}

export default DashboardLayout(MediaManager);

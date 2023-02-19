import React, { useState } from 'react';
import DashboardLayout from '../../HOC/DashboardLayout';
import { FaCopy } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";

const FBFeed = () => {
    const [FeedEnable, setFeedEnable] = useState(false);
    const enableFBFeed = () => {
        setFeedEnable(true)
    }
    return (
        <React.Fragment>
            <h1 class="sticky-head">Facebook Feed</h1>

            <div className="panel-body">
                <div className="container-fluid">
                    <div className="row">


                        <div className="col-12">



                            <div className={`feed-block text-center`}>

                                {!FeedEnable &&
                                    <React.Fragment>
                                        <h2 >Your facebook feed is currently disabled.</h2>
                                        <p>Facebook feed allows you to sync your products with your Facebook page shop and customer can directly checkout to your products from your facebook page.
                            </p>

                                        <button className="btn btn-danger" onClick={enableFBFeed}>Enable</button>
                                    </React.Fragment>
                                }

                                {FeedEnable &&

                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <label>Facebook Feed link : </label><br />
                                            <code>
                                                https://www.AJIOKART.in/wp-content/uploads/woo-feed/facebook/xml/fbfeed.xml
                                            </code>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            Last Updated On 21-1-2020
                                        </div>
                                        <div className="col-12 col-sm-2">
                                            <button className="btn btn-danger"><FaCopy /> Copy Feed Link</button>
                                        </div>

                                    </div>
                                }
                            </div>




                            <div className={`fbfeed-info`}>
                                <h2>Frequently asked Questions</h2>

                                <h3 className="ques">In how many days feed sync with facebook shop?</h3>
                                <p className="ans">
                                    You just need to enable the feed, it will automatically generate at tht time of enablment and will sync your facebook page in each 7days.
                            </p>
                                <h3 className="ques">How many products can be sync?</h3>
                                <p className="ans">
                                    You are allowed to sync upto 100 products, which you have recently added to AJIOKART Marketplace
                            </p>
                                <h3 className="ques">What if, I want to add more then 100 products?</h3>
                                <p className="ans">
                                    To increase your sync limit upto 2000 products, kindly contact our support team
                            </p>
                                <h3 className="ques">How can I connect my facebook feed to facebook shop page?</h3>
                                <p className="ans">
                                    Please follow the steps below:
                                <br />
                                    1. <br />
                                    2. <br />
                                    3. <br />
                                </p>
                            </div>
                        </div>
                    </div>





                </div>

            </div>
        </React.Fragment>
    )
}
export default DashboardLayout(FBFeed);
import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import './index.css';
import App from './App';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';
import WithTracker from './HOC/WithTracker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import axios from "axios";


import Login from './Pages/Auth/Login';
import Pricing from './Pages/Pricing/Pricing';
import Register from './Pages/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
// import Profile from './Components/Profile/Profile'
import Business from './Components/Profile/Business/Business';
import Brands from './Components/Profile/Brands/Brands';
import AllProducts from './Components/Products/Products';
import AddProducts from './Components/Products/AddProducts/AddProducts';
import AddEditProduct from "./Components/Products/AddEditProduct/AddEditProduct";
import NewOrders from './Components/Orders/NewOrders';
import ReadyToShip from './Components/Orders/ReadyToShip';
import InTransit from './Components/Orders/InTransit';
import CompletedOrders from './Components/Orders/CompletedOrders';
//import     from './Components/Orders/Returned';
import History from './Components/Payments/History';
import WithDraw from './Components/Payments/WithDraw';
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import WhyUs from "./Pages/WhyUs/WhyUs";
import FAQs from "./Pages/FAQs/FAQs";
import Home from "./Pages/Home/Home";
import MediaManager from "./Components/MediaManager/MediaManager"
import CancelledOrders from "./Components/Orders/CancelledOrders";
import Reports from './Components/Reports/Reports';
import Analytics from './Components/Reports/Analytiics';
import FBFeed from './Components/Tools/FBFeed';
import Banners from './Components/Tools/Banners';
import Promotions from "./Components/Promotions/Promotions";
import MyPromotions from "./Components/Promotions/MyPromotions"
import loginReducer from "./Store/reducers/login";
import PromotionDetails from "./Components/Promotions/PromotionDetails";
import Page from './Pages/Page/Page';
import ForgetPw from './Pages/Auth/ForgetPw';
import ResetPw from './Pages/Auth/ResetPw';
import AddNewBrand from './Components/Profile/Brands/AddNewBrand';
import FeatureManager from './Components/Branding/FeatureManager/FeatureManager';
import SiteSettings from './Components/Branding/GeneralSettings/SiteSettings';
import SocialNetworks from './Components/Branding/SocialNetworks/SocialNetworks';
import WebmasterTool from './Components/Branding/WebmasterTools/WebmasterTool';
import productReducer from "./Store/reducers/products";
import MarketChannels from './Components/Products/SalesChannels/MarketChannels';
import SellingOptions from './Pages/SellingOptions/SellingOptions';
import EditProduct from './Components/Products/EditProduct/EditProduct';
import Categories from './Pages/Categories/Categories';
import Category from './Pages/Categories/Category';
const container = document.getElementById('root')
const root = createRoot(container)


const rootReducer = combineReducers({

    login: loginReducer,
    product:productReducer

});

function createAxiosAuthMiddleware() {


    return ({ getState }) => next => (action) => {
        let token = getState().login.userData ? getState().login.userData.token : null;
        let tmpToken = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;
        axios.defaults.headers.common = {
            "Authorization": `Bearer ${token || tmpToken}`,
            'Content-Type': 'application/json'
        };
        return next(action);

    };
}
const axiosAuth = createAxiosAuthMiddleware();
let store
if (process.env === "development") {
    store = createStore(rootReducer, applyMiddleware(thunk, logger, axiosAuth));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, axiosAuth));
}

const Private = () => <div>private</div>;

root.render(
    <Provider store={store}>
        <Router basename={'/'}>
            <App>
            <Routes>

            <Route exact path="/" element={<Home/>} />
             <Route exact path="/login" element={<Login/>} />
             <Route exact path="/register" element={<Register/>} />
             <Route exact path="/why-sell-at-AJIOKART" element={<WhyUs/>} />
             <Route exact path="/how-it-works" element={<HowItWorks/>} />
             <Route exact path="/sellers-faq" element={<FAQs/>} />
             <Route exact path="/market-place-fee" element={<Pricing/>} />
             <Route exact path="/selling-options-for-business" element={<SellingOptions/>} />
             <Route exact path="/p/:slug" element={<Page/>} />
             <Route exact path="/forget-password" element={<ForgetPw/>} />
             <Route exact path="/reset-password/:token" element={<ResetPw/>} />
            <Route exact path="/product-categories" element={<Categories/>} />
            <Route exact path="/sell-:slug-products-online/:catId" element={<Category/>} /> 

            <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
            <Route exact path="/manage-brands" element={<PrivateRoute><Brands /></PrivateRoute>}/>
            <Route exact path="/add-new-brand/:requestId?" element={<PrivateRoute><AddNewBrand /></PrivateRoute>}/>
            <Route exact path="/Business-info" element={<PrivateRoute><Business /></PrivateRoute>}/>
            <Route exact path="/products" element={<PrivateRoute><AllProducts /></PrivateRoute>}/>
            <Route exact path="/add-edit-products" element={<PrivateRoute><AddEditProduct /></PrivateRoute>}/>
            <Route exact path="/add-edit-products/:productId" element={<PrivateRoute><AddEditProduct /></PrivateRoute>}/>
            <Route exact path="/add-products" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/add-products/step1/:productId?" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/add-products/step2/:productId?" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/add-products/step3/:productId?" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/add-products/step4/:productId?" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/add-products/step5/:productId?" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/add-products/step6/:productId?" element={<PrivateRoute><AddProducts /></PrivateRoute>}/>
            <Route exact path="/market-channels" element={<PrivateRoute><MarketChannels /></PrivateRoute>}/>
            <Route exact path="/media-manager" element={<PrivateRoute><MediaManager /></PrivateRoute>}/>
            <Route exact path="/orders" element={<PrivateRoute><NewOrders /></PrivateRoute>}/>
             <Route exact path="/ready-to-ship" element={<PrivateRoute><ReadyToShip /></PrivateRoute>}/>
             <Route exact path="/in-transit" element={<PrivateRoute><InTransit /></PrivateRoute>}/>
             <Route exact path="/completed-orders" element={<PrivateRoute><CompletedOrders /></PrivateRoute>}/>
             <Route exact path="/cancelled-orders" element={<PrivateRoute><CancelledOrders /></PrivateRoute>}/>
             <Route exact path="/withdraw-payment" element={<PrivateRoute><WithDraw /></PrivateRoute>}/>
             <Route exact path="/payment-history" element={<PrivateRoute><History /></PrivateRoute>}/>
             <Route exact path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>}/>
             <Route exact path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>}/>
             <Route exact path="/fb-feed" element={<PrivateRoute><FBFeed /></PrivateRoute>}/>
             <Route exact path="/banners" element={<PrivateRoute><Banners /></PrivateRoute>}/>
             <Route exact path="/promotions" element={<PrivateRoute><Promotions /></PrivateRoute>}/>
             <Route exact path="/promotions/:promotionid" element={<PrivateRoute><PromotionDetails /></PrivateRoute>}/>
             <Route exact path="/create-offer" element={<PrivateRoute><MyPromotions /></PrivateRoute>}/>
             <Route exact path="/supersite-settings" element={<PrivateRoute><SiteSettings /></PrivateRoute>}/>
             <Route exact path="/social-networks" element={<PrivateRoute><SocialNetworks /></PrivateRoute>}/>
             <Route exact path="/feature-manager" element={<PrivateRoute><FeatureManager /></PrivateRoute>}/>
             <Route exact path="/webmasters" element={<PrivateRoute><WebmasterTool /></PrivateRoute>}/>


















                {/* <Route exact path="/" element={<WithTracker element={<Home/>}/>} /> */}
                {/* <Route exact path="/login" element={WithTracker(<Login/>)} />
                <Route exact path="/register" element={WithTracker(<Register/>)} />
                <Route exact path="/why-sell-at-AJIOKART" element={WithTracker(<WhyUs/>)} />

                <Route exact path="/sellers-faq" element={WithTracker(<FAQs/>)} />
                <Route exact path="/how-it-works" element={WithTracker(<HowItWorks/>)} />
                <Route exact path="/market-place-fee" element={WithTracker(<Pricing/>)} />


                <Route exact path="/p/:slug" element={WithTracker(<Page/>)} />
                <Route exact path="/forget-password" element={WithTracker(<ForgetPw/>)} />
                <Route exact path="/reset-password/:token" element={WithTracker(<ResetPw/>)} />
                <Route exact path="/selling-options-for-business" element={WithTracker(<SellingOptions/>)} />
                <Route exact path="/product-categories" element={WithTracker(<Categories/>)} />
                <Route exact path="/sell-:slug-products-online/:catId" element={WithTracker(<Category/>)} /> */}


               {/* //pahle search  */}
                                {/* <PrivateRoute exact path="/profile" component={Profile} /> */}
                                               {/* //pahle search  */}



                {/* <PrivateRoute exact path="/dashboard" component={WithTracker(Dashboard)} />
                <PrivateRoute exact path="/manage-brands" component={WithTracker(Brands)} />



                <PrivateRoute exact path="/add-new-brand/:requestId?" component={WithTracker(AddNewBrand)} />
                <PrivateRoute exact path="/Business-info" component={WithTracker(Business)} />
                <PrivateRoute exact path="/products" component={WithTracker(AllProducts)} />
                <PrivateRoute exact path="/add-edit-products" component={WithTracker(AddEditProduct)} />
                <PrivateRoute exact path="/add-edit-products/:productId" component={WithTracker(AddEditProduct)} />

                <PrivateRoute exact path="/add-products" component={WithTracker(AddProducts)} />
                <PrivateRoute exact path="/add-products/step1/:productId?" component={WithTracker(AddProducts)} />
                <PrivateRoute exact path="/add-products/step2/:productId?" component={WithTracker(AddProducts)} />
                <PrivateRoute exact path="/add-products/step3/:productId?" component={WithTracker(AddProducts)} />
                <PrivateRoute exact path="/add-products/step4/:productId?" component={WithTracker(AddProducts)} />
                <PrivateRoute exact path="/add-products/step5/:productId?" component={WithTracker(AddProducts)} />
                <PrivateRoute exact path="/add-products/step6/:productId?" component={WithTracker(AddProducts)} /> */}
              


               {/* //pahle search  */}
            {/* <PrivateRoute exact path="/edit-product/:productId" component={WithTracker(EditProduct)} /> */}
                           {/* //pahle search  */}

                {/* <PrivateRoute exact path="/market-channels" component={WithTracker(MarketChannels)} />


                <PrivateRoute exact path="/media-manager" component={WithTracker(MediaManager)} />
                <PrivateRoute exact path="/orders" component={WithTracker(NewOrders)} />
                <PrivateRoute exact path="/ready-to-ship" component={WithTracker(ReadyToShip)} />
                <PrivateRoute exact path="/in-transit" component={WithTracker(InTransit)} />
                <PrivateRoute exact path="/completed-orders" component={WithTracker(CompletedOrders)} />
                <PrivateRoute exact path="/cancelled-orders" component={WithTracker(CancelledOrders)} />
                <PrivateRoute exact path="/withdraw-payment" component={WithTracker(WithDraw)} />
                <PrivateRoute exact path="/payment-history" component={WithTracker(History)} />
                <PrivateRoute exact path="/reports" component={WithTracker(Reports)} />
                <PrivateRoute exact path="/analytics" component={WithTracker(Analytics)} />
                <PrivateRoute exact path="/fb-feed" component={WithTracker(FBFeed)} />
                <PrivateRoute exact path="/banners" component={WithTracker(Banners)} />
                <PrivateRoute exact path="/promotions" component={WithTracker(Promotions)} />
                <PrivateRoute exact path="/promotions/:promotionid" component={WithTracker(PromotionDetails)} />
                <PrivateRoute exact path="/create-offer" component={WithTracker(MyPromotions)} />
                <PrivateRoute exact path="/supersite-settings" component={WithTracker(SiteSettings)} />
                <PrivateRoute exact path="/social-networks" component={WithTracker(SocialNetworks)} />
                <PrivateRoute exact path="/feature-manager" component={WithTracker(FeatureManager)} />
                <PrivateRoute exact path="/webmasters" component={WithTracker(WebmasterTool)} /> */}



</Routes>
            </App>
        </Router></Provider>,
    // document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();

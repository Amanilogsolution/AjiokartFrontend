import React from 'react';
import {

    Navigate,
  } from "react-router-dom";
  import { useSelector } from "react-redux";


// const PrivateRoute = ({ component: Component, ...rest }) => {


//    const auth = useSelector(state => state.login.isAuthenticated);

//     return (
//         <Routes>
//         <Route {...rest}
//         render={props => ( auth ? <Component {...props} /> : <Navigate to={{ pathname: '/login' }} /> )} />
//         </Routes>
//         )
// }

function PrivateRoute({ children }) {
   const auth = useSelector(state => state.login.isAuthenticated);
return auth ? children : <Navigate to="/" />;
  }



export default PrivateRoute;
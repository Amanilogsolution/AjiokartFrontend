import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as actionCreators from "../../Store/actions/index";
import "./Login.scss";
import useResponseHandler from '../../Hooks/HandleError';

const Login = (props) => {
    const [ErrorHandler] = useResponseHandler()
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const { error, isAuthenticated, userData } = useSelector(state => state.login);

    const onFormSubmit = (data) => {
        console.log(data)
        dispatch(actionCreators.login(data));

    };

    useEffect(() => {

        if (error) {
            ErrorHandler(error)
        }

        return () => {
            return
        }
    }, [error])

    return (
        <>
            {isAuthenticated && <div className="login-form loogedin">

                <p>Welcome back, {userData && userData.name ? userData.name : ""}</p>
                <NavLink to="/dashboard" className="btn btn-danger btn-lg">Go To Dashboard</NavLink>
            </div>
            }
            {!isAuthenticated && <form className="login-form"
                onSubmit={handleSubmit(onFormSubmit)}
            >{
                console.log(errors)
            }
                <h1>LOGIN</h1>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email </label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${errors?.email ? "is-invalid " : " "}`}
                        id="email"
                        placeholder="Enter email"
                        autoComplete="username"
                        {...register('email', {
                            pattern: {
                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                message: "Please enter a valid email"
                            }

                        })}

                    // ref={register({
                    //     required: "Please enter your email",
                    //     pattern: {
                    //         value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    //         message: "Please enter a valid email"
                    //     }

                    // })}
                    />
                    <span className="text-danger">
                        {errors?.email && errors?.email.message}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Your Password </label>
                    <input
                        type="password"
                        className={`form-control  ${errors?.password ? "is-invalid " : " "}`}
                        id="password"
                        placeholder="password"
                        name="password"
                        autoComplete="current-password"
                        {...register("password", {
                             required: true
                              })}
                    />
                    <span className="text-danger">
                        {errors?.password && errors.password.message}
                    </span>
                </div>
                <button type="submit" className="btn btn-danger ">Submit</button>
                <div className="fp">
                    <NavLink to="/forget-password">Forgot Password?</NavLink></div>
            </form>
            }
        </>
    )
}
export default Login;

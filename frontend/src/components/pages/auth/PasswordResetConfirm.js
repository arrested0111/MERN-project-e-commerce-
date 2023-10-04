import React from "react";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import Frontendmenu from "../../layout/frontendmenu";
import FrontendHeader from "../../layout/frontendheader";
import { useResetPasswordConfirmMutation } from "../../../store/reducer/authSlice";

let loginSchema = yup.object().shape({
    password: yup.string().required(),
    password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),

});

function PasswordResetConfirm() {
    let params = useParams();
    const [confirmReset] = useResetPasswordConfirmMutation();
    const {register, handleSubmit, formState: {errors}} =
        useForm({
            resolver: yupResolver(loginSchema)
        });

    let pStyle = {
        color: "#f60000",
    }

    let sureForm = (data) => {
        data.token = params.token;
        confirmReset(data).unwrap().then((response) => {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                });
                window.location.href = "/login";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.error,
                })

            }
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <React.Fragment>
            <FrontendHeader/>
            <Frontendmenu/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h1>Reset Confirm</h1>
                        <hr/>
                        <form action="" onSubmit={handleSubmit(sureForm)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password:
                                            {errors.password && <a style={pStyle}>{errors.password.message}</a>}
                                        </label>
                                        <input type="password" name="password"
                                               {...register("password")}
                                               id="password" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="password_confirmation">Password Confirmation:
                                            {errors.password_confirmation &&
                                                <a style={pStyle}>{errors.password_confirmation.message}</a>}
                                        </label>
                                        <input type="password"
                                               {...register("password_confirmation")}
                                               name="password_confirmation" id="password_confirmation"
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <input type="submit" value="Reset Password" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
        </React.Fragment>
    )
}

export default PasswordResetConfirm
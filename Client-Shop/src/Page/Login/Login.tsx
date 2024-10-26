import React from 'react'
import * as yup from 'yup';
import './Login.scss'
import Logo from '/img/logo.svg'
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../Model/User';
import { useAuth } from '../../Context/UseAuth';
import { yupResolver } from '@hookform/resolvers/yup';

const validateSchema = yup.object().shape({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required("Pass word is required")
});

const Login = () => {
    const { login } = useAuth()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginRequest>({
        resolver: yupResolver(validateSchema),
    });

    const onSubmit = (loginRequest: LoginRequest) => {
        login(loginRequest)
        console.log(loginRequest);
    }   

    return (
        <div className='form-authen'>
            <div className="brand-wrapper">
                <img src={Logo} alt="logo" className="logo" />
            </div>
            <div className="login-wrapper my-auto">
                <h1 className="login-title">Log in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="email@example.com"
                            {...register('email')} />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="enter your passsword"
                            {...register('password')}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                    <input name="login" id="login" className="btn btn-block login-btn" type="submit" value="Login" />
                </form>
                <a href="#!" className="forgot-password-link">Forgot password?</a>
                <p className="login-wrapper-footer-text">Don't have an account? <a href="#!" className="text-reset">Register here</a></p>
            </div>
        </div>
    )
}

export default Login
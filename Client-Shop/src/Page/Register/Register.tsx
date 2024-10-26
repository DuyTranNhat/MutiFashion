import React from 'react'
import * as yup from 'yup';
import Logo from '/img/logo.svg'
import { useForm } from 'react-hook-form';
import { RegisterRequest } from '../../Model/User';
import { useAuth } from '../../Context/UseAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

const validateSchema = yup.object().shape({
    name: yup.string().required('User Name is required'),
    password: yup.string().required("Password is required"),
    email: yup.string().required('Email is required').email()
});

const Register = () => {
    const { registerUser } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<RegisterRequest>({
        resolver: yupResolver(validateSchema),
    });

    const onSubmit = (loginRequest: RegisterRequest) => {
        registerUser(loginRequest)
    }

    return (
        <div className='form-authen'>
            <div className="brand-wrapper">
                <img src={Logo} alt="logo" className="logo" />
            </div>
            <div className="login-wrapper my-auto">
                <h1 className="login-title">Register in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">User Name</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="email@example.com"
                            {...register('name')} />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>
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
                    <input name="register" id="register" className="btn btn-block login-btn" type="submit" value="Register" />
                </form>
                {/* <a href="#!" className="forgot-password-link">Forgot password?</a> */}
                <p className="login-wrapper-footer-text">You have an account?
                    <a onClick={() => navigate('/login')}
                        className="text-reset"
                        style={{cursor: "pointer"}}
                    > Login here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Register
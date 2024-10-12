import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Joi from 'joi';
import './Login.css';
import exampleImage from '../../../assets/login.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../AuthNavbar/Navbar';

const schema = Joi.object({
    email: Joi.string().pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')).required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[!@#$%^&*()]).*$')).required(),
});

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const formData = { email, password };
        const { error } = schema.validate(formData, { abortEarly: false });

        if (error) {
            const firstError = error.details[0]; 
            const field = firstError.context.key; 

            const customMessages = {
                email: 'Please enter a valid email address',
                password: 'Password must be at least 8 characters and include a special character',
            };

            setError(customMessages[field] || firstError.message); 
            return;
        }

        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://127.0.0.1:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to log in');
            } else {
                // navigate('/LandingPage'); 
            }
        } catch (error) {
            setError('Failed to log in');
        } finally {
            setLoading(false);
        }
    }

    const handleSignupRedirect = () => {
        navigate('/Signup');
    };
    
    const handleForgetPasswordRedirect = () => {
        navigate('/ForgotPassword');
    };

    return (
        <>
            <Navbar />
            <div className="all" style={{maxWidth:'100%'}}>
                <div className="form-section">
                    <h2 className='text-center mb-4'>Login</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Username Or Email</Form.Label>
                            <Form.Control type='text' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password' className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <div className="w-100 text-center mt-3">
                            <span style={{ color: '#E86924', cursor: 'pointer' }} onClick={handleForgetPasswordRedirect}>Forgot Password?</span>
                        </div>
                        <Button type='submit' disabled={loading} className='w-100 text-center mt-4' style={{ backgroundColor: "#E86924", borderColor: "#E86924" }}>
                            Log In
                        </Button>
                    </Form>
                    <div className='w-100 text-center mt-4'>
                        Need an account? 
                        <span className='ms-2' style={{ color: '#E86924', cursor: 'pointer' }} onClick={handleSignupRedirect}>Sign Up</span>
                    </div>
                </div>

                <div className="image-section">
                    <img src={exampleImage} alt="Login Visual" className="form-image" />
                </div>
            </div>
        </>
    );
}

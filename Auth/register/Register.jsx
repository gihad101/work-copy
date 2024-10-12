import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import exampleImage from '../../../assets/signup.png'; 
import Navbar from '../AuthNavbar/Navbar';

const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')).required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[!@#$%^&*()]).*$')).required(),
    phone: Joi.string().pattern(new RegExp('^\\+?[1-9]\\d{1,14}$')).required(),
    idNational: Joi.string().required(),
    idDoc: Joi.any().required(),  // File type for ID Document
    profileImage: Joi.any().optional(),  // File type for Profile Image
    role: Joi.string().valid('entrepreneur', 'investor', 'guest').required()
});

export default function Signup() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const idNationalRef = useRef();
    const idDocRef = useRef();
    const profileImageRef = useRef();
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('entrepreneur');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        // Google sign-in functionality here
    };

    async function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData(); 
        formData.append('firstName', firstNameRef.current.value);
        formData.append('lastName', lastNameRef.current.value);
        formData.append('username', usernameRef.current.value);
        formData.append('email', emailRef.current.value);
        formData.append('password', passwordRef.current.value);
        formData.append('phone', phoneRef.current.value);
        formData.append('idNational', idNationalRef.current.value);
        formData.append('idDoc', idDocRef.current.files[0]);  
        formData.append('profileImage', profileImageRef.current.files[0]);  
        formData.append('role', role);
    
        const { error } = schema.validate({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            phone: formData.get('phone'),
            idNational: formData.get('idNational'),
            role: formData.get('role')
        }, { abortEarly: false });
    
        if (error) {
            const firstError = error.details[0];
            const field = firstError.context.key;
    
            const customMessages = {
                firstName: 'First name must be between 2 and 30 characters',
                lastName: 'Last name must be between 2 and 30 characters',
                username: 'Username must be between 3 and 30 characters',
                email: 'Please enter a valid email address',
                password: 'Password must be at least 8 characters and include a special character',
                phone: 'Please enter a valid phone number',
                idNational: 'National ID is required',
                idDoc: 'Please upload a valid ID document',
                profileImage: 'Please upload a profile image'
            };
    
            setError(customMessages[field] || firstError.message);
            return;
        }
    
        try {
            setError('');
            setLoading(true);
    
            const response = await fetch('http://127.0.0.1:5000/api/user/register', {
                method: 'POST',
                body: formData,  
            });
    
            if (!response.ok) {
                throw new Error('Failed to create an account');
            }
    
            const result = await response.json();
            console.log('Success:', result);
    
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to create an account');
        } finally {
            setLoading(false);
        }
    }
    

    const handleRoleChange = (event) => {
        setRole(event.target.id);
    };

    const handleLoginRedirect = () => {
        navigate('/Login'); 
    };

    return (
        <>
            {<Navbar />}
            <div className='all'>
                <div className="form-section ">
                    <h2 className="text-center m-4 bg-white">Welcome</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Button onClick={handleGoogleSignIn} className="w-100 mb-3 googleButton">
                        <FontAwesomeIcon icon={faGoogle} className="me-3" />
                        Sign in with Google
                    </Button>

                    <h5 className="text-center mt-2">Or</h5>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between">
                            <Form.Group id="firstName" className="me-2" style={{ flex: 1, marginBottom: '10px' }}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" ref={firstNameRef} required />
                            </Form.Group>
                            <Form.Group id="lastName" style={{ flex: 1 , marginBottom: '10px' }}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" ref={lastNameRef} required />
                            </Form.Group>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Form.Group id="username" className="me-2" style={{ flex: 1 , marginBottom: '10px' }}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={usernameRef} required />
                            </Form.Group>
                            <Form.Group id="email" style={{ flex: 1 , marginBottom: '10px' }}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Form.Group id="password" className="me-2" style={{ flex: 1 , marginBottom: '10px' }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="phone" style={{ flex: 1 , marginBottom: '10px' }}>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" ref={phoneRef} required />
                            </Form.Group>
                        </div>

                        <Form.Group id="idNational" style={{marginBottom: '10px' }}>
                            <Form.Label>National ID</Form.Label>
                            <Form.Control type="text" ref={idNationalRef} required />
                        </Form.Group>
                        <Form.Group id="idDoc" style={{marginBottom: '10px' }}>
                            <Form.Label>ID Document</Form.Label>
                            <Form.Control type="file" ref={idDocRef} required />  
                        </Form.Group>
                        <Form.Group id="profileImage" style={{marginBottom: '10px' }}>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="file" ref={profileImageRef} />
                        </Form.Group>

                        <div className="d-flex flex-row mt-3 custom-radio">
                            <Form.Check
                                type="radio"
                                id="entrepreneur"
                                label="Entrepreneur"
                                checked={role === 'entrepreneur'}
                                onChange={handleRoleChange}
                            />
                            <Form.Check
                                type="radio"
                                id="investor"
                                label="Investor"
                                checked={role === 'investor'}
                                onChange={handleRoleChange}
                                className="ms-3"
                            />
                            <Form.Check
                                type="radio"
                                id="guest"
                                label="Guest"
                                checked={role === 'guest'}
                                onChange={handleRoleChange}
                                className="ms-3"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-100 text-center mt-4" style={{ backgroundColor: '#E86924', borderColor: '#E86924' }}>
                            Sign Up
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4">
                        Already have an account?
                        <span className="ms-2" style={{ color: '#E86924', cursor: 'pointer' }} onClick={handleLoginRedirect}>Log in</span>
                    </div>
                </div>
                <div className="image-section">
                    <img src={exampleImage} alt="Signup Visual" className="form-image" />
                </div>

            </div>
        </>
    );
}

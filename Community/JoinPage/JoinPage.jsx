import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Sidebar from '../../../common/LeftSidebar/Sidebar';
import DashboardHeader from '../../../layout/DashboardHeader';

export default function JoinPage() {
    const navigate = useNavigate(); 

    const handleJoinUsClick = () => {
        navigate('/GeneralCommunity'); 
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Sidebar /> 
            <div className="flex-grow-1 d-flex flex-column">
                <DashboardHeader />
                <div className="container d-flex align-items-center justify-content-center flex-grow-1" style={{marginLeft:'15%'}}>
                    <div className="card text-center p-5" style={{ backgroundColor: "#E86924", width: '500px' }}>
                        <div className="card-body text-white">
                            <h1 className="card-title">Join our community</h1>
                            <p className="card-text">
                                Connect, Collaborate, and Grow with Fellow <br /> Entrepreneurs and Investors
                            </p>
                            <button 
                                className="btn btn-light m-2" 
                                style={{ backgroundColor: 'white', color: '#E86924', fontWeight: 'bold' }}
                                onClick={handleJoinUsClick} 
                            >
                                Join Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

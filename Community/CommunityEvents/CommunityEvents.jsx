import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../../common/LeftSidebar/Sidebar';
import DashboardHeader from '../../../layout/DashboardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faArrowDown, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import RightSidebar from '../RightSidebar/RightSidebar';
import './CommunityEvents.css';
import { useNavigate } from 'react-router-dom';
import section3Image3 from '../../../../assets/homeBackground.png';

export default function CommunityEvents() {

    const [projects, setProjects] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const mockData = [
            {
                id: 1,
                author: 'John Doe',
                role: 'Community Leader',
                profileImg: 'https://via.placeholder.com/50',
                image: section3Image3,
                content: 'Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius. #amazing #great #lifetime #uiux #machinelearning',
                likes: 5,
                date: '2024-11-12',
                location: 'Downtown Conference Hall',
                comments: [
                    { id: 1, content: 'Great post!' },
                    { id: 2, content: 'Thanks for sharing!' },
                ],
            }
        ];

        setProjects(mockData);
    }, []);

    const handelPageRedirect = () => {
        Navigate('/GeneralCommunity');
    }

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1">
                <DashboardHeader />

                <div className="p-3" style={{ marginLeft: '15%' }}>
                    <div className="row">
                        <div className="col-md-9">
                            <h2 className="text-center" style={{ backgroundColor: '#E86924', color: 'white', padding: '100px', borderRadius: '15px' }}>
                                Community Events
                            </h2>
                            <button className="btn my-2" style={{ backgroundColor: '#eee', color: 'black'}}>
                                Upcoming
                                <FontAwesomeIcon icon={faArrowDown}  className='mx-2' style={{color:'#E86924'}}/>
                            </button>
                            <div className="mt-2">
                                {projects.map((post) => (
                                    <div className="card mb-4" key={post.id}>
                                        <div className="card-header" style={{ position: 'relative' }}>
                                            <img src={post.image} alt="Project Image" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />

                                            
                                            <div style={{
                                                position: 'absolute',
                                                left: '30px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                backgroundColor: 'white',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                zIndex: 2 
                                            }}>
                                                <p style={{ margin: 0, fontWeight: 'bold', color: '#E86924' }}>
                                                    Join Us In the 2nd Edition of Virtual Pitch Session
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <div className="d-flex align-items-center mt-3">
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#E86924', marginRight: '10px' }} />
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="d-flex align-items-center mt-3">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#E86924', marginRight: '10px' }} />
                                                    <span>{post.location}</span>
                                                </div>
                                            </h5>
                                            <p className="card-text">{post.content}</p>
                                            <button href="#" className="btn" style={{ backgroundColor: '#E86924', color: 'white', fontSize: '20px' }}>Join Us</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <RightSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

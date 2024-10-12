import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBell, faArrowRight, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const RightSidebar = () => {
    const [showMenu, setShowMenu] = useState(false);

    // Toggle the dropdown menu
    const toggleMenu = (e) => {
        e.stopPropagation();
        console.log("Menu toggled");
        setShowMenu(prev => !prev);
    };    

    // Close the dropdown menu
    const closeMenu = () => setShowMenu(false);

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMenu) {
                closeMenu();
            }
        };

        // Attach the event listener
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="sidebar" style={{ position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="active-users">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ color: '#000000', marginBottom: '0' }}>Active Users</h5>
                    <button className="btn btn-link" style={{ color: '#000000', padding: '0' }}>
                        <span style={{ marginRight: '5px' }}>See all</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                <hr />
                {/* User List */}
                {[
                    { name: 'Julia Smith', username: '@juliasmith' },
                    { name: 'Vermillion D. Gray', username: '@vermilliongray' },
                    { name: 'Mai Senpai', username: '@maisenspai' },
                    { name: 'Azunyan U. Wu', username: '@azunyandesu' },
                    { name: 'Oarack Babama', username: '@obama21' }
                ].map((user, index) => (
                    <div key={index}>
                        <div className="user-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '8px 0' }}>
                            <div className="d-flex align-items-center">
                                <img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle me-2" />
                                <div>
                                    <span style={{ color: 'black' }}>{user.name}</span><br />
                                    <span style={{ color: 'gray' }}>{user.username}</span>
                                </div>
                            </div>
                            <button className="btn"><FontAwesomeIcon icon={faPlus} style={{ color: '#94A3B8' }} /></button>
                        </div>
                        <hr style={{ margin: '0' }} />
                    </div>
                ))}
            </div>

            <div className="upcoming-events mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ color: '#000000' }}>Upcoming Events</h5>
                    <button className="btn" onClick={toggleMenu} style={{ background: 'none', border: 'none', color: 'black' }}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                </div>

                {/* Dropdown Menu */}
                {showMenu && (
                <div className="dropdown-menu" style={{
                    position: 'absolute',
                    background: '#fff',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999, // Make sure it is on top
                    width: '100%',
                    marginTop: '5px',
                    padding: '0'
                }}>
                    <button className="dropdown-item" style={{ color: 'black', padding: '8px 16px', border: 'none', textAlign: 'left', width: '100%', background: 'none', cursor: 'pointer' }}>
                        Option 1
                    </button>
                    <button className="dropdown-item" style={{ color: 'black', padding: '8px 16px', border: 'none', textAlign: 'left', width: '100%', background: 'none', cursor: 'pointer' }}>
                        Option 2
                    </button>
                    <button className="dropdown-item" style={{ color: 'black', padding: '8px 16px', border: 'none', textAlign: 'left', width: '100%', background: 'none', cursor: 'pointer' }}>
                        Option 3
                    </button>
                </div>
            )}
                <hr />
                {[
                    { eventName: 'Virtual Pitch Session', eventDate: 'Jun 25, 2028' },
                    { eventName: 'Investor Q&A Webinar', eventDate: 'Jun 28, 2028' },
                    { eventName: 'Investor Q&A Webinar', eventDate: 'Aug 19, 2028' },
                    { eventName: 'Virtual Pitch Session', eventDate: 'Dec 22, 2028' }
                ].map((event, index) => (
                    <div key={index}>
                        <div className="event-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '8px 0' }}>
                            <div className="d-flex align-items-center">
                                <img src="https://via.placeholder.com/30" alt="Event" className="rounded-circle me-2" />
                                <div>
                                    <span style={{ color: 'black' }}>{event.eventName}</span><br />
                                    <span style={{ color: 'gray' }}>{event.eventDate}</span>
                                </div>
                            </div>
                            <FontAwesomeIcon icon={faBell} style={{ color: '#94A3B8' }} />
                        </div>
                        <hr style={{ margin: '0' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightSidebar;

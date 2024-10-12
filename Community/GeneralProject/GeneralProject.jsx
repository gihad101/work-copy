import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../../common/LeftSidebar/Sidebar';
import DashboardHeader from '../../../layout/DashboardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faPaperPlane, faEllipsisV, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import RightSidebar from '../RightSidebar/RightSidebar';
import { Modal, Button } from 'react-bootstrap';
import './GeneralProject.css';
import { useNavigate } from 'react-router-dom';
import section3Image3 from '../../../../assets/section3Image3.png';


export default function GeneralProject() {

    const [projects, setProjects] = useState([]);
    const [liked, setLiked] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedProject, setSelectedProject] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState({ visible: false, action: '', postId: null });
    
    const [newComment, setNewComment] = useState({}); 
    const [newProjectContent, setNewProjectContent] = useState({}); 
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
                comments: [
                    { id: 1, content: 'Great post!' },
                    { id: 2, content: 'Thanks for sharing!' },
                ],
            },
            {
                id: 2,
                author: 'Jane Smith',
                role: 'Community Member',
                profileImg: 'https://via.placeholder.com/50',
                image: section3Image3,
                content: 'Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius. #amazing #great #lifetime #uiux #machinelearning',
                likes: 8,
                comments: [
                    { id: 1, content: 'Welcome to the community!' },
                    { id: 2, content: 'Looking forward to more posts!' },
                ],
            },
        ];

        setProjects(mockData);
        setLiked(mockData.reduce((acc, post) => ({ ...acc, [post.id]: false }), {}));
        setDropdownOpen(mockData.reduce((acc, post) => ({ ...acc, [post.id]: false }), {}));
    }, []);

    const handleLikeClick = (postId) => {
        setProjects((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, likes: liked[postId] ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );
        setLiked((prevLiked) => ({
            ...prevLiked,
            [postId]: !prevLiked[postId],
        }));
    };

    const handleDropdownToggle = (postId) => {
        setDropdownOpen((prevDropdownOpen) => ({
            ...prevDropdownOpen,
            [postId]: !prevDropdownOpen[postId],
        }));
    };

    const handleDelete = (postId) => {
        setShowConfirmationModal({ visible: true, action: 'delete', postId });
    };

    const handleEdit = (postId) => {
        setShowConfirmationModal({ visible: true, action: 'edit', postId });
    };

    const handleSave = (postId) => {
        setShowConfirmationModal({ visible: true, action: 'save', postId });
    };

    const handleConfirmAction = () => {
        const { action, postId } = showConfirmationModal;

        if (action === 'delete') {
            setProjects(projects.filter((post) => post.id !== postId));
        }
        // Handle edit and save logic similarly

        setShowConfirmationModal({ visible: false, action: '', postId: null });
    };

    const handleShowComments = (post) => {
        setSelectedProject(post);
        setShowCommentModal(true);
    };

    const handleAddComment = (postId, commentContent) => {
        setProjects((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: [...post.comments, { id: post.comments.length + 1, content: commentContent }],
                      }
                    : post
            )
        );
        setShowCommentModal(false);
    };

    const handleAddNewPost = (newPostContent) => {
        const newPost = {
            id: projects.length + 1,
            author: 'New User',
            role: 'Community Member',
            profileImg: 'https://via.placeholder.com/50',
            content: newPostContent,
            likes: 0,
            comments: [],
        };
        setProjects([...projects, newPost]);
        setShowNewProjectModal(false);
    };
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
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="input-group" style={{ width: '50%' }}>
                                    <input type="text" className="form-control" placeholder="Search posts or tags" />
                                    <button className="btn" style={{ backgroundColor: '#E86924', color: 'white', borderColor: '#E86924' }}>Search</button>
                                </div>
                                <button className="btn" style={{ backgroundColor: '#E86924', color: 'white', borderColor: '#E86924' }} onClick={() => setShowNewProjectModal(true)}>
                                    Add New Project +
                                </button>
                            </div>

                            <h2 className="text-center p-5" style={{ backgroundColor: '#E86924', color: 'white' }}>
                                Post Your Project Securely 
                            </h2>

                            <div className="mt-4">
                                {projects.map((post) => (
                                    <div key={post.id} className="card mb-4" style={{ border: '1px solid #E86924', borderRadius: '5px' }}>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center mb-2">
                                                    <img src={post.profileImg} alt="Profile" className="rounded-circle me-3" />
                                                    <div>
                                                        <h5 className="mb-0">{post.author}</h5>
                                                        <p className="mb-1">{post.role}</p>
                                                    </div>
                                                </div>

                                                <div className="dropdown">
                                                    <button className="btn" onClick={() => handleDropdownToggle(post.id)}>
                                                        <FontAwesomeIcon icon={faEllipsisV} />
                                                    </button>
                                                    {dropdownOpen[post.id] && (
                                                        <ul className="dropdown-menu show">
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => handleDelete(post.id)}>
                                                                    Delete Post
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => handleEdit(post.id)}>
                                                                    Edit Post
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => handleSave(post.id)}>
                                                                    Save Post
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>

                                            <hr />
                                            <h6 className='row d-flex'>
                                            <div className='col-md-2'>
                                                <img src={post.image} alt="Project Image" style={{width: '100%', height: 'auto' }} />
                                            </div>
                                            <div className='col-md-8 justify-content-center'>
                                                {post.content}
                                            </div>
                                            </h6>

                                            <div className="d-flex justify-content-start align-items-center">
                                                <button
                                                    className="btn p-0 me-3"
                                                    style={{
                                                        color: liked[post.id] ? '#E86924' : '#94A3B8',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                    }}
                                                    onClick={() => handleLikeClick(post.id)}
                                                >
                                                    <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
                                                </button>
                                                <button
                                                    className="btn p-0"
                                                    style={{
                                                        color: '#94A3B8',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                    }}
                                                    onClick={() => handleShowComments(post)}
                                                >
                                                    <FontAwesomeIcon icon={faComment} /> {post.comments.length}
                                                </button>
                                            </div>
                                            <hr/>
                                            {/* Comment input section */}
                                            <div className="d-flex align-items-center mt-3">
                                                <img src={post.profileImg} alt="Profile" className="rounded-circle me-2" style={{ width: '30px' }} />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Write your comment..."
                                                    value={newComment[post.id] || ''} // Use state for the input value
                                                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })} // Update the corresponding post's comment content
                                                />
                                                <button onClick = {handelPageRedirect} className="btn" style={{ backgroundColor: '#E86924', color: 'white', borderColor: '#E86924', marginLeft: '5px' }}>
                                                    <FontAwesomeIcon icon={faPaperclip} />
                                                </button>
                                                <button
                                                    className="btn"
                                                    style={{ backgroundColor: '#E86924', color: 'white', borderColor: '#E86924', marginLeft: '5px' }}
                                                    onClick={() => {
                                                        handleAddComment(post.id, newComment[post.id]); // Add the comment when clicked
                                                        setNewComment({ ...newComment, [post.id]: '' }); // Reset input after submission
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPaperPlane} />
                                                </button>
                                            </div>
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

            {/* Modal for adding a new post */}
            <Modal show={showNewProjectModal} onHide={() => setShowNewProjectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="What's on your mind?"
                        onChange={(e) => setNewProjectContent(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowNewProjectModal(false)}>
                        Close
                    </Button>
                    <Button style={{backgroundColor: '#E86924', color: 'white', borderColor: '#E86924'}} onClick={() => handleAddNewPost(newProjectContent)}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal */}
            <Modal show={showConfirmationModal.visible} onHide={() => setShowConfirmationModal({ visible: false, action: '', postId: null })}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`Are you sure you want to ${showConfirmationModal.action} this post?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmationModal({ visible: false, action: '', postId: null })}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmAction}>
                        {showConfirmationModal.action.charAt(0).toUpperCase() + showConfirmationModal.action.slice(1)}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for comments */}
            <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProject && selectedProject.comments.map((comment) => (
                        <div key={comment.id} className="mb-2">
                            <strong>User:</strong> {comment.content}
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
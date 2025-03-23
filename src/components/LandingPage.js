import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="jumbotron bg-light p-5 shadow rounded">
                        <h1 className="display-4 fw-bold">Welcome to <span className="text-primary">CollabTool</span></h1>
                        <p className="lead text-muted">
                            CollabTool is your go-to platform for seamless real-time collaboration. 
                            Work together on documents, share ideas, and communicate effortlessly with your team.
                        </p>
                        <hr className="my-4" />
                        <p className="text-secondary">
                            Whether you're working on a team project or just need to organize your thoughts, 
                            CollabTool offers all the features you need to stay productive.
                        </p>
                        <div className="mt-4">
                            <Link to="/register" className="btn btn-primary btn-lg me-3" aria-label="Register for CollabTool">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-outline-secondary btn-lg" aria-label="Login to CollabTool">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token; // Safer way to get token

            if (!token) {
                navigate('/');
                return;
            }

            try {
                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDocuments(data);
            } catch (err) {
                console.error('Failed to fetch documents:', err);
                setError('Failed to load documents. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [navigate]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Dashboard</h2>

            {loading && <p className="text-center">Loading documents...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {!loading && !error && (
                <div className="row">
                    {documents.length > 0 ? (
                        documents.map((doc) => (
                            <div key={doc._id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{doc.title}</h5>
                                        <p className="card-text text-muted">
                                            Created on: {new Date(doc.createdAt).toLocaleDateString()}
                                        </p>
                                        <Link to={`/document/${doc._id}`} className="btn btn-primary mt-auto">
                                            Open Document
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">No documents found.</p>
                    )}
                </div>
            )}

            <div className="text-center mt-4">
                <button className="btn btn-success" onClick={() => navigate('/document/new')}>
                    Create New Document
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

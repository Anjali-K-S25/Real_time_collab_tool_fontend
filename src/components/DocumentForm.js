import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.token : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setLoading(true); // Start loading

        const token = getToken();
        if (!token) {
            setError('User not authenticated. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/documents',
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(`/document/${data._id}`, { state: { message: 'Document created successfully!' } });
        } catch (error) {
            console.error('Failed to create document:', error);
            setError(error.response?.data?.message || 'Failed to create document.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <h2>Create New Document</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default DocumentForm;

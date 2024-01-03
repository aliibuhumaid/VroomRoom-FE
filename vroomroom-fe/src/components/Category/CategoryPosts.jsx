import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CategoryPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:YOUR_PORT/category/posts?id=${categoryId}`) // Replace with your server port
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load posts.");
            });
    }, [categoryId]);

    return (
        <div className="container mt-4">
            <h2>Posts in Category</h2>
            {error && <p className="text-danger">{error}</p>}
            <div>
                {posts.map(post => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        {/* Add other post details you want to display */}
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you have Bootstrap installed

export default function Profile(props) {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event) => {
        const attributeToChange = event.target.name;
        const newValue = event.target.value;
        const updatedProfile = { ...userProfile };
        if (attributeToChange === 'image') {
            const file = event.target.files;
            let allImages = [];
            for (let i = 0; i < file.length; i++) {
                allImages.push(file[i]);
            }
            updatedProfile[attributeToChange] = allImages[0];
        } else {
            updatedProfile[attributeToChange] = newValue;
        }
        setUserProfile(updatedProfile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('_id', userProfile._id);
        formData.append('firstName', userProfile.firstName);
        formData.append('lastName', userProfile.lastName);
        formData.append('emailAddress', userProfile.emailAddress);
        formData.append('phoneNumber', userProfile.phoneNumber);
        formData.append('password', userProfile.password);
        formData.append('image', userProfile.image);
        updateProfile(formData);
    };

    const updateProfile = (profile) => {
        Axios.post('/user/update', profile)
            .then(res => {
                navigate('/post');
            })
            .catch(err => {
                console.log('Error updating profile', err);
            });
    };

    const getUser = () => {
        if (!props.userId.id) return;
        Axios.get(`/user/profile?id=${props.userId.id}`)
            .then(response => {
                setUserProfile(response.data.user);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="currentImage">Current Image:</label>
                            <div className="text-center mb-3">
                                <img src={userProfile.image || 'default_profile_image_path'} alt="profile" className="img-thumbnail" width="200" height="200" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" className="form-control mb-3" name="firstName" onChange={handleChange} value={userProfile.firstName || ''} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="form-control mb-3" name="lastName" onChange={handleChange} value={userProfile.lastName || ''} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailAddress">Email:</label>
                            <input type="email" className="form-control mb-3" name="emailAddress" onChange={handleChange} value={userProfile.emailAddress || ''} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone:</label>
                            <input type="text" className="form-control mb-3" name="phoneNumber" onChange={handleChange} value={userProfile.phoneNumber || ''} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control mb-3" name="password" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input type="file" className="form-control mb-3" name="image" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

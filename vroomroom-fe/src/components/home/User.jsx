import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.user);
   
    } else {
      
    }
  }, [token]);

  
  const fetchUserData = async (userId) => {
    try {
      const response = await Axios.get(`/api/users/${userId}`);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>ID: {user.id}</p>
          {/* Render additional user information as needed */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;

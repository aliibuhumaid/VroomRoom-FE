import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Profile(props) {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});
    const {id} = useParams();

    useEffect(() =>{
        getUser();

    },[])

    const handleChange = (event) =>{
        const attributeToChange = event.target.name;
        const newValue = event.target.value;
        const updatedProfile = userProfile;
        if(attributeToChange == "image"){
            console.log(newValue);
            const file = event.target.files;
            console.log(file);
            let allImages =[];
            console.log(file[0])
            for(let i=0; i<file.length; i++){
                allImages.push(file[i]);
            }
            console.log(allImages)
            updatedProfile[attributeToChange] = allImages;
            setUserProfile(updatedProfile)
        }
        else{
            updatedProfile[attributeToChange] = newValue;
            console.log(updatedProfile);
            setUserProfile(updatedProfile);
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('_id', userProfile._id);
        formData.append('firstName', userProfile.firstName);
        formData.append('lastName', userProfile.lastName);
        formData.append('emailAddress', userProfile.emailAddress);
        formData.append('price', userProfile.phoneNumber);
        formData.append('category', userProfile.password);
        console.log(formData);
        console.log(userProfile);
        updateProfile(formData);

    } 

    const updateProfile = (profile) =>{
        Axios.post('/user/update', profile)
        .then(res =>{
            console.log("Post Updated successfully!!!")
            navigate('/post')
        })
        .catch(err =>{
            console.log("Error updating Post")
            console.log(err);
        })
    }

    const getUser = () =>{
        if(!props.userId.id) return
        Axios.get(`/user/profile?id=${props.userId.id}`)
        .then(response =>{
            console.log(response.data);
            setUserProfile(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" onChange={handleChange} value={userProfile.firstName} disabled/>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" onChange={handleChange} value={userProfile.lastName} disabled/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="emailAddress" onChange={handleChange} value={userProfile.emailAddress}/>
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" name="phoneNumber" onChange={handleChange} value={userProfile.phoneNumber}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="text" name="password" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleChange} name="image"/>
                    </div>
            </form>
        </div>

    )
}

import React, { useState } from 'react'

export default function Signup(props) {

    const [newUser, setNewUser] = useState({});

    const handleChange = (event) => {
        const user ={...newUser};
        user[event.target.name] = event.target.value;
        console.log(user);
        setNewUser(user);


    }

    const registerHandler = (event) => {
        event.preventDefault();
        props.register(newUser);
        event.target.reset();
    }

  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={registerHandler}>
            <div>
                <label>First Name</label>
                <input type='text' name='firstName' onChange={handleChange}className='form-control'></input>
            </div>
            <div>
                <label>last Name</label>
                <input type='text' name='lastName' onChange={handleChange}className='form-control'></input>
            </div>
            <div>
                <label>email Address</label>
                <input type='email' name='emailAddress' onChange={handleChange}className='form-control'></input>
            </div>
            <div>
                <label>Phone Number</label>
                <input type='text' name='phoneNumber' onChange={handleChange}className='form-control'></input>
            </div>
            <div>
                <label>password</label>
                <input type='password' name='password' onChange={handleChange} className='form-control'></input>
            </div>
            <div>
          <input type='submit' value='Register' className='btn btn-primary'></input>
        </div>
        </form>
    </div>
  )
}

import React, { useState } from 'react'

export default function Signin(props) {

    const [newUser, setNewUser] = useState({});

    const handleChange = (event) => {
        const user ={...newUser};
        user[event.target.name] = event.target.value;
        console.log(user);
        setNewUser(user);


    }

    const loginHandler = (event) => {
        event.preventDefault();
        props.login(newUser);
        event.target.reset();
    }

  return (
    <div>
        <h1>Sign In</h1>
        <form onSubmit={loginHandler}>
            <div>
                <label>email Address</label>
                <input type='email' name='emailAddress' onChange={handleChange}className='form-control'></input>
            </div>
            <div>
                <label>password</label>
                <input type='password' name='password' onChange={handleChange} className='form-control'></input>
            </div>
            <div>
          <input type='submit' value='Login' className='btn btn-primary'></input>
        </div>
        </form>
    </div>
  )
}

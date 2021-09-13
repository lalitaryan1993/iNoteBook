import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Signup(props) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirm_password: '' });
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history.push('/');
      props.showAlert('Account Created Successfully', 'success');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container my-4'>
      <h1>Create account to use iNotebook </h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input type='name' className='form-control' id='name' name='name' onChange={onChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            onChange={onChange}
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input type='password' name='password' className='form-control' id='password' onChange={onChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm_password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            name='confirm_password'
            className='form-control'
            id='confirm_password'
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;

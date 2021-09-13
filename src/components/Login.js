import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history.push('/');
      props.showAlert('Login Successfully', 'success');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container my-4'>
      <h1>Login to continue to iNoteBook</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='email'
            onChange={onChange}
            aria-describedby='emailHelp'
            autoComplete='email'
            value={credentials.email}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            value={credentials.password}
            onChange={onChange}
            name='password'
            className='form-control'
            id='password'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
